from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from .serializer import User_serializer, UserLoginSerializer
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


# View for handling user-related operations
@api_view(['GET', 'POST'])
def users_view(request):
    # Handling GET requests for user retrieval
    if request.method == 'GET':
        users = User.objects.filter()
        serializer = User_serializer(users, many=True)
        return Response(serializer.data)
    
    # Handling POST requests for user creation
    if request.method == 'POST':
        data = request.data
        username = data['username']
        password = data['password']
        email = data['email']
        user = User.objects.create(username=username, password=password, email=email)
        serializer = User_serializer(instance=user, many=False)
        return Response(serializer.data, status=201)

# View for handling individual user operations
@api_view(['GET', 'PUT', 'DELETE'])
def user_by_username(request, username):
    user = get_object_or_404(User, username=username)
    if request.method == 'GET':
        serializer = User_serializer(user, many=False)
        return Response(serializer.data)

    if request.method == 'PUT':
        # Handling PUT requests for user updates
        data = request.data
        if data.get('password') is not None:
            password = data['password']
            user.password = password
        if data.get('email') is not None:
            user.email  = data['email']
    
        user.save()

        serializer = User_serializer(instance=user, many=False)
        return Response(serializer.data)

    if request.method == 'DELETE':
        # Handling DELETE requests for user deletion
        user.delete()
        return Response()

    return Response()
