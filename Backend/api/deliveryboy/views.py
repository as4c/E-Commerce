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
   DeliveryBoyLoginSerializer,
   DeliveryProfileSerializer
)
from api.accounts.models import Address
from rest_framework.decorators import api_view, permission_classes
from api.deliveryboy.utils import NotifyCustomer, NotifyDeliveryBoy, NotifyVendor
from api.order.models import Order
from django.db.models import Q, F
from api.order.serializers import OrderSerializer
from api.product.models import Product
from api.product.serializers import ProductSerializer
from api.accounts.serializers import AddressSerializer
from .utils import send_order_delivered_mail_to_customer

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


def assign_delivery_boy(order):
    try:
        customer_email = order.customer.email
        vendor_email = order.product.seller.owner.email
        delivery_address = order.customer_address
        delivery_boys_in_city = DeliveryBoy.objects.filter(zipcodes = delivery_address.zipcode, city = delivery_address.city)
    
        localities = [locality.strip() for locality in delivery_boys_in_city.values_list('locality', flat=True)[0].split(',')]
        locality_conditions = Q()
        for locality in localities:
            locality_conditions |= Q(locality__contains=locality)

        # Filter delivery boys with an exact locality match
        delivery_boys_with_exact_loc = delivery_boys_in_city.filter(locality_conditions)

        if  delivery_boys_with_exact_loc.exists():
            # Order delivery boys by total parcel count in ascending order (current parcel + today delivered parcel)
            ordered_delivery_boys = delivery_boys_with_exact_loc.annotate(
                total_parcel_count=F('curr_parcel_cnt') + F('daily_delivered')
            ).order_by('total_parcel_count', 'created_at')

            # Assign the order to the delivery boy with the minimum total parcel count and oldest created_at
            if ordered_delivery_boys.exists():
                assigned_delivery_boy = ordered_delivery_boys.first()

                # Update the parcel count for the assigned delivery boy
                assigned_delivery_boy.curr_parcel_cnt += 1
                assigned_delivery_boy.save()

                delivery_boy_data = {
                    'alternate_phone': assigned_delivery_boy.alternate_phone,
                    'dl_number': assigned_delivery_boy.dl_number,
                    'pan_card_number': assigned_delivery_boy.pan_card_number,
                    'aadhar_number': assigned_delivery_boy.aadhar_number,
                    'bank_account': assigned_delivery_boy.bank_account,
                    'bank_ifsc_code': assigned_delivery_boy.bank_ifsc_code,
                    'locality': assigned_delivery_boy.locality,
                    'city': assigned_delivery_boy.city,
                    'state': assigned_delivery_boy.state,
                    'zipcodes': assigned_delivery_boy.zipcodes,
                    'curr_parcel_cnt':  assigned_delivery_boy.curr_parcel_cnt,
                    'daily_delivered':  assigned_delivery_boy.daily_delivered,
                    'total_delivered': assigned_delivery_boy.total_delivered,
                }
                boy_serializer = DeliveryProfileSerializer(assigned_delivery_boy, data = delivery_boy_data)
                
                if boy_serializer.is_valid():
                    boy_serializer.save()
                    NotifyDeliveryBoy(assigned_delivery_boy.user.email)
                    NotifyCustomer(customer_email)
                    NotifyVendor(vendor_email)
                    order.delivery_boy = assigned_delivery_boy
                    order.order_status = 'P'
                    order.save()
                    response = {'success' : True, 'data' : boy_serializer.data, 'message': 'Order assigned to a delivery boy successfully.'}
                    return response
                else:
                    print(boy_serializer.errors)
                    response = {'success' : False,'data' : boy_serializer.errors, 'message': 'Order not assigned to a delivery boy.'}
                    return response
                   
            else:
                return {'success' : False,'message':'Delivery boys is unknown.'}
        else:
            return {'success' : False,'message':'Delivery boys not available for given address.'}
    
    except Exception as e:
        print("Exception at assign delivery boy...", e)
        return {'success' : False,'message':'Something went wrong2!'}
    

@api_view(['GET'])
def get_all_parcels(request):
    try:
        parcels = Order.objects.filter(delivery_boy__user = request.user)
        if parcels.exists():
            order_data = []
            for order in parcels:
                    
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
            return Response({'message':'Something went wrong!'},status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception at get all parcels...", e)
        return Response({'success' : False,'message':'Something went wrong!'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST',])
@permission_classes([IsAuthenticated])
def order_deliver_or_pickup(request, uid):
    try:
        payload = request.data
        order   = get_object_or_404(Order, uid = uid)
        if (request.user.uid == order.delivery_boy.user.uid):
            if payload['status'] == 'D':
                send_order_delivered_mail_to_customer(order)
                order.order_status = payload['status']
                order.curr_parcel_cnt -= 1
                order.daily_delivered += 1
                order.total_delivered += 1
                order.save()
                return Response({'success' : True, 'message' : 'Order delivered.'}, status = status.HTTP_200_OK)
            return Response({'message' : "Order status not changed!."}, status = status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'message' : "Something went wrong!."}, status = status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exceptions ....", e)
        return Response({'message' : "something went wrong!."}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)
