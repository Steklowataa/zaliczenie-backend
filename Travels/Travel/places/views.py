from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Place, Category
from .serializers import PlaceSerializer, CategorySerializer, RegisterSerializer
import logging
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response({"error": "Please provide both username and password"}, status=400)
        user = User.objects.create_user(username=username, password=password)
        user.is_staff = True
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid credentials"}, status=401)

class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({"success": "Logged out"})

# def index(request):
#     latest_posts = Place.objects.all()
#     return HttpResponse(latest_posts)

class PlaceList(generics.ListCreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Przypisanie miejsca do użytkownika

class PlaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [permissions.AllowAny]


@login_required
def home(request):
    print("Czy uzytkownik jest zalogowany: ", request.user.is_authenticated)
    return render(request, "home.html", {})


class PlaceListView(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [permissions.AllowAny]
    def perform_create(self, serializer):
        logging.warning(self.request.data)
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def add(self, request, pk=None):
        place = get_object_or_404(Place, pk=pk)
        place.save()
        return Response({"success": "Place add successfully"})

class CategoryListView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]


@method_decorator(csrf_exempt, name='dispatch')
class PlaceCreate(generics.CreateAPIView):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        print("Authenticated user:", self.request.user)
        print("Auth header:", self.request.META.get("HTTP_AUTHORIZATION"))
        serializer.save(user=self.request.user)
