"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, Lock, Wifi } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MemberPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ cardNumber, expiryDate, cvv, name });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Card Preview */}
        <div className="perspective-1000 relative h-56 w-full">
          <div
            className={cn(
              "absolute w-full h-full transition-transform duration-700 transform-style-3d",
              isCardFlipped ? "[transform:rotateY(180deg)]" : ""
            )}
          >
            {/* Front of card */}
            <div className="absolute w-full h-full backface-hidden">
              <Card className="w-full h-full p-6 bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl">
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                      <Wifi className="w-6 h-6 rotate-90" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-2xl tracking-wider font-mono">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs opacity-75">Card Holder</div>
                        <div className="font-medium tracking-wide">
                          {name || "YOUR NAME"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs opacity-75">Expires</div>
                        <div className="font-medium">
                          {expiryDate || "MM/YY"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Back of card */}
            <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)]">
              <Card className="w-full h-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl">
                <div className="w-full h-12 bg-black/30 mt-6" />
                <div className="px-6 mt-6">
                  <div className="bg-white/30 h-12 flex items-center justify-end px-4">
                    <div className="font-mono">{cvv || "•••"}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6 space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Payment Details
            </h1>
            <p className="text-muted-foreground text-center">
              Enter your debit card information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">Cardholder Name</label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="card-number">Card Number</label>
                <div className="relative">
                  <Input
                    id="card-number"
                    placeholder="4111 1111 1111 1111"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                    className="h-12 pl-12"
                  />
                  <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="expiry">Expiry Date</label>
                  <div className="relative">
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(formatExpiryDate(e.target.value))
                      }
                      maxLength={5}
                      className="h-12 pl-12"
                    />
                    <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="cvv">CVV</label>
                  <div className="relative">
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      maxLength={3}
                      onFocus={() => setIsCardFlipped(true)}
                      onBlur={() => setIsCardFlipped(false)}
                      className="h-12 pl-12"
                    />
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg">
              Save Card Details
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default MemberPage;
