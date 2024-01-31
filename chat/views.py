from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.

@login_required(login_url='login')
def index(request):
    return render(request, 'chat/index.html')

@login_required(login_url='login')
def room(request, room_num):
    context = {
        'room_num': room_num
    }
    return render(request, 'chat/room.html', context)
