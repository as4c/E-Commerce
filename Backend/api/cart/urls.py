from django.urls import path
from . import views
urlpatterns = [
    path('', views.UserCartView.as_view(), name = 'cart-view'),
    path('remove/', views.remove_cart_items, name = 'remove-cart-items')
]