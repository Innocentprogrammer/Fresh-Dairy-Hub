import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentButtonProps {
  amount: number;
  cartItems: string;
  onSuccess?: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, cartItems, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // 1. Create an order on your server with cart items information
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          receipt: `order_${Date.now()}`,
          items: cartItems, // Include cart items for order tracking
        }),
      });
      
      const { order } = await response.json();
      
      if (!order) {
        throw new Error('Failed to create order');
      }
      
      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Fresh Dairy Hub',
        description: `Payment for ${cartItems.length} items`, // Customize description
        order_id: order.id,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            // 3. Verify payment on server
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_details: {
                  amount,
                  items: cartItems,
                  timestamp: new Date().toISOString(),
                },
              }),
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              // Payment verified successfully
              if (onSuccess) {
                onSuccess();
              }
              // Redirect to success page or show success message
              router.push('/payment/success');
            } else {
              // Payment verification failed
              router.push('/payment/failure');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            router.push('/payment/failure');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          items_count: cartItems.length,
        },
        theme: {
          color: '#3B8069',
        },
      };
      
      // Create Razorpay instance
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button 
      onClick={handlePayment}
      disabled={isLoading || amount <= 0 || cartItems.length === 0}
      className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
    </button>
  );
};

export default PaymentButton;