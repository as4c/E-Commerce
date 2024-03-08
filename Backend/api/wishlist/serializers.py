from rest_framework import serializers
from .models import UserWishList
from api.product.serializers import ProductSerializer
class UserWishlistSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product'] = str(instance.product)
        ret['user'] = str(instance.user)
            
        return ret
    

    class Meta:
        model = UserWishList
        fields = '__all__'



class WishlistGetSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['user'] = str(instance.user)
            
        return ret
    

    class Meta:
        model = UserWishList
        fields = '__all__'