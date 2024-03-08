from api.cart.models import UserCart
def delete_cart_items(user):
    try:
        cart_items = UserCart.objects.filter(user = user)
        if cart_items.exists:
            for items in cart_items:
                items.delete()
        else:
            print("no items found.") 

    except Exception as e: 
        print("no items found...", e)



from api.utils import Util
def send_orders_notification(order, status, order_url):
    """Send a notification to the customer about their order.

    Args:
        order (Order): The Order object representing the order that needs to be notified.

    Returns:
        None
    """
    if status ==True:
        subject = f"Order {order.uid} has been placed."
    else:
        subject = f"Order {order.uid} has been failed."
    email_data = {
        'subject': subject,
        'body': f"Dear {order.customer.username},\n\nWe are pleased to confirm that your order {order.uid} has been placed. Your order summary is as follows:\n\n{order_url}\n\nThank you for shopping with us!",
        'to_email': order.customer.email
    }
    Util.send_email(email_data)





def send_orders_notification_from_cart(customer, status, order_url):
    """Send a notification to the customer about their order.

    Args:
        order (Order): The Order object representing the order that needs to be notified.

    Returns:
        None
    """
    if status ==True:
        subject = f"Order has been placed."
    else:
        subject = f"Order has been failed."

    email_data = {
        'subject': subject,
        'body': f"Dear {customer.username},\n\nWe are pleased to confirm that your orders has been placed. Your order summary is as follows:\n\n{order_url}\n\nThank you for shopping with us!",
        'to_email': customer.email
    }
    Util.send_email(email_data)