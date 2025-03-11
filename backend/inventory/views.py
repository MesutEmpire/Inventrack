from rest_framework import viewsets
from .serializers import ItemSerializer,StockMovementSerializer
from .models import Item,StockMovement
from rest_framework.permissions import IsAuthenticated


class ItemViewSet(viewsets.ModelViewSet):
    """
      API endpoint for managing inventory items.
      """
    queryset = Item.objects.all().order_by('-created_at')
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticated]


class StockMovementViewSet(viewsets.ModelViewSet):
    """
      API endpoint for tracking stock movements (Stock In & Stock Out).
      """
    queryset = StockMovement.objects.all().order_by('-timestamp')
    serializer_class = StockMovementSerializer
    permission_classes = [IsAuthenticated]