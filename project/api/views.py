from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializer import ProfileSerializer
from .models import Profile

class ProfileView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        profile = Profile.objects.get(owner=request.user) 
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class MyView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request):
        print(request.data)
        if request.data.keys == "aaa" :
            return Response({"message": "Hallo Bill"})
        else:
            return Response({"message": "Response From Django"})
    
    authentication_classes=[TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({"message": "Hello From Django "+request.user.username})
