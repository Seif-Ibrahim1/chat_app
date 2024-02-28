from django.urls import path
from .views import detect_language
urlpatterns = [
    path('', detect_language, name='detectLanguage')
]