from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib import messages, auth

# Create your views here.

def signup(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']

        if password == password2:
            if User.objects.filter(email=email):
                messages.info(request, "Email is taken")
                return redirect('signup')
            elif User.objects.filter(username=username):
                messages.info(request, "Username is taken")
                return redirect('signup')
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                
                userAuth = auth.authenticate(username=username, password=password)
                auth.login(request, userAuth)
                return redirect('/login')
        
        else:
            messages.info(request, "Password not matching")
            return redirect('signup')
        
    else:
        return render(request, 'auth/signup.html')


def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            return redirect('/chat')
        else:
            messages.info(request, 'Credentials Invalid')
            return redirect('/login')
    else:
        return render(request, 'auth/login.html')
    
@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    return redirect('login')