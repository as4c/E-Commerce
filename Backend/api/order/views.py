
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.renderer import UserRenderer
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from . models import Order
from api.accounts.models import Address
from api.product.models import Product
from decimal import Decimal
from rest_framework.decorators import api_view, permission_classes
from api.product.serializers import ProductSerializer
from api.accounts.models import Address
from api.accounts.serializers import AddressSerializer
from django.utils import timezone
from api.cart.models import UserCart 
from api.payment.utils import delete_cart_items
from api.deliveryboy.models import DeliveryBoy
from api.deliveryboy.serializers import DeliveryBoySerializer
from api.utils import UUIDEncoder
from django.http import JsonResponse
from api.vendor.models import VendorUser
from api.deliveryboy.models import DeliveryBoy
from .utils import send_orders_notification
UserModel = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_order(request, uid):
  
    order = get_object_or_404(Order, uid = uid)
    
    
 
    order_serializer = OrderSerializer(order)
    try:
        product = get_object_or_404(Product, uid = order.product.uid)
        product_serializer = ProductSerializer(product).data
    except Product.DoesNotExist:
        product_serializer = {'Product has been deleted.'}

    try:
        address = get_object_or_404(Address, uid = order.customer_address.uid)
        address_serializer = AddressSerializer(address).data  
    except Address.DoesNotExist:
        address_serializer = {'No address associated.'} 

    try:
        if order.delivery_boy is None:
            delivery_boy_serializer = {''}
        else:
            delivery_boy =DeliveryBoy.objects.get(user = order.delivery_boy.user)
            delivery_boy_serializer = DeliveryBoySerializer(delivery_boy).data
    except DeliveryBoy.DoesNotExist:
        delivery_boy_serializer = {''}

    response = {
        'status': status.HTTP_200_OK,
        'product': product_serializer,
        'address': address_serializer,
        'order': order_serializer.data,
        'delivery_boy' : delivery_boy_serializer
    }
    # print(response)
    return Response(response, status=status.HTTP_200_OK)



class OrderGetAndCreateView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]

    def get(self, request):
        orders = Order.objects.filter(customer = request.user)
        if orders.exists(): 
            order_data = []
            for order in orders:
                order_serializer = OrderSerializer(order).data
                try:
                    product = Product.objects.get(uid = order.product.uid)
                    product_serializer = ProductSerializer(product).data
                except Product.DoesNotExist:
                    product_serializer = {'data' : 'Product has been deleted.'}
                try:
                    address = Address.objects.get(uid = order.customer_address.uid) 
                    address_serializer = AddressSerializer(address).data
                    
                except Address.DoesNotExist:
                    address_serializer = {'No address associated.'} 
                try:
                    if order.delivery_boy is None:
                        delivery_boy_serializer = {}
                    else:
                        delivery_boy = DeliveryBoy.objects.get(user=order.delivery_boy.user)
                        delivery_boy_serializer = DeliveryBoySerializer(delivery_boy).data
                except DeliveryBoy.DoesNotExist:
                    delivery_boy_serializer = {}

                order_data.append({
                    'product': product_serializer,
                    'address': address_serializer,
                    'order':   order_serializer,
                    'delivery_boy': delivery_boy_serializer
                })

            response = {
                'status': status.HTTP_200_OK,
                'orders': order_data
            }
            return JsonResponse(response, status = status.HTTP_200_OK, encoder=UUIDEncoder)
        else:
            return Response({"msg": "You haven't purchased any items yet. Purchase Now!"}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request):

        data = request.data
        customer = request.user
        data['created_at'] = timezone.now()
        data['updated_at'] = timezone.now()
        serializer = OrderSerializer(data = data)
        if serializer.is_valid():

            order = serializer.save(customer = customer)

            product = Product.objects.get(uid = data['product'])
            
            order.product = product

            order.total_actual_amount = product.actual_price * order.quantity

            order.total_effective_amount = product.effective_price * order.quantity

            total_discount_amount = order.total_actual_amount - order.total_effective_amount

            order.total_discount_amount = total_discount_amount * order.quantity

            total_discount_percentage = (total_discount_amount / order.total_actual_amount) * 100

            order.total_discount_percentage = total_discount_percentage 

            product.stock -= order.quantity

            product.save()

            # update the sales count of the seller
            seller = get_object_or_404(VendorUser, uid = product.seller.uid)
            seller.total_sales += 1
            seller.save()

            if order.payment_mode == 'ONL':
                order.order_status = 'A'
                order.order_type = 'I'
                order.transaction_id = ""
                order.save()
                serialized_order = {
                    'uid': str(order.uid),
                    'customer': str(order.customer.uid),
                    'quantity': order.quantity,
                    'total_actual_amount': str(order.total_actual_amount),
                    'total_effective_amount': str(order.total_effective_amount),
                    'total_discount_amount': str(order.total_discount_amount),
                    'total_discount_percentage': int(order.total_discount_percentage),
                    'order_status': order.order_status,
                    'payment_mode': order.payment_mode,
                    'payment_status': order.payment_status,
                    
                }
                delete_cart_items(request.user)
                send_orders_notification(order)
                return Response({
                    'message': 'Order Placed successfully! Please make the payment.', 
                    'data':serialized_order}, 
                    status = status.HTTP_201_CREATED
                )
            else:
                order.payment_mode = 'COD'
                order.order_status = 'A'
                order.order_type = 'I'
                order.transaction_id = "Cash on delivery"
                order.save()
                serialized_order = {
                    'uid': str(order.uid),
                    'customer': str(order.customer.uid),
                    'quantity': order.quantity,
                    'total_actual_amount': str(order.total_actual_amount),
                    'total_effective_amount': str(order.total_effective_amount),
                    'total_discount_amount': str(order.total_discount_amount),
                    'total_discount_percentage': int(order.total_discount_percentage),
                    'order_status': order.order_status,
                    'payment_mode': order.payment_mode,
                    'payment_status': order.payment_status,
                }
                delete_cart_items(request.user)
                send_orders_notification(order)
                return Response({
                    'message': 'Order Placed successfully!', 
                    'data' : serialized_order}, 
                    status = status.HTTP_201_CREATED
                )
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def BuyAll(request):
    """
    API endpoint that allows users to buy all items in their cart.
    """
    customer = request.user
    payload = request.data
    carts = UserCart.objects.filter(user = customer)
    orders_list = []
    total_payable_amount = 0
    for cart_data in carts:
        order_data = {
            'quantity' : cart_data.quantity,
            'customer_address' : payload['customer_address'],
            'payment_mode' : payload['payment_mode'],
            'created_at' : timezone.now(),
            'updated_at' : timezone.now()
        }   
        # Create a new Order instance and save it into the database
        
        serializer = OrderSerializer(data = order_data)

        if serializer.is_valid():

            order = serializer.save(customer = customer)
         

            product = Product.objects.get(uid = cart_data.product.uid)

            order.product = product

            order.total_actual_amount = product.actual_price * order.quantity

            order.total_effective_amount = product.effective_price * order.quantity

            total_discount_amount = order.total_actual_amount - order.total_effective_amount

            order.total_discount_amount = total_discount_amount * order.quantity

            total_discount_percentage = (total_discount_amount / order.total_actual_amount) * 100

            order.total_discount_percentage = total_discount_percentage 

            product.stock -= order.quantity

            product.save()

            total_payable_amount +=  order.total_effective_amount

            if order.payment_mode == 'ONL':
                order.order_status = 'A'
                order.order_type = 'G'
                order.transaction_id = ""
                order.save()
                
            else:
                order.payment_mode = 'COD'
                order.order_status = 'A'
                order.order_type = 'G'
                order.transaction_id = "Cash on delivery"
                order.save()
                delete_cart_items(request.user)
            orders_list.append(order.uid)
        else:
            return Response( { 
            'message': 'Something went wrong!',
            'status' : 'failed', 
            'errors' : serializer.errors}, 
            status=status.HTTP_400_BAD_REQUEST
        )  

    return Response({
            'orders' : orders_list, 
            'total_amount' : total_payable_amount,
            'message': 'Order Placed successfully!', 
            'status' : 'Success'
            },
            status = status.HTTP_201_CREATED
        )
    
