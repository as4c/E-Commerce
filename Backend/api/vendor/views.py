# views.py
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import VendorUser
from api.accounts.models import CustomUser 
from api.renderer import UserRenderer
from api.utils import Util, get_login_tokens
from api.permissions import CustomPermission
from .serializers import (
    VendorUserSerializer,
    VendorLoginSerializer
)
from api.order.models import Order
from api.product.models import Product
from api.product.serializers import ProductSerializer
from rest_framework.decorators import api_view, permission_classes


class VenderUserView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['owner'] = str(request.user.uid)
        user = get_object_or_404(CustomUser, uid = request.user.uid)
        print("user ", user)
        serializer = VendorUserSerializer(data=data)
        print('shop : ', data['shop_name'])
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
    
class VendorProfile(RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return VendorUser.objects.filter(owner=user)

    def get(self, request, *args, **kwargs):
        instance = self.get_queryset().first()  # Get the first instance from the queryset
        if instance:
            serializer = VendorUserSerializer(instance)
            return Response(serializer.data)
        else:
            return Response({"detail": "Vendor profile not found for this user."}, status=404)

class VendorActionView(APIView):
    permission_classes = [CustomPermission]
    renderer_classes = [UserRenderer]

    def get(self, request, uid, *args, **kwargs):
        instance = get_object_or_404(VendorUser, uid = uid)
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
        user = request.user
        serializer = VendorLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vendor_id = serializer.data.get('vendor_id')
        vendor_instance = get_object_or_404(VendorUser, vendor_id=vendor_id)

        if user == vendor_instance.owner:
            if vendor_instance is not None:
                # Include owner data only when user is the owner
                serializer_vendor = VendorUserSerializer(vendor_instance, context={'request': request})
                # owner_data = JSONParser().parse(serializer_vendor.data)
                # owner_email = owner_data.get('owner', {}).get('email')
                # print(owner_email)
                vendor_tokens = get_login_tokens(vendor_instance.owner)
                return Response({'vendor_tokens': vendor_tokens, 'msg': 'Vendor login successfull.',
                                 'data': serializer_vendor.data},
                                status=status.HTTP_200_OK)
            else:
                return Response({"msg": "Vendor id doesn't match. Try again.", "errors": serializer.errors},
                                status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"msg": "Vendor with this ID not found. Try again.", "errors": serializer.errors},
                            status=status.HTTP_404_NOT_FOUND)



class ListedProduct(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [UserRenderer]

    def get(self, request):
        user = request.user
        vendor = get_object_or_404(VendorUser, owner = user)
        if vendor is None:
            return Response({"msg" : "You are not a vendor user."}, status=status.HTTP_401_UNAUTHORIZED)
        
        products = Product.objects.filter(seller = vendor)
        if products is not None:
            serializer = ProductSerializer(products, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"msg" : "product list is empty"}, status=status.HTTP_204_NO_CONTENT)
        


from api.order.serializers import OrderSerializer
from api.accounts.models import Address
from api.accounts.serializers import AddressSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_orders(request):
    
    if(request.user.is_vendor):
        try:
            vendor = get_object_or_404(VendorUser, owner = request.user)
            # print(vendor) 
            orders_list = Order.objects.filter(product__seller = vendor.uid)
            if orders_list.exists():
            
                order_data = []
                for order in orders_list:
                    
                    order_serializer = OrderSerializer(order).data
                    # print("order...", order_serializer)
                    try:
                        product = Product.objects.get(product_name = order.product)
                        product_serializer = ProductSerializer(product).data
                        # print("product ...",product_serializer)
                        address = Address.objects.get(uid = order.customer_address.uid) 
                        address_serializer = AddressSerializer(address).data
                        # print("address... ", address_serializer)
                    except Product.DoesNotExist:
                        product_serializer = {'msg': 'Product has been deleted.'}
                        address_serializer = {'msg': 'No address associated.'}
            

                    order_data.append({
                        'product': product_serializer,
                        'address': address_serializer,
                        'order':   order_serializer
                    })

                response = {
                    'status': status.HTTP_200_OK,
                    'orders': order_data
                }

                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({"msg": "You haven't got any orders yet. Please Wait! "}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            print("Exceptions ....", e)
            return Response({'message' : "something went wrong!."}, status=status.HTTP_404_NOT_FOUND)
    else:
        print("you are not a vendor user.")
        return Response({'message' : "you are not a vendor user."}, status=status.HTTP_404_NOT_FOUND)
        

from api.accounts.serializers import  UserProfileSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_order_details(request, uid):
  
    order   = get_object_or_404(Order, uid = uid)
    product = get_object_or_404(Product, product_name=order.product)
    customer = get_object_or_404(CustomUser, uid = order.customer.uid)
    customer_address = get_object_or_404(Address, uid = order.customer_address.uid)
 
    order_serializer = OrderSerializer(order)
    product_serializer = ProductSerializer(product)
    customer_serializer = UserProfileSerializer(customer)
    address_serializer = AddressSerializer(customer_address)

    response = {
        'status': status.HTTP_200_OK,
        'product': product_serializer.data,
        'customer': customer_serializer.data,
        'address': address_serializer.data,
        'order': order_serializer.data
    }
    # print(response)
    return Response(response, status=status.HTTP_200_OK)

from api.deliveryboy.views import assign_delivery_boy

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def update_orders_status(request, uid):
    try:
        payload = request.data
        
        order   = get_object_or_404(Order, uid = uid)
        if request.user == order.product.seller.owner or request.user.uid == order.delivery_boy.user.uid:
            if payload['status'] == 'P':
                response = assign_delivery_boy(order)
                if response['success']:
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)

            order.order_status = payload['status']
            order.save()
            return Response({'success' : True, 'message' : 'Status Updated.'}, status = status.HTTP_200_OK)
        else:
            return Response({'message' : "You haven't permission to update status."}, status = status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exceptions ....", e)
        return Response({'message' : "something went wrong!."}, status = status.HTTP_400_BAD_REQUEST)
