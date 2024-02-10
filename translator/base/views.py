from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from translate import Translator


@api_view(['POST'])
def detect_language(request):
    to_lang = request.data['lang']
    text = request.data['text']
    translator= Translator(to_lang=to_lang, from_lang='autodetect')
    translation = translator.translate(text=text)
    return Response({'text': translation})


