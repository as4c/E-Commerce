from api.utils import Util
def send_orders_notification(order):
    """Send a notification to the customer about their order.

    Args:
        order (Order): The Order object representing the order that needs to be notified.

    Returns:
        None
    """
    email_data = {
        'subject': f"Order {order.uid} has been placed",
        'body': f"Dear {order.customer.username},\n\nWe are pleased to confirm that your order {order.uid} has been placed. Your order summary is as follows:\n\n{order.order_status}\n\nThank you for shopping with us!",
        'to_email': order.customer.email
    }
    Util.send_email(email_data)