from django.urls import path
from .views import (PostList,
                    PostDetail,
                    PostCreate,
                    PostUpdate,
                    PostDelete)


urlpatterns = [
    path('', PostList.as_view()),
    path('<int:pk>/', PostDetail.as_view()),
    path('create/', PostCreate.as_view()),
    path('/update/<int:pk>', PostUpdate.as_view()),
    path('/delete/<int:pk>', PostDelete.as_view()),
]
