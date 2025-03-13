from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    """Serializer to retrieve user details."""

    class Meta:
        model = User
        fields = ("user_id", "email","first_name", "last_name","phone_number", "level", "phone_number", "created_at")


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration."""

    password = serializers.CharField(write_only=True, required=True, min_length=6)

    class Meta:
        model = User
        fields = ("email", "password", "phone_number", "level","first_name", "last_name")

    def create(self, validated_data):
        """Create a new user and return the instance."""
        user = User.objects.create_user(**validated_data)
        refresh = RefreshToken.for_user(user)
        return {"refresh": str(refresh), "access": str(refresh.access_token),"email": user.email,
        "first_name":user.first_name,"last_name":user.last_name,"phone_number":user.phone_number,"level": user.level,}


class LoginSerializer(serializers.Serializer):
    """Serializer for user login."""

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        """Validate user credentials."""
        email = data.get("email")
        password = data.get("password")
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid email or password.")

        if not user.is_active:
            raise serializers.ValidationError("User account is not active.")

        refresh = RefreshToken.for_user(user)
        return {"email": user.email,"first_name":user.first_name,"last_name":user.last_name,"phone_number":user.phone_number,
         "level": user.level, "refresh": str(refresh), "access": str(refresh.access_token), }
