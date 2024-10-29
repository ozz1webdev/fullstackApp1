from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .permissions import IsAdminOrReadOnly
from rest_framework.authentication import TokenAuthentication


class PostList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostDetail(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        post = Post.objects.get(pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)


class PostCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def post(self, request):
        serializer = PostSerializer(data=request.data, context={'request': request})
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PostUpdate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def put(self, request, pk):
        post = Post.objects.get(pk=pk)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class PostDelete(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)
        post.delete()
        return Response(status=204)
