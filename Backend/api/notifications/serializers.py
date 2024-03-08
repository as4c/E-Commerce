from rest_framework import serializers
from .models import ProductStockNotification

class ProductStockNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductStockNotification
        fields = '__all__'
