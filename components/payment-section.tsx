"use client";

import { useState } from "react";
import { CreditCard, Banknote, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type PaymentMethod = "credit" | "debit" | "cash" | "declining";

interface PaymentSectionProps {
  totalPrice: number;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  selectedMethod: PaymentMethod | null;
  onProcessPayment: (method: PaymentMethod) => Promise<boolean>;
  isProcessing?: boolean;
}

export function PaymentSection({
  totalPrice,
  onPaymentMethodChange,
  selectedMethod,
  onProcessPayment,
  isProcessing = false,
}: PaymentSectionProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [studentId, setStudentId] = useState("");
  const [processingPayment, setProcessingPayment] = useState(false);

  const paymentMethods = [
    {
      id: "credit",
      name: "Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, Amex",
      color: "bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20",
    },
    {
      id: "debit",
      name: "Debit Card",
      icon: CreditCard,
      description: "Direct bank account",
      color: "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20",
    },
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      description: "Pay on delivery",
      color: "bg-green-500/10 border-green-500/30 hover:bg-green-500/20",
    },
    {
      id: "declining",
      name: "Declining Balance",
      icon: DollarSign,
      description: "Student ID Card Balance",
      color: "bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20",
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;

    // Validation
    if (selectedMethod === "credit" || selectedMethod === "debit") {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        alert("Please fill in all card details");
        return;
      }
    }

    if (selectedMethod === "declining") {
      if (!studentId) {
        alert("Please enter your Student ID");
        return;
      }
    }

    setProcessingPayment(true);
    const success = await onProcessPayment(selectedMethod);
    setProcessingPayment(false);

    if (success) {
      // Clear form
      setCardNumber("");
      setCardExpiry("");
      setCardCvv("");
      setStudentId("");
    }
  };

  return (
    <div className="rounded-2xl bg-card p-6">
      <h2 className="text-lg font-semibold text-card-foreground mb-6">Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onPaymentMethodChange(method.id as PaymentMethod)}
              className={cn(
                "relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-transparent bg-muted/50 hover:bg-muted",
                method.color
              )}
            >
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{method.name}</p>
                <p className="text-xs text-muted-foreground">{method.description}</p>
              </div>
              {isSelected && (
                <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Payment Details Form */}
      {selectedMethod && (
        <div className="mb-6 space-y-4 p-4 rounded-xl bg-muted/30 border border-border">
          {(selectedMethod === "credit" || selectedMethod === "debit") && (
            <>
              <div>
                <Label htmlFor="cardNumber" className="text-sm text-muted-foreground">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                  className="mt-1 bg-background border-border"
                  maxLength={16}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-sm text-muted-foreground">
                    Expiry (MM/YY)
                  </Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length >= 2) {
                        value = value.slice(0, 2) + "/" + value.slice(2, 4);
                      }
                      setCardExpiry(value);
                    }}
                    className="mt-1 bg-background border-border"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm text-muted-foreground">
                    CVV
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="mt-1 bg-background border-border"
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>
            </>
          )}

          {selectedMethod === "declining" && (
            <div>
              <Label htmlFor="studentId" className="text-sm text-muted-foreground">
                Student ID
              </Label>
              <Input
                id="studentId"
                placeholder="Enter your 11-digit Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="mt-1 bg-background border-border"
                maxLength={11}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Balance will be deducted from your student ID card.
              </p>
            </div>
          )}

          {selectedMethod === "cash" && (
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Cash on Delivery</p>
              <p className="mt-1">
                Please have the exact amount ready: <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </p>
              <p className="mt-2 text-xs">Our delivery partner will collect the payment upon arrival.</p>
            </div>
          )}
        </div>
      )}

      {/* Amount */}
      <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Amount</span>
          <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Button */}
      {selectedMethod && (
        <Button
          onClick={handlePayment}
          disabled={!selectedMethod || processingPayment || isProcessing}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
        >
          {processingPayment ? "Processing..." : `Pay with ${paymentMethods.find(m => m.id === selectedMethod)?.name}`}
        </Button>
      )}
    </div>
  );
}
