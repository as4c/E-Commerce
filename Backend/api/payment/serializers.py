from rest_framework import serializers
from .models import PaymentByUser


class PaymentByUserSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%d %B %Y %I:%M %p")
    updated_at = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    def to_representation(self, instance):
        ret =  super().to_representation(instance)
        ret['order'] = str(instance.order)

        return ret
    class Meta:
        model = PaymentByUser
        fields = '__all__'