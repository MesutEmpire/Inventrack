from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from .models import User
from inventory.utils.response import CustomResponse
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer
from django.contrib.auth import logout

class RegisterView(APIView):
    """
    API endpoint for user registration.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return CustomResponse(success=True, message="User registered successfully", data=UserSerializer(user).data,
                                  status_code=status.HTTP_201_CREATED)
        return CustomResponse(success=False, message="Validation failed", data=serializer.errors,
                              status_code=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    """
    API endpoint for user login.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return CustomResponse(success=True, message="Login successful", data=serializer.validated_data,
                                  status_code=status.HTTP_200_OK)
        return CustomResponse(success=False, message="Invalid credentials", data=serializer.errors,
                              status_code=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """
    API endpoint for user logout.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            if not refresh_token:
                return CustomResponse(success=False, message="Refresh token is required", status_code=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            logout(request)
            return CustomResponse(success=True, message="Successfully logged out", status_code=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return CustomResponse(success=False, message="Invalid token", status_code=status.HTTP_400_BAD_REQUEST)



