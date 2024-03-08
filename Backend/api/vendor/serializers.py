# serializers.py
import json
from rest_framework import serializers
from .models import VendorUser
from api.accounts.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'username', 'phone', 'profile_pic', 'gender')
class VendorUserSerializer(serializers.ModelSerializer):
    owner = UserSerializer() 
    created_at_formatted = serializers.DateTimeField(source='created_at', format="%d %b. %Y", read_only=True)
    retype_bank_account = serializers.CharField(max_length=15, write_only=True)
    retype_aadhar = serializers.CharField(max_length=16, write_only=True)
    retype_ifsc_code = serializers.CharField(max_length=16, write_only=True)

    def to_representation(self, instance):
       
        ret = super().to_representation(instance)
        # ret['owner'] = str(instance.owner)
        return ret

    def validate(self, data):
        retype_account = data.get('retype_bank_account')
        retype_aadhar_number = data.get('retype_aadhar')
        retype_ifsc_code = data.get('retype_ifsc_code')
        if retype_account is not None and retype_account != data['bank_account']:
            raise serializers.ValidationError("Retyped account does not match the original account.")

        if retype_aadhar_number is not None and retype_aadhar_number != data['aadhar_number']:
            raise serializers.ValidationError("Aadhar number does not match the original Aadhar number.")
        
        if retype_ifsc_code is not None and retype_ifsc_code != data['bank_ifsc_code']:
            raise serializers.ValidationError("Bank Ifsc code not matched.")
        # print("serializer here1")
        return data

    def create(self, validated_data):
        retype_bank_account = validated_data.pop('retype_bank_account', None)
        retype_aadhar = validated_data.pop('retype_aadhar', None)
        retype_ifsc_code = validated_data.pop('retype_ifsc_code', None)

        if retype_bank_account is not None and retype_aadhar is not None:
            
            if retype_bank_account != validated_data['bank_account']:
                raise serializers.ValidationError("Retyped account does not match the original account.")

            if retype_aadhar is not None and retype_aadhar != validated_data['aadhar_number']:
                raise serializers.ValidationError("Aadhar number does not match the original Aadhar number.")
            
            if retype_ifsc_code is not None and retype_ifsc_code != validated_data['bank_ifsc_code']:
                raise serializers.ValidationError("Bank Ifsc code not matched.")
        # print("serializer here2")
        return super().create(validated_data)

    class Meta:
        model = VendorUser
        fields = '__all__'

class VendorLoginSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only = True) 
    class Meta:
        model = VendorUser
        fields = ['vendor_id', 'owner']