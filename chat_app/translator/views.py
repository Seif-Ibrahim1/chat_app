from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from googletrans import Translator

@api_view(['POST'])
def detect_language(request):
    # get the text from the request
    text = request.data['text']
    to_lang = request.data['lang']
    translation = translate_text(text, to_lang)

    # translate the language of the text
    return Response({'text': translation})

def translate_text(text, to_lang='en'):
    translator = Translator()
    translation = translator.translate(text, dest=to_lang)
    return translation.text
