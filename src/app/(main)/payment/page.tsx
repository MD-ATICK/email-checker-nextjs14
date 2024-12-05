"use client"

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Test() {

  const handlePayment = async () => {
    if (window.Paddle) {
      await window.Paddle.Checkout.open({
        items: [
          {
            priceId: 'pri_01je3x5306ed7aqpfmy39awjdp',
            quantity: 1
          }
        ],
        customer: {
          email: 'customer@gmail.com'
        }
      })
    }
  }

  useEffect(() => {
    if (window.Paddle) {
      window.Paddle.Environment.set('sandbox');
      window.Paddle.Initialize({
        token: 'live_f4dc96c4f979c2462dc8d759c41'
      })
    }
  }, []);

  return (
    <div className=" container mx-auto p-10">
      <Button onClick={handlePayment}>
        Buy Plan
      </Button>
    </div>
  )
}
