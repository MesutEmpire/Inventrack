import {defineStore} from 'pinia'

import router from "@/router";
import {computed, reactive, ref} from "vue";

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
    const currentUser = reactive(JSON.parse(localStorage.getItem('currentUser')))


    //GETTERS
    const getUser = computed(() => user)

    const getUserAdmin = computed(() => userAdmin)

    const getUserSuper = computed(() => userSuper)

    const getAuthIsReady = computed(() => authIsReady)

    const getCurrentUser = computed(() => currentUser)

    const getAuthError = computed(() => authError)

    //ACTIONS
    const signUp = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(signInForm)
        })
            .then((res) => res.json())
            .then((res) => {
                resetForm()
                this.currentUser = res.data
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                console.log("User", currentUser)
            })
            .then(() => {
                router.push('/SuperUser/')
            })

            .catch((err) => {
                console.log(err.message)
            })

    }
    const logIn = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({email: signInForm.email, password: signInForm.password})
        })
            .then((res) => res.json())
            .then((res) => {
                resetForm()
                this.currentUser = res.data
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                console.log("User", currentUser)
            })
            .then(() => {
                router.push('/SuperUser/')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const logOut = () => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                this.currentUser = null
                localStorage.removeItem('currentUser');
                router.push('/')
            })
            .catch((err) => {
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


    //
    //
    // authState() {
    //     onAuthStateChanged(auth,(user:any) => {
    //         user?.getIdTokenResult()
    //             .then((idTokenResult:any) =>{
    //                 this.userAdmin = false
    //                 this.userSuper = false
    //
    //                 if(idTokenResult.claims.superuser == true){
    //                    this.userSuper = true
    //                 }
    //                 else if(idTokenResult.claims.admin == true){
    //                     this.userAdmin = true
    //                 }
    //
    //             })
    //             .then(()=>{
    //                 console.log(this.userAdmin,this.userSuper )
    //             })
    //         this.authIsReady = true
    //         this.user = user
    //
    //     })
    // },

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
        signUp, logIn, logOut, authUser, authAdmin, authSuper, resetForm
    }
})
