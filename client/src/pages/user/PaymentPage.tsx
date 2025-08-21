import { useState, useMemo } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  validateUserInformation,
  userInformation,
} from "@/utils/validations/user/bookings/payment";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IAsset } from "@/utils/Types/user/commonDetails";
import { createPayment, paymentUpdate } from "@/api/user/base/paymentService";
import { startBooking } from "@/api/user/base/bookingService";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { paymentPayload } from "@/utils/Types/base/payment";
import { BookingConfirmation } from "@/reusable-components/user/Landing/BookingConfirm";
import { USER_ROUTE } from "@/utils/constants/routes/user.routes";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const bookedService = useSelector(
    (state: RootState) => state.booking.currentBooking
  );
  const user = useSelector((state: RootState) => state.user.userInfo);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const [paymentResponse, setPaymentResponse] = useState<any | null>(null);

  const [userForm, setUserForm] = useState<userInformation>({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
  });
  const [userErrors, setUserErrors] = useState<
    Partial<Record<keyof userInformation, string>>
  >({});

  if (!bookedService) {
    return <Navigate to={USER_ROUTE.userRedirectLinks.toUserHome} replace />;
  }

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const calculateTotal = () => {
    if (!bookedService) return { breakdown: [], total: 0 };
    const service = bookedService.serviceData as IAsset;
    let pricePerUnit = 0;
    switch (service.typeOfAsset) {
      case "venue":
      case "rentcar":
        pricePerUnit = Number(service.rent || 0);
        break;
      case "caters":
        pricePerUnit = Number(service.totalAmount || 0);
        break;
      case "studio":
        pricePerUnit = Number(service.packages[0]?.payment || 0);
        break;
    }

    const dateCount = bookedService.selectedDates?.length || 1;

    const breakdown: { day: number; price: number; discountNote?: string }[] =
      [];
    let total = 0;

    for (let i = 1; i <= dateCount; i++) {
      let dayPrice = 0;
      let discountNote = "";

      if (i === 1) {
        dayPrice = pricePerUnit;
      } else if (i === 2) {
        dayPrice = pricePerUnit * 0.8;
        discountNote = "20% off";
      } else {
        dayPrice = pricePerUnit * 0.5;
        discountNote = "50% off";
      }

      breakdown.push({ day: i, price: dayPrice, discountNote });
      total += dayPrice;
    }

    return { breakdown, total };
  };
  const { breakdown, total } = calculateTotal();
  const platformFee = 50;
  const totalPayable = total + platformFee;

  const completeBooking = async (transactionId: string, paymentId: string) => {
    if (!bookedService) {
      toast.error("Booking data missing!");
      setLoading(false);
      return;
    }

    const bookingPayload = {
      assetId: bookedService.assetId,
      assetType: bookedService.assetType,
      selectedDates: bookedService.selectedDates,
      selectedTimeSlot: bookedService.selectedTimeSlot,
      attendeesCount: bookedService.attendeesCount,
      packageName: bookedService.packageName,
      serviceData: bookedService.serviceData,
      transactionId: transactionId,
      paymentId: paymentId,
      total: totalPayable,
      userId: user?.id,
    };
    try {
      await startBooking(bookingPayload);
      toast.success("The service has been booked!");
      setShowConfirmation(true);
    } catch (err) {
      toast.error("Booking failed");
      console.error(err);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const userErrs = validateUserInformation(userForm);
    setUserErrors(userErrs);
    if (Object.keys(userErrs).length > 0) {
      setLoading(false);
      return;
    }

    let paymentId: string | null = null;
    try {
      const paymentData: paymentPayload = {
        payerId: user?.id ?? "",
        assetId: bookedService?.assetId ?? "",
        platformFee,
        amount: totalPayable,
        currency: "INR",
      };

      const response = await createPayment(paymentData);
      const orderId = response?.payment?.transactionId;
      paymentId = response?.payment?._id;

      if (!orderId || !paymentId) {
        toast.error("Failed to create Razorpay order");
        setLoading(false);
        return;
      }

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: response.payment.total * 100,
        currency: "INR",
        name: "Festiva",
        description: "Service booking",
        order_id: orderId,
        handler: async () => {
          const updated = await paymentUpdate("success", paymentId!);
          setPaymentResponse(updated.payment);
          await completeBooking(orderId, paymentId!);
        },
        prefill: {
          name: userForm.name,
          email: userForm.email,
          contact: userForm.phone,
        },
        theme: { color: "#5A2D82" },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", async () => {
        if (paymentId) await paymentUpdate("failed", paymentId);
      });

      rzp.open();
    } catch (err) {
      if (paymentId) await paymentUpdate("failed", paymentId);
      toast.error("Payment initiation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation && paymentResponse) {
    return (
      <BookingConfirmation
        amount={paymentResponse.total}
        currency="INR"
        date={paymentResponse.createdAt}
        transactionId={paymentResponse.transactionId}
        status={paymentResponse.status}
        brandName="Festiva"
        onViewTrip={() => navigate("/home")}
      />
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-JosephicSans">
      <div className="bg-main_gradient text-white px-3 sm:px-6 md:px-16 md:py-20 flex flex-col">
        <div className="p-4 space-y-8 mt-3">
          <div>
            <h2 className="font-bold text-2xl mb-4">Service Details</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-64 md:w-96 md:h-64 h-44 rounded-md overflow-hidden shadow-md">
                <img
                  src={
                    bookedService?.serviceData?.Images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt="Selected Service"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  {bookedService?.serviceData &&
                    ("venueName" in bookedService.serviceData
                      ? bookedService.serviceData.venueName
                      : "studioName" in bookedService.serviceData
                      ? bookedService.serviceData.studioName
                      : "carName" in bookedService.serviceData
                      ? bookedService.serviceData.carName
                      : "catersName" in bookedService.serviceData
                      ? bookedService.serviceData.catersName
                      : "Service")}
                </h3>
                {bookedService?.assetType === "venue" &&
                  "squareFeet" in bookedService.serviceData && (
                    <p className="text-gray-300 text-sm">
                      {bookedService.serviceData.squareFeet} sq ft
                    </p>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm md:text-base text-gray-300">Date</p>
                <p className="font-medium">
                  {Array.isArray(bookedService?.selectedDates)
                    ? bookedService.selectedDates.map(formatDate).join(", ")
                    : formatDate(bookedService?.selectedDates || "")}
                </p>
              </div>

              {bookedService?.selectedTimeSlot && (
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm md:text-base text-gray-300">Time</p>
                  <p className="font-medium">
                    {bookedService.selectedTimeSlot}
                  </p>
                </div>
              )}

              {bookedService?.attendeesCount && (
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm md:text-base text-gray-300">
                    Attendees
                  </p>
                  <p className="font-medium">
                    {bookedService.attendeesCount} people
                  </p>
                </div>
              )}

              {bookedService?.packageName && (
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm md:text-base text-gray-300">Package</p>
                  <p className="font-medium">{bookedService.packageName}</p>
                </div>
              )}

              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm md:text-base text-gray-300">
                  Service type
                </p>
                <p className="font-bold text-blue-400">
                  {bookedService?.assetType
                    ? bookedService.assetType.charAt(0).toUpperCase() +
                      bookedService.assetType.slice(1)
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-3">Price Breakdown</h2>
            <ul className="divide-y divide-gray-600">
              {breakdown.map((day, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span>
                    Day {day.day}{" "}
                    {day.discountNote && (
                      <span className="text-green-400 font-bold">
                        ({day.discountNote})
                      </span>
                    )}
                  </span>
                  <span>₹{day.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm md:text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-lg">
                ₹{total.toLocaleString()}.00
              </span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee</span>
              <span className="text-base">₹50.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-600">
              <span>Total payable</span>
              <span className="text-2xl">
                ₹{totalPayable.toLocaleString()}/-
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm md:text-base p-4 text-gray-300 text-center">
          This price includes platform fees. By subscribing, you agree to our{" "}
          <a
            href="/terms"
            className="underline text-blue-400 hover:text-blue-300 font-semibold"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline text-blue-400 hover:text-blue-300 font-semibold"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <div className="px-3 sm:px-5 sm:py-10 md:px-12 md:py-20 mt-4 max-w-3xl w-full mx-auto">
        <h2 className="text-lg md:text-2xl font-bold mb-6 text-deepPurple">
          User Information
        </h2>

        <div className="grid grid-cols-1 gap-5 text-base">
          <Input
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            placeholder="Name"
            className={`px-3 py-2 rounded border focus:outline-none focus:ring-2 
        ${
          userErrors.name
            ? "border-red-600 focus:ring-red-400"
            : "border-gray-300 focus:ring-deepPurple"
        }`}
          />
          {userErrors.name && (
            <p className="text-red-600 text-sm">{userErrors.name}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              placeholder="Email"
              className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 
          ${
            userErrors.email
              ? "border-red-600 focus:ring-red-400"
              : "border-gray-300 focus:ring-deepPurple"
          }`}
            />
            <Input
              value={userForm.phone}
              onChange={(e) =>
                setUserForm({ ...userForm, phone: e.target.value })
              }
              placeholder="Phone"
              className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 
          ${
            userErrors.phone
              ? "border-red-600 focus:ring-red-400"
              : "border-gray-300 focus:ring-deepPurple"
          }`}
            />
          </div>
          {(userErrors.email || userErrors.phone) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {userErrors.email && (
                <p className="text-red-600 text-sm flex-1">
                  {userErrors.email}
                </p>
              )}
              {userErrors.phone && (
                <p className="text-red-600 text-sm flex-1">
                  {userErrors.phone}
                </p>
              )}
            </div>
          )}
          <Input
            value={userForm.address}
            onChange={(e) =>
              setUserForm({ ...userForm, address: e.target.value })
            }
            placeholder="Street address or PO box"
            className={`px-3 py-2 rounded border focus:outline-none focus:ring-2 
        ${
          userErrors.address
            ? "border-red-600 focus:ring-red-400"
            : "border-gray-300 focus:ring-deepPurple"
        }`}
          />
          {userErrors.address && (
            <p className="text-red-600 text-sm">{userErrors.address}</p>
          )}
          <Input
            value={userForm.landmark}
            onChange={(e) =>
              setUserForm({ ...userForm, landmark: e.target.value })
            }
            placeholder="Apt, suite, unit (optional)"
            className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-deepPurple"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              value={userForm.city}
              onChange={(e) =>
                setUserForm({ ...userForm, city: e.target.value })
              }
              placeholder="City"
              className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 
          ${
            userErrors.city
              ? "border-red-600 focus:ring-red-400"
              : "border-gray-300 focus:ring-deepPurple"
          }`}
            />
            <Input
              value={userForm.state}
              onChange={(e) =>
                setUserForm({ ...userForm, state: e.target.value })
              }
              placeholder="State"
              className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 
          ${
            userErrors.state
              ? "border-red-600 focus:ring-red-400"
              : "border-gray-300 focus:ring-deepPurple"
          }`}
            />
          </div>
          <Select
            options={countryOptions}
            value={
              countryOptions.find((c) => c.label === userForm.country) || null
            }
            onChange={(selected) =>
              setUserForm({ ...userForm, country: selected?.label || "" })
            }
            placeholder="Select country"
            className="w-full"
            classNamePrefix="react-select"
          />
          {userErrors.country && (
            <p className="text-red-600 text-sm">{userErrors.country}</p>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 bg-deepPurple text-white py-5 font-semibold hover:bg-deepPurple/90 transition-all w-full"
        >
          {loading ? "Processing..." : "Pay & Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
