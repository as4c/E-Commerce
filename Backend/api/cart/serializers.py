from rest_framework import serializers
from .models import UserCart
from django.db.models import F
class UserCartSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['product'] = str(instance.product)
        ret['user'] = str(instance.user)
        # if isinstance(ret['quantity'], F):
        #     ret['quantity'] = ret['quantity'].rhs.value
        # else:
        #     ret['quantity'] = int(ret['quantity'])
            
        return ret
    

    class Meta:
        model = UserCart
        fields = '__all__'
