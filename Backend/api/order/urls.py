from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.OrderGetAndCreateView.as_view(), name = 'orders-create-get'),
    path('get/<str:uid>/',views.get_order, name ='get-order'),
    path('buy-all/', views.BuyAll, name = 'buy-all-from cart'),
    path('filter/', views.filter_orders, name = 'filter-order'),
    path('cancel-return/<str:order_id>/', views.cancel_or_return_order, name = 'cancel-or-return-order')
]
