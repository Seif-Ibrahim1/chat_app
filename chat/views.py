from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def room(request, room_num):
    context = {
        'room_num': room_num
    }
    return render(request, 'room.html', context)