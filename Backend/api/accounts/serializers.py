from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes,permission_classes
from .models import CustomUser, Address
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from api.utils import Util
import random
from rest_framework.response import Response
from rest_framework import status


class UserRegistrationSerializer(serializers.ModelSerializer):
  password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
  class Meta:
    model = CustomUser
    fields = ['email', 'first_name', 'last_name', 'username', 'phone', 'profile_pic', 'gender', 'password', 'password2', 'verification_token']
    extra_kwargs = {
      'password':{'write_only' : True}
    }

  # Validating Password and Confirm Password while Registration
  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

  def create(self, validate_data):
    return CustomUser.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = CustomUser
    fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    exclude = ['password']

class UserChangePasswordSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

  def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    user = self.context.get('user')
    # print(user)
    if password != password2:
        raise serializers.ValidationError("Password and Confirm Password don't match")

    user.set_password(password)
    user.save()

    return attrs


class SendPasswordResetEmailSerializer(serializers.Serializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    fields = ['email']

  def validate(self, attrs):
    email = attrs.get('email')
    if CustomUser.objects.filter(email=email).exists():
      user = CustomUser.objects.get(email = email)
      uid = urlsafe_base64_encode(force_bytes(user.uid))
      # print('Encoded UID', uid)
      token = PasswordResetTokenGenerator().make_token(user)
      # print('Password Reset Token', token)
      link = 'http://localhost:8000/api/accounts/reset-password/'+ uid +'/'+token
      print('Password Reset Link', link)
      # Send EMail
      body = 'Click Following Link to Reset Your Password ' + link
      data = {
        'subject':'Reset Your Password',
        'body':body,
        'to_email':user.email
      }
      Util.send_email(data)
      return attrs
    else:
      raise serializers.ValidationError('You are not a Registered User')

class UserPasswordResetSerializer(serializers.Serializer):
  password = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)
  password2 = serializers.CharField(max_length=255, style={'input_type':'password'}, write_only=True)


  class Meta:
    fields = ['password', 'password2']

  def validate(self, attrs):
    try:
      password = attrs.get('password')
      password2 = attrs.get('password2')
      uid = self.context.get('uid')
      token = self.context.get('token')
      if password != password2:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      uid = smart_str(urlsafe_base64_decode(uid))
      user = CustomUser.objects.get(uid = uid)
      if not PasswordResetTokenGenerator().check_token(user, token):
        raise serializers.ValidationError('Token is not Valid or Expired')
      user.set_password(password)
      user.save()
      return attrs
    except DjangoUnicodeDecodeError as identifier:
      PasswordResetTokenGenerator().check_token(user, token)
      raise serializers.ValidationError('Token is not Valid or Expired')
  


class AddressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    class Meta:
        model = Address
        fields = '__all__'
      
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['uid'] = str(instance.uid)
        return ret

def generate_shop_id(length = 10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range (97,123)] + [str(i) for i in range(10)]) for _ in range(length))



class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ('email', 'first_name', 'last_name', 'username', 'phone', 'profile_pic', 'gender')
