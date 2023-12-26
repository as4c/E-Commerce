from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.DeliveryBoyCreateView.as_view(), name='delivery-boy-create'), 
    path('actions/<str:uid>/', views.DeliveryBoyActionView.as_view(), name = 'delivery-boy-action'),
    path('login/', views.DeliveryBoyLoginView.as_view(), name='delivery-boy-login'), 

]
