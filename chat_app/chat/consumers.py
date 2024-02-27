import json

from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer 
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

                # Check if the access token is provided in the query parameters
        query_string = self.scope.get("query_string", b"").decode("utf-8")
        query_params = {key: value for key, value in [param.split("=") for param in query_string.split("&")]}

        access_token = query_params.get("token", None)

        if not access_token:
            # Close the connection if the access token is not provided
            await self.close()
            return

        # Validate the access token
        user = await self.get_user_from_token(access_token)
        
        if not user:
            # Close the connection if the token is invalid
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)

        message = text_data_json['message']
        username = text_data_json.get('username', '')

        await self.channel_layer.group_send (
            self.room_group_name, {"type": "chat.message", "message": message, "username": username}
        )

    async def chat_message(self, event):
        message = event["message"]
        username = event["username"]

        await self.send(text_data=json.dumps({"message": message, "username": username}))

    @database_sync_to_async
    def get_user_from_token(self, access_token):
        try:
            token = AccessToken(access_token)
            user_id = token["user_id"]
            user = User.objects.get(pk=user_id)
            return user
        except Exception as e:
            # Handle token validation errors
            print(f"Token validation error: {str(e)}")
            return None