import razorpay
from datetime import timedelta

from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Subscription


# Create Razorpay Order
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        amount = request.data.get("amount")
        plan = request.data.get("plan")

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        return Response({
            "order": order,
            "plan": plan
        })


# Verify Payment + Activate Premium
class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data

        client = razorpay.Client(
            auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
        )

        try:
            # Verify signature
            client.utility.verify_payment_signature({
                "razorpay_order_id": data["razorpay_order_id"],
                "razorpay_payment_id": data["razorpay_payment_id"],
                "razorpay_signature": data["razorpay_signature"],
            })
        except:
            return Response({"error": "Payment verification failed"}, status=400)

        # Calculate expiry
        now = timezone.now()
        plan = data["plan"]

        if plan == "weekly":
            end_date = now + timedelta(days=7)

        elif plan == "monthly":
            end_date = now + timedelta(days=30)

        elif plan == "yearly":
            end_date = now + timedelta(days=365)

        else:
            return Response({"error": "Invalid plan"}, status=400)

        # Save subscription
        Subscription.objects.create(
            user=request.user,
            plan=plan,
            razorpay_order_id=data["razorpay_order_id"],
            razorpay_payment_id=data["razorpay_payment_id"],
            is_active=True,
            end_date=end_date,
        )

        return Response({"message": "Premium Activated"})