@api_view(['POST'])
def filter_orders(request):
    payload = request.data  # {type, value}
    try:
        if request.user.is_vendor:
            staff = get_object_or_404(VendorUser, owner = request.user)
            if payload['type'] == 'payment_status':
                queryset = Order.objects.filter(product__seller = staff.uid, payment_status=payload['value'])

            elif payload['type'] == 'order_status':
                queryset = Order.objects.filter(product__seller = staff.uid, order_status=payload['value'])


        elif request.user.is_delivery_boy:
            staff = get_object_or_404(DeliveryBoy, user = request.user)
            if payload['type'] == 'payment_status':
                queryset = Order.objects.filter(delivery_boy = staff.uid, payment_status=payload['value'])

            elif payload['type'] == 'order_status':
                queryset = Order.objects.filter(delivery_boy = staff.uid, order_status=payload['value'])

        
        order_data = []
        for order in queryset:
            order_serializer = OrderSerializer(order).data
            try:
                product = Product.objects.get(product_name=order.product)
                product_serializer = ProductSerializer(product).data

                address = Address.objects.get(uid=order.customer_address.uid)
                address_serializer = AddressSerializer(address).data

            except Product.DoesNotExist:
                product_serializer = {'msg': 'Product has been deleted.'}
                address_serializer = {'msg': 'No address associated.'}

            order_data.append({
                'product': product_serializer,
                'address': address_serializer,
                'order': order_serializer
            })

        response = {
            'status': status.HTTP_200_OK,
            'orders': order_data
        }

        return Response(response, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"message": "Something went wrong", 'data': str(e)}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_or_return_order(request, order_id):
    payload = request.data # status (C, R)
    try:
        order_obj = get_object_or_404(Order, uid = order_id)
        if payload['status'] == 'C':
            seller = get_object_or_404(VendorUser, uid = order_obj.product.seller.uid)
            seller.total_sales -= 1
            seller.save()
            if order_obj.payment_mode == 'ONL' and order_obj.payment_status == 'S':
                process_refund(order_obj)
                order_obj.order_status = 'C'
                order_obj.payment_status = 'R'
                order_obj.save()
            else:
                order_obj.order_status = 'C'
                order_obj.save()

            return Response({'message':'Order Cancelled.'}, status=status.HTTP_200_OK)
        else:
            if order_obj.order_status == 'D':
                process_return(order_obj)
                order_obj.order_status = 'R'
                order_obj.save()
                return Response({'message':'Order returned.'}, status=status.HTTP_200_OK)
            else:
                return Response({'message':'Order not delivered yet'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Exception at return or cancel...", e)
        return Response({'message':'Server error', 'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

def process_refund(order):
    print("refund processing....")
    print(f"{order.total_effective_amount} refunded successfully.")
    pass

def process_return(order):
    print("return processing....")
    pass