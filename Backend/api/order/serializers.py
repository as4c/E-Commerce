from rest_framework import serializers
from .models import Order
from api.product.models import Product
from api.product.serializers import ProductSerializer
class OrderSerializer(serializers.ModelSerializer):
    # items = serializers.PrimaryKeyRelatedField(many = True, queryset=Product.objects.all())
    # products = ProductSerializer(read_only = True, many = True)

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['products'] = str(instance.products)
        ret['customer_address'] = str(instance.customer_address)
        return ret
    

    class Meta:
        model = Order
        fields= '__all__'
        # depth = 1

