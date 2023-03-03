from django.urls import path
from .api_views import api_list_hats, api_detail_hat


urlpatterns = [
    path("hats/", api_list_hats, name="api_list"),
    path("hats/<int:pk>/", api_detail_hat, name="api_detail"),


]
