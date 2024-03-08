from rest_framework import serializers
from .models import Order
from api.product.models import Product
from api.product.serializers import ProductSerializer
from api.accounts.serializers import AddressSerializer
class OrderSerializer(serializers.ModelSerializer):
    
    created_at = serializers.DateTimeField(format="%d %B %Y %I:%M %p")
    updated_at = serializers.DateTimeField(format="%d %B %Y %I:%M %p")
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product'] = str(instance.product)
        ret['customer_address'] = str(instance.customer_address)
        ret['delivery_boy'] = str(instance.delivery_boy)
        return ret
    

    class Meta:
        model = Order
        fields= '__all__'
    
        
class OrderGetSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    # customer_address = AddressSerializer()

    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['customer_address'] = str(instance.customer_address)
        return ret
