from django.urls import path,include
from . import views

urlpatterns = [
    path('process/', views.ProcessOrderPaymentView.as_view(), name = 'process-payment'),
    path('complete/', views.CompletePaymentView.as_view(), name = 'complete-payment'),
    path('process-all/', views.ProcessOrderPaymentForCartView.as_view(), name = 'process-all-payment'),
    path('complete-all/', views.CompletePaymentForCartView.as_view(), name='complete-all-payment')
]
