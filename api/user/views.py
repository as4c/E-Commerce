from rest_framework import viewsets # type: ignore
from rest_framework.permissions import AllowAny # type: ignore
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout
import re
import random
# Create your views here.

def generates_session_token(length = 10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range (97,123)] + [str(i) for i in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if request.method !="POST":
        return JsonResponse({'error':'Send a Post request with valid parameter'})

    username = request.POST['email']
    password = request.POST['password']


#   validation Part started
    if not re.match("^(([a-zA-Z0-9\._-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,4}))$",username): # type: ignore
        return JsonResponse({'error':'Enter a Valid Email'})
    if len(password)<5:
        return JsonResponse({'error':'Password Needs to be at least of length 5'})

    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email = username)

        if user.check_password(password):  
            usr_dict = UserModel.objects.filter(email=username).values().first()
            usr_dict.pop('password')    # type: ignore
        
            if user.session_token != "0":  # type: ignore
                user.session_token = "0"  # type: ignore
                user.save()
                return JsonResponse({'error':'Previous session exists!'})
            token=generates_session_token()
            user.session_token=token   # type: ignore
            user.save()
            login(request,user)  
            return JsonResponse({'token':token,'user':usr_dict})
        else:
            return JsonResponse({'error':'Invalid Password'})
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid Email'})
    
def signout(request,id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"    # type: ignore
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid User ID'})
    return JsonResponse({'success':'Logout Success'})

class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create':[AllowAny]}

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
      