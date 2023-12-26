# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import DeliveryBoy
from api.accounts.models import CustomUser 
from api.renderer import UserRenderer
from api.utils import Util, get_login_tokens
from .permissions import CustomPermission
from .serializers import (
   DeliveryBoySerializer,
   DeliveryBoyLoginSerializer
)


class DeliveryBoyCreateView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['user'] = str(request.user.uid)
        user = get_object_or_404(CustomUser, uid = request.user.uid)
        # print("user ", user)
        serializer = DeliveryBoySerializer(data=data)
        # print("here2")
        if serializer.is_valid():
            boy = serializer.save()
            body = "Congrats! You're now a registered Delivery Boy of my company! Please Save your unique Id and Keep private." + boy.delivery_boy_id
            data = {
            'subject':'Vendor Account Successfully Created!',
            'body': body,
            'to_email':boy.user.email
            }
            Util.send_email(data)
            user.is_delivery_boy = True
            user.save()
            return Response({"msg": "Delivery Boy Account Successfully Created.", "data" : serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class DeliveryBoyActionView(APIView):
    permission_classes = [CustomPermission]
    renderer_classes = [UserRenderer]

    def get(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(DeliveryBoy, uid=uid)
        serializer = DeliveryBoySerializer(instance)
        return Response(serializer.data)
    
    
    def put(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(DeliveryBoy, uid = uid)
        serializer = DeliveryBoySerializer(instance, data=request.data)
        if serializer.is_valid():
            boy = serializer.save()
            body ="Your account updated."
            data = {
            'subject':'Your Account Successfully Updated!',
            'body': body,
            'to_email':boy.user.email
            }
            Util.send_email(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Partial update method (PATCH)
    def patch(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(DeliveryBoy, uid = uid)
        serializer = DeliveryBoySerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            boy = serializer.save()
            body ="Your account updated."
            data = {
            'subject':'Your Account Successfully Updated!',
            'body': body,
            'to_email':boy.user.email
            }
            Util.send_email(data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    # Delete method (DELETE)
    def delete(self, request, uid, *args, **kwargs):
        # print("uid : ", uid)
        instance = get_object_or_404(DeliveryBoy, uid = uid)
        # print(instance)
        user = instance.user
        # print(user)
        email = instance.user.email
        # print(email)
        instance.delete()
        body ="Your Account deleted."
        data = {
            'subject':'Your Account Successfully deleted!',
            'body': body,
            'to_email':email
        }
        user.is_delivery_boy = False
        user.save()
        Util.send_email(data)
        return Response(status=status.HTTP_204_NO_CONTENT)




class DeliveryBoyLoginView(APIView):
    permission_classes = [IsAuthenticated, CustomPermission]
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = DeliveryBoyLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        boy_id = serializer.data.get('delivery_boy_id')
        boy_instance = get_object_or_404(DeliveryBoy, delivery_boy_id = boy_id)
        if boy_instance is not None:
            # print(vendor_instance)
            serializer = DeliveryBoySerializer(boy_instance)
            boy_tokens = get_login_tokens(boy_instance.user)
            return Response({'delivery_boy_tokens': boy_tokens,'msg' : 'Delivery boy login successfull.' ,'data':serializer.data}, status = status.HTTP_200_OK)
        else:
            return Response({"msg" : "Delivery boy id doesn't match. Try again." , "errors": serializer.errors}, status=status.HTTP_404_NOT_FOUND)


