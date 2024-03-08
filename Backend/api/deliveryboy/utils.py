import random
from api.utils import Util
def generate_boy_id(length = 10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range (97,123)] + [str(i) for i in range(10)]) for _ in range(length))


def NotifyDeliveryBoy(boy_email):

    print("New Parcel recieved. email...", boy_email)
    pass

def NotifyCustomer(customer_email):
    print("Your order is on the way. email...", customer_email)
    pass

def NotifyVendor(vendor_email):
    print("Delivery boy is Coming. email...", vendor_email)
    pass



def send_order_delivered_mail_to_customer(order):
    # Send an email to the customer notifying them that their order has been delivered.
    customer_email = order.customer.email
    data = {
        'subject': 'Your Order Has Been Delivered!',
        'body': f''''Hello {order.customer.first_name} {order.customer.last_name},
        We are writing to inform you that your order with order ID: {order.uid} has now been delivered.  
        ''',
        'to_email': customer_email
    }
    Util.send_email(data)