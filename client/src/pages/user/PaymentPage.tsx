import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Images } from "@/assets";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

const PaymentPage = () => {
  const [billing, setBilling] = useState("yearly");
  const [method, setMethod] = useState("card");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-JosephicSans">
      <div className="bg-gradient-to-br bg-main_gradient text-white px-3 py-20 sm:px-5 md:px-16 md:py-32 flex flex-col">
        <button className="flex items-center mb-8 text-white font-extrabold">
          <ChevronLeft className="w-5 h-5 mr-2 font-extrabold" /> Booked data
        </button>
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          <span className="text-gray-200 text-base md:text-xl">Total : </span>
          2,268.00
        </h1>
        <p className="mb-6 text-sm md:text-base">
          This price includes platform fees. By subscribing, you agree to our{" "}
          <a
            href="/terms"
            className="underline text-white hover:text-gray-200 font-semibold"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline text-white hover:text-gray-200 font-semibold"
          >
            Privacy Policy
          </a>
          .
        </p>

        <div className="bg-white text-black rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="font-bold">Standard pro</h2>
              <p className="text-sm text-gray-600">
                Up to 5 users in Figma. Great for small teams, agencies and
                startups.
              </p>
            </div>
            <span className="font-semibold">$189.00</span>
          </div>
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>$2,268.00</span>
          </div>
          <div className="flex justify-between text-black font-semibold text-lg">
            <span>Total due today</span>
            <span>$189.00</span>
          </div>
        </div>
      </div>

      <div className="px-3 py-8 sm:px-5 sm:py-10 md:px-11 md:py-32 max-w-7xl w-full mx-auto">
        <h2 className="text-xl font-semibold mb-6">Billing frequency</h2>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "border rounded-lg px-2 py-2 max-w-xl",
              billing === "monthly"
                ? "border-blue-600 text-blue-600"
                : "border-gray-300 text-gray-700"
            )}
          >
            <div className="text-lg font-medium">$239/month</div>
            <div className="text-sm">Pay monthly</div>
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "border rounded-lg px-2 py-2 w-full",
              billing === "yearly"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-gray-300 text-gray-700"
            )}
          >
            <div className="text-lg font-medium">$189/month</div>
            <div className="text-sm">
              Pay yearly <span className="text-green-600 ml-1">Save 20%</span>
            </div>
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Payment method</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {[
            {
              id: "card",
              label: "Credit or Debit card",
              icon: Images.cards,
            },
            {
              id: "googlepay",
              label: "Google pay",
              icon: Images.googlePay,
            },
            {
              id: "phonepe",
              label: "Phone Pe",
              icon: Images.phonePe,
            },
            {
              id: "paytm",
              label: "Paytm",
              icon: Images.paytm,
            },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMethod(opt.id)}
              className={cn(
                "border rounded-md px-4 py-3 flex items-center gap-2 w-full md:w-auto",
                method === opt.id
                  ? "border-deepPurple text-deepPurple"
                  : "border-gray-300 text-gray-700"
              )}
            >
              <img
                className="w-4 h-4 sm:w-9 sm:h-9 md:w-10 md:h-10"
                src={opt.icon}
                alt=""
              />
              <span className="text-xs md:text-base">{opt.label}</span>
            </button>
          ))}
        </div>

        {method === "card" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment information</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input className="border p-2 rounded" placeholder="Card number" />
              <div className="flex gap-4">
                <Input
                  className="border p-2 rounded w-1/2"
                  placeholder="Expiry date (MM/YY)"
                />
                <Input className="border p-2 rounded w-1/2" placeholder="CVC" />
              </div>
              <Input
                className="border p-2 rounded"
                placeholder="Name on card"
              />
              <Input
                className="border p-2 rounded"
                placeholder="Street address or PO box"
              />
              <Input
                className="border p-2 rounded"
                placeholder="Apt, suite, unit (optional)"
              />
              <div className="flex gap-4">
                <Input
                  className="border p-2 rounded w-1/2"
                  placeholder="City"
                />
                <Input
                  className="border p-2 rounded w-1/2"
                  placeholder="State"
                />
              </div>
            </div>
          </div>
        )}
        <div className="">
          <h2 className="text-xl font-semibold mb-4 mt-6">User information</h2>
          <div className="grid grid-cols-1 gap-4">
            <Input className="border p-2 rounded" placeholder="Name" />
            <div className="flex gap-4">
              <Input className="border p-2 rounded w-1/2" placeholder="Email" />
              <Input className="border p-2 rounded w-1/2" placeholder="Phone" />
            </div>
            <Input
              className="border p-2 rounded"
              placeholder="Street address or PO box"
            />
            <Input
              className="border p-2 rounded"
              placeholder="Apt, suite, unit (optional)"
            />
            <div className="flex gap-4">
              <Input className="border p-2 rounded w-1/2" placeholder="City" />
              <Input className="border p-2 rounded w-1/2" placeholder="State" />
            </div>
            <select className="border p-2 rounded">
              <option>Select country</option>
              <option>United States</option>
              <option>India</option>
              <option>Canada</option>
            </select>
          </div>
          <div className="">
            <Button className="mt-4 bg-deepPurple text-white py-5 font-semibold hover:bg-deepPurple/80 transition-all w-full">
              Pay & Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
