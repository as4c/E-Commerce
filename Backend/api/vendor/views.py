# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import VendorUser
from .utils import generate_shop_id
from api.accounts.models import CustomUser 
from api.renderer import UserRenderer
from api.utils import Util, get_login_tokens
from api.permissions import CustomPermission
from .serializers import (
    VendorUserSerializer,
    VendorLoginSerializer
)


class VenderUserView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['owner'] = str(request.user.uid)
        user = get_object_or_404(CustomUser, uid = request.user.uid)
        # print("user ", user)
        serializer = VendorUserSerializer(data=data)
        # print("here2")
        if serializer.is_valid():
            vendors = serializer.save()
            body = "Congrats! You're now a registered vendor of my company! Please Save your unique vendor Id and Keep private." + vendors.vendor_id
            data = {
            'subject':'Vendor Account Successfully Created!',
            'body': body,
            'to_email':vendors.owner.email
            }
            Util.send_email(data)
            user.is_vendor = True
            user.save()
            return Response({"msg": "Vendor Account Successfully Created.", "data" : serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class VendorActionView(APIView):
    permission_classes = [CustomPermission]
    renderer_classes = [UserRenderer]

    def get(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(VendorUser, uid=uid)
        serializer = VendorUserSerializer(instance)
        return Response(serializer.data)
    
    def put(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(VendorUser, uid = uid)
        serializer = VendorUserSerializer(instance, data=request.data)
        if serializer.is_valid():
            vendors = serializer.save()
            body ="Vendors data updated."
            data = {
            'subject':'Vendor Account Successfully Updated!',
            'body': body,
            'to_email':vendors.owner.email
            }
            Util.send_email(data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Partial update method (PATCH)
    def patch(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(VendorUser, uid = uid)
        serializer = VendorUserSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            vendors = serializer.save()
            body ="Vendors data updated."
            data = {
            'subject':'Vendor Account Successfully Updated!',
            'body': body,
            'to_email':vendors.owner.email
            }
            Util.send_email(data)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete method (DELETE)
    def delete(self, request, uid, *args, **kwargs):
        user = request.user
        print(user.email)

        instance = get_object_or_404(VendorUser, uid = uid)
        instance.delete()
        body ="Vendor Account deleted."
        data = {
            'subject':'Vendor Account Successfully deleted!',
            'body': body,
            'to_email': user.email
        }
        user.is_vendor = False
        user.save()
        Util.send_email(data)
        return Response({"msg" : "Account deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)




class VenderLoginView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    
    def post(self, request, format=None):
        serializer = VendorLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vendor_id = serializer.data.get('vendor_id')
        vendor_instance = get_object_or_404(VendorUser, vendor_id = vendor_id)
        if vendor_instance is not None:
            # print(vendor_instance)
            serializer = VendorUserSerializer(vendor_instance)
            vendor_tokens = get_login_tokens(vendor_instance.owner)
            return Response({'vendor_tokens': vendor_tokens,'msg' : 'Vendor login successfull.' ,'data':serializer.data}, status = status.HTTP_200_OK)
        else:
            return Response({"msg" : "Vendor id doesn't match. Try again." , "errors": serializer.errors}, status=status.HTTP_404_NOT_FOUND)


