from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.VenderUserView.as_view(), name='vendor'), 
    path('actions/<str:uid>/', views.VendorActionView.as_view(), name = 'vendor-action'),
    path('login/', views.VenderLoginView.as_view(), name='vendor-login'), 
    path('dashboard/', views.VendorProfile.as_view(), name= 'vendor-profile'),
    path('product-list/', views.ListedProduct.as_view(), name = 'vendor-product-list'),
    path('order-list/', views.get_orders, name = 'vendor-orders'),
    path('order-details/<str:uid>/', views.get_order_details, name = 'vendor-orders-details'),
    path('update-order-status/<str:uid>/', views.update_orders_status, name='update-order-status')
]
