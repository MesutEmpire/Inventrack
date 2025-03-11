from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, StockMovementViewSet

# Create a router for automatic URL handling
router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'stock-movements', StockMovementViewSet)

urlpatterns = [
    path('', include(router.urls)),
]