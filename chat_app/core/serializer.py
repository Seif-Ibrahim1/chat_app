# Serializer for the User model
from rest_framework.serializers import ModelSerializer, Serializer, CharField, ValidationError

from django.contrib.auth import authenticate
from .models import User

class User_serializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserLoginSerializer(Serializer):
	username = CharField()
	password = CharField()
	
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['username'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user