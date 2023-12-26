from django.urls import path,include
from . import views

urlpatterns = [
    path('process/', views.ProcessOrderPaymentView.as_view(), name = 'process-payment'),
    path('complete/', views.CompletePaymentView.as_view(), name = 'complete-payment')
   
]
