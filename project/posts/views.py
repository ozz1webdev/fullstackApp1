from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comments
from .serializers import PostSerializer, CommentsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .permissions import IsAdminOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser


class PostList(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class PostDetail(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

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
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return None

    def put(self, request, pk, format=None):
        post = self.get_object(pk)
        print(request.data)
        if post is None:
            return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        if post.author != request.user and not request.user.is_staff:
            return Response({"detail": "Not authorized to edit this post."}, status=status.HTTP_403_FORBIDDEN)

        serializer = PostSerializer(post, data=request.data, partial=True, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDelete(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    def delete(self, request, pk):
        post = Post.objects.get(pk=pk)

        if post.author != request.user and not request.user.is_staff:
            return Response({"detail": "Not authorized to delete this post."}, status=status.HTTP_403_FORBIDDEN)

        post.delete()
        return Response(status=204)


class CommentsList(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, pk):
        comments = Comments.objects.all(pk=pk)
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)


class CommentsCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post not found"}, status=404)

        serializer = CommentsSerializer(data=request.data, context={'request': request, 'post': post})
        if serializer.is_valid():
            serializer.save(author=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
