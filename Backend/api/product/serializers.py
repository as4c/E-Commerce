from rest_framework import serializers

from . models import Product, ProductImage


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['seller'] = str(instance.seller)
        ret['category'] = str(instance.category)
        return ret
    
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {'uid': {'read_only': True}}


class ProductImageSerializer(serializers.ModelSerializer):

    image = serializers.ImageField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product'] = str(instance.product)
       
        return ret
    
    class Meta:
        model = ProductImage
        fields = '__all__'