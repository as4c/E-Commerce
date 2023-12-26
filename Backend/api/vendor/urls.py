from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.VenderUserView.as_view(), name='vendor'), 
    path('actions/<str:uid>/', views.VendorActionView.as_view(), name = 'vendor-action'),
    path('login/', views.VenderLoginView.as_view(), name='vendor-login'), 

]
