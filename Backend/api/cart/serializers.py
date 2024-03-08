from rest_framework import serializers
from .models import UserCart
from django.db.models import F
from api.product.serializers import ProductSerializer
from api.vendor.serializers import UserSerializer


class UserCartSerializer(serializers.ModelSerializer): 
    # product = ProductSerializer()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product'] = str(instance.product)
        ret['user'] = str(instance.user)
            
        return ret
    

    class Meta:
        model = UserCart
        fields = '__all__'


class CartGetSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Convert UUID field to string
        ret['user'] = str(instance.user)
        return ret
    class Meta:
        model = UserCart
        fields = '__all__'