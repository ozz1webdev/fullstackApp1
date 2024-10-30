from django.urls import path
from .views import (PostList,
                    PostDetail,
                    PostCreate,
                    PostUpdate,
                    PostDelete,
                    CommentsList,
                    CommentsCreate)


urlpatterns = [
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>/', PostDetail.as_view()),
    path('create/', PostCreate.as_view()),
    path('update/<int:pk>/', PostUpdate.as_view()),
    path('delete/<int:pk>/', PostDelete.as_view()),
    path('comments/<int:pk>/', CommentsList.as_view()),
    path('comments/create/<int:pk>/', CommentsCreate.as_view()),
]
