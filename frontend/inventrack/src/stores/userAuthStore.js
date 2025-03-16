import {defineStore} from 'pinia'
import router from "@/router";
import {computed, reactive, ref} from "vue";
import Cookies from "js-cookie";

export const UserAuthStore = defineStore('userAuth', () => {
    //STATE
    const signInForm = reactive({
        first_name: "",
        last_name: "",
        phone_number: null,
        email: "",
        password: "",
        confirm_password: "",
        level: "User",
        remember_me:false
    })
    const user = ref(null)
    const authIsReady = ref(false)
    const authError = ref(null)
    const userAdmin = ref(false)
    const userSuper = ref(false)
    const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') ?? null))


    //GETTERS
    const getUser = computed(() => user)

    const getUserAdmin = computed(() => userAdmin)

    const getUserSuper = computed(() => userSuper)

    const getAuthIsReady = computed(() => authIsReady)

    const getCurrentUser = computed(() => currentUser.value)

    const getAuthError = computed(() => authError)

    //ACTIONS
    const setTokens = (access_token = null, refresh_token=null) => {
        if (access_token){
            Cookies.set('access_token', access_token, { secure: true, httpOnly: false });
        }
        if (access_token){
            Cookies.set('refresh_token', refresh_token, { secure: true, httpOnly: false });
        }
    };

    const deleteTokens = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    };

    const signUp = async () => {
        try {

            if (signInForm.password.length <= 6) {
                throw new Error(`Password must be more than 6 characters.`); 
            }else if (signInForm.confirm_password != signInForm.password) {
                throw new Error(`Password and Confirm Password must be the same.`); 
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(signInForm)
            })
            

            const res = await response.json();


            if (!response.ok) {
                throw new Error(res.message || `HTTP Error: ${response.status}`);
            }

            if (!res.status) {
                throw new Error(res.message || "Unknown error occurred");
            }

            resetForm()

                currentUser.value = res.data
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                console.log("User", currentUser.value)
                if (res.data.access_token && res.data.refresh_token) {
                    setTokens(res.data.access_token, res.data.refresh_token);
                } else {
                    throw new Error("Invalid login response");
                }

            await router.push('/');

         }
        catch (err) {
                setError(err.message)
                console.log(err.message)  
        }
    }
    const logIn = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email: signInForm.email, password: signInForm.password }),
            });

            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || `HTTP Error: ${response.status}`);
            }

            if (!res.status) {
                throw new Error(res.message || "Unknown error occurred");
            }

            resetForm()

            console.log(res.data)

            currentUser.value = res.data
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            console.log("User", currentUser.value)

            if (res.data?.access && res.data?.refresh) {
                setTokens(res.data.access, res.data.refresh);
            } else {
                throw new Error("Invalid login response");
            }

            await router.push('/');
        } catch (err) {
            setError(err.message)
            console.error("Login Error:", err.message);
        }
    };

    const logOut = () => {
        const access_token = Cookies.get('access_token');
        const refresh_token = Cookies.get('refresh_token');
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                        'Authorization': `Bearer ${access_token}`
            },
            credentials: 'include',
            body: JSON.stringify({"refresh":refresh_token}),
        })
            .then((res) => res.json())
            .then(async (res) => {
                console.log(res)
                await router.push('/login')
                currentUser.value = null
                deleteTokens();
                localStorage.removeItem('currentUser');
            })
            .catch((err) => {
                setError(err.message)
                console.log(err.message)
            })
    }
    const authUser = () => {
        return new Promise((resolve, reject) => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/authUser`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
                .then((res) => {
                        if (res.status === 200) {
                            res.json()
                        } else {
                            throw Error("Not 200")
                        }
                    }
                )
                .then((res) => {
                    console.log(res)
                    resolve(true)

                })
                .catch((err) => {
                    console.log(err.message)
                    reject(err.message)
                })
        })
    }
    const authAdmin = () => {
        return new Promise((resolve, reject) => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/authAdmin`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
                .then((res) => {
                        if (res.status === 200) {
                            res.json()
                        } else {
                            throw Error("Not 200")
                        }
                    }
                )
                .then((res) => {
                    console.log(res)
                    resolve(true)

                })
                .catch((err) => {
                    console.log(err.message)
                    reject(err.message)
                })
        })
    }
    const authSuper = () => {
        return new Promise((resolve, reject) => {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/authSuper`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })
                .then((res) => {
                        if (res.status === 200) {
                            res.json()
                        } else {
                            throw Error("Not 200")
                        }
                    }
                )
                .then((res) => {
                    console.log(res)
                    resolve(true)

                })
                .catch((err) => {
                    console.log(err.message)
                    reject(err.message)
                })
        })
    }
    const resetForm = () => {
            signInForm.first_name = "",
            signInForm.last_name = "",
            signInForm.phone_number = null,
            signInForm.email = "",
            signInForm.password = "",
            signInForm.confirm_password = "",
            signInForm.level = "User",
            signInForm.remember_me = false
    }

    const setError = (message) => {
        authError.value = message

        setTimeout(() => {
            authError.value = null
        },5000)
    }

    return {
        signInForm, user,
        authIsReady,
        authError,
        userAdmin,
        userSuper,
        currentUser,
        getUser,
        getUserAdmin,
        getUserSuper,
        getAuthIsReady,
        getCurrentUser,
        getAuthError,
        signUp, logIn, logOut, authUser, authAdmin, authSuper, resetForm,setError
    }
})
