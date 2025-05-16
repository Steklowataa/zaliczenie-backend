from django.urls import path, include
from .views import PlaceListView, CategoryListView
from django.contrib.auth.views import LogoutView
from .views import RegisterView, LoginView, LogoutView, PlaceList, PlaceDetail, PlaceCreate
from rest_framework.routers import DefaultRouter

app_name = 'base'
router = DefaultRouter()
router.register(r'places', PlaceListView, 'places')
router.register(r'categories', CategoryListView, 'categories')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/register', RegisterView.as_view(), name='register'),
    path('api/auth/login', LoginView.as_view(), name='login'),
    path('api/auth/logout', LogoutView.as_view(), name='logout'),
    path("api/places", PlaceList.as_view(), name="places"),
    path("api/places/<int:pk>/", PlaceDetail.as_view(), name="place_detail"),
    path("api/places/create", PlaceCreate.as_view(), name="place_create"),
]

