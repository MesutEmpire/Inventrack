from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, StockMovementViewSet,SupplierViewSet,CategoryViewSet

# Create a router for automatic URL handling
router = DefaultRouter()
router.register(r'items', ItemViewSet)
router.register(r'stock-movements', StockMovementViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]