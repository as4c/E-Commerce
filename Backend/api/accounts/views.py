import random
from rest_framework.response import Response
from django.http import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from api.renderer import UserRenderer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import smart_str, force_bytes
from django.contrib.auth import authenticate, logout
from rest_framework.decorators import api_view, renderer_classes, permission_classes
from api.utils import Util
from .models import (
   CustomUser, 
   Address
   )
from .serializers import (
  UserRegistrationSerializer, 
  UserLoginSerializer, 
  UserProfileSerializer,
  UserChangePasswordSerializer,
  UserPasswordResetSerializer,
  SendPasswordResetEmailSerializer,
  AddressSerializer,
  UserSerializer
  )

from urllib.parse import urlencode
from rest_framework import serializers
from django.conf import settings
from django.shortcuts import redirect
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import google_get_access_token, google_get_user_info, generate_tokens_for_user
from api.utils import upload_to_cloudinary


# Social Auth
class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
  
        error = validated_data.get('error')
     
        login_url = f'{settings.BASE_FRONTEND_URL}/signin'
       
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = f'{settings.BASE_FRONTEND_URL}/google'
        access_token = google_get_access_token(code=code, 
                                               redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        try:
            user = CustomUser.objects.get(email=user_data['email'])
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data)
        except CustomUser.DoesNotExist:
            username = user_data['email'].split('@')[0]
            first_name = user_data.get('given_name', '')
            last_name = user_data.get('family_name', '')

            user = CustomUser.objects.create(
                username=username,
                email=user_data['email'],
                first_name=first_name,
                last_name=last_name,
                registration_method='google',
                phone=None,
                profile_pic = None,
                verified = True,
            )
         
            access_token, refresh_token = generate_tokens_for_user(user)
            response_data = {
                'user': UserSerializer(user).data,
                'access_token': str(access_token),
                'refresh_token': str(refresh_token)
            }
            return Response(response_data)



def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

def generate_verification_token(length = 32):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range (97,123)] + [str(i) for i in range(32)]) for _ in range(length))

class UserRegistrationView(APIView):
  permission_classes = [AllowAny]
  renderer_classes = [UserRenderer]
 
  def post(self, request, format=None):
    data = request.data
    data['profile_pic'] = upload_to_cloudinary(data['profile_pic'])
    serializer = UserRegistrationSerializer(data = data)
    serializer.is_valid(raise_exception=True)
    verify_token = generate_verification_token()
    user = serializer.save(verification_token = verify_token)
    # user = serializer.save()
    user_token = get_tokens_for_user(user)
    uid = urlsafe_base64_encode(force_bytes(user.uid))
    # 'http://127.0.0.1:8000/api/accounts/verify/' + uid + '/' + verify_token
    link = f'{settings.BASE_FRONTEND_URL}/accounts/verify/' + uid + '/' + verify_token
    body = f"Hello {user.first_name},\n\nThank you for registering with Bewra.com. Please click the following link to verify your account and complete the registration process:\n\n{link}\n\nIf you didn't create an account on T-shirt Store, you can safely ignore this email.\n\nBest regards,\nThe Bewron ka Team."
    data = {
        'subject': 'Verify Your Bewra Account',
        'body': body,
        'to_email': user.email
    }
    print("Account Verification email sent to", user.email + "and link is : " + link)
    Util.send_email(data)
    return Response({'token': user_token, 'msg': 'Registration Successfull. \n Welcome to Bewra.com! Please check your email to verify your account.'}, status=status.HTTP_201_CREATED)

  

@api_view(('GET',))
@permission_classes([AllowAny])
def verify_account(request, uid, token):

    uid = smart_str(urlsafe_base64_decode(uid))
    user = get_object_or_404(CustomUser, uid=uid)

    if user.verification_token == token:
        user.verified = True
        link = f'{settings.BASE_FRONTEND_URL}/user/signin/'
        body = f'''Dear {user.first_name},

    Congratulations! Your account has been successfully verified. We appreciate your trust in our platform.

    Enjoy the benefits of your account and start exploring our services. Should you have any questions or require assistance, feel free to reach out to our support team.

    Login now to access your account and begin your journey with us.

        {link}

    Best regards,
    The Bewra.com Team.
    '''
        data = {
            'subject': 'Account Verification Successful',
            'body': body,
            'to_email': user.email
        }
        print(f"Login Now... {link}")
        Util.send_email(data)
        user.save()
        return Response({"msg": "Your account has been successfully verified!"}, status=status.HTTP_200_OK)


class UserLoginView(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.verified is not False:
                token = get_tokens_for_user(user)
                return Response({'token':token, 'msg':'Login Success'}, status=status.HTTP_200_OK)
            else:
                return Response({"msg":"Please verify your account first."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'errors':{'non_field_errors':['Email or Password is not Valid']}}, status=status.HTTP_404_NOT_FOUND)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
  
    def put(self, request, format=None):
        # Perform a full update
        data = request.data
        data['profile_pic'] = upload_to_cloudinary(data['profile_pic'])
        
        serializer = UserProfileSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        # Perform a partial update
        data = request.data
        data['profile_pic'] = upload_to_cloudinary(data['profile_pic'])
        
        serializer = UserProfileSerializer(request.user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)

class SendPasswordResetEmailView(APIView):
  permission_classes = [AllowAny]
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  permission_classes = [AllowAny]
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)

def signout(request):
    logout(request)
    return JsonResponse({'message' : 'Logged out Successfully.'}, status=status.HTTP_202_ACCEPTED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_account(request):
    user = request.user
    body = '''Your account has been successfully deleted.''' 
    data = {
    'subject':'Account Deleted Successfully!',
    'body': body,
    'to_email':user.email
    }
    user.delete()
    Util.send_email(data)
    return Response({'status' : 'success', "message": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class AddressView(APIView):
   permission_classes = [IsAuthenticated]
   renderer_classes = [UserRenderer]

   def get(self, request):
      addresses = Address.objects.filter(user = request.user).order_by('-created_at')
      serializer = AddressSerializer(addresses, many=True)
      for data in serializer.data:
            data['user'] = str(data['user'])
      return Response(serializer.data, status=status.HTTP_200_OK)
   
   def post(self, request):
      serializer = AddressSerializer(data = request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save(user = request.user)
      return Response({'msg':'Address added successfully.'}, status= status.HTTP_201_CREATED)
   
   def patch(self, request, address_uid):
      address = get_object_or_404(Address, uid=address_uid, user=request.user)
      serializer = AddressSerializer(address, data=request.data, partial=True)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response({'msg': 'Address updated successfully.'}, status=status.HTTP_200_OK)

   def delete(self, request, address_uid):
      address = get_object_or_404(Address, uid = address_uid, user = request.user)
      address.delete()
      return Response({'msg': 'Address deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


