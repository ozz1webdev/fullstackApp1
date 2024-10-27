from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','owner','role','name','lastname','email','profileImage','created_at','updated_at']
        read_only_fields = ['owner']
