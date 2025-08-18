import { useState, useMemo} from "react";
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
import { createPayment } from "@/api/user/base/paymentService";
import { startBooking } from "@/api/user/base/bookingService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();;
  const [loading, setLoading] = useState(false);

  const bookedService = useSelector(
    (state: RootState) => state.booking.currentBooking
  );

  const countryOptions = useMemo(() => countryList().getData(), []);

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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const calculateTotal = () => {
    if (!bookedService) return 0;
    const service = bookedService.serviceData as IAsset;
    let pricePerUnit: string | number | undefined = "0";
    switch (service.typeOfAsset) {
      case "venue":
      case "rentcar":
        pricePerUnit = service.rent;
        break;
      case "caters":
        pricePerUnit = service.totalAmount;
        break;
      case "studio":
        pricePerUnit = service.packages[0]?.payment;
        break;
      default:
        pricePerUnit = "0";
    }
    const dateCount = bookedService.selectedDates?.length || 1;
    return Number(pricePerUnit || 0) * dateCount;
  };

  const totalAmount = calculateTotal();

  const completeBooking = async (paymentId: string) => {
    const formData = new FormData();
    if (bookedService?.assetId) {
      formData.append("serviceId", bookedService.assetId);
    }
    formData.append("assetType", bookedService?.assetType || "");
    formData.append(
      "dates",
      JSON.stringify(bookedService?.selectedDates || [])
    );
    if (bookedService?.selectedTimeSlot)
      formData.append("timeSlot", bookedService.selectedTimeSlot);
    if (bookedService?.attendeesCount)
      formData.append(
        "attendeesCount",
        bookedService.attendeesCount.toString()
      );
    if (bookedService?.packageName)
      formData.append("packageName", bookedService.packageName);

    Object.entries(userForm).forEach(([key, value]) =>
      formData.append(key, value)
    );

    formData.append("paymentId", paymentId);
    formData.append("amountPaid", (totalAmount + 50).toString());

    await startBooking(formData);
    toast.success("The service has been booked!");
    setLoading(false);
    navigate("/success");
  };


  const handleSubmit = async () => {
  setLoading(true);
  const userErrs = validateUserInformation(userForm);
  setUserErrors(userErrs);

  if (Object.keys(userErrs).length > 0) {
    setLoading(false);
    return;
  }

  try {
    // 1. Create Razorpay order from backend
    const { orderId, amount, currency } = await createPayment({
      amount: (totalAmount + 50) * 100, // Razorpay takes paise
      currency: "INR",
    });

    // 2. Open Razorpay checkout
    const options: any = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "My Platform",
      description: "Service booking",
      order_id: orderId,
      handler: async (response: any) => {
        // 3. On success → verify payment on backend
        await completeBooking(response.razorpay_payment_id);
      },
      prefill: {
        name: userForm.name,
        email: userForm.email,
        contact: userForm.phone,
      },
      theme: { color: "#5A2D82" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    toast.error("Payment initiation failed");
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-JosephicSans">
      <div className="bg-gradient-to-br bg-main_gradient text-white px-3 py-20 sm:px-5 md:px-16 md:py-32 flex flex-col">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          <span className="text-gray-200 text-base md:text-xl">
            Total : {totalAmount}{" "}
          </span>
        </h1>

        <div className="bg-white text-black rounded-md p-4 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="w-full">
              <h2 className="font-bold text-lg mb-2">Service Details</h2>
              <div className="border w-full px-2 md:px-4 py-5 rounded-sm shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-full sm:w-32 h-24 bg-gray-100 rounded overflow-hidden">
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
                    <h3 className="text-xl">
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
                    <p className="text-gray-500 text-sm">
                      {bookedService?.serviceData &&
                      "squareFeet" in bookedService.serviceData &&
                      bookedService.serviceData.squareFeet
                        ? `${bookedService.serviceData.squareFeet} sq ft`
                        : ""}
                    </p>
                  </div>
                </div>

                <hr className="my-4" />
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm md:text-base text-gray-700">
                  <div>
                    <p className="font-bold text-gray-500">Date</p>
                    <p className="text-black">
                      {Array.isArray(bookedService?.selectedDates)
                        ? bookedService.selectedDates.map(formatDate).join(", ")
                        : formatDate(bookedService?.selectedDates || "")}
                    </p>
                  </div>
                  {bookedService?.selectedTimeSlot && (
                    <div>
                      <p className="font-bold text-gray-500">Time</p>
                      <p className="text-black">
                        {bookedService?.selectedTimeSlot}
                      </p>
                    </div>
                  )}
                  {bookedService?.attendeesCount && (
                    <div>
                      <p className="font-bold text-gray-500">Attendees</p>
                      <p className="text-black">
                        {bookedService?.attendeesCount} people
                      </p>
                    </div>
                  )}
                  {bookedService?.packageName && (
                    <div>
                      <p className="font-bold text-gray-500">Package</p>
                      <p className="text-black">{bookedService?.packageName}</p>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-gray-500">Service type</p>
                    <span className="bg-blue-600 text-white p-1 rounded-md">
                      {bookedService?.assetType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-3 pt-2">
            <span className="text-base">Subtotal</span>
            <span className="text-base font-bold">
              {totalAmount.toLocaleString()}.00
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 px-3 pb-1">
            <span className="text-base">Platform fee</span>
            <span className="text-base">50.00</span>
          </div>
          <div className="flex justify-between text-black font-semibold text-lg md:text-2xl px-3">
            <span>Total payable amount</span>
            <span>{(totalAmount + 50).toLocaleString()}/-</span>
          </div>
        </div>
        <p className=" text-sm md:text-base mt-4">
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
      </div>

      <div className="px-3 py-8 sm:px-5 sm:py-10 md:px-7 md:py-20 max-w-7xl w-full mx-auto">
      

        <h2 className="text-xl font-semibold mb-4 mt-6">User information</h2>
        <div className="grid grid-cols-1 gap-4 text-base">
          <Input
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            className={`border ${
              userErrors.name ? "border-red-600" : "border-gray-200"
            } p-2 rounded`}
            placeholder="Name"
          />
          {userErrors.name && (
            <p className="text-red-600 text-sm md:text-base">
              {userErrors.name}
            </p>
          )}

          <div className="flex gap-4">
            <Input
              value={userForm.email}
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
              className={`border ${
                userErrors.email ? "border-red-600" : "border-gray-200"
              } p-2 rounded w-1/2`}
              placeholder="Email"
            />
            <Input
              value={userForm.phone}
              onChange={(e) =>
                setUserForm({ ...userForm, phone: e.target.value })
              }
              className={`border ${
                userErrors.phone ? "border-red-600" : "border-gray-200"
              } p-2 rounded w-1/2`}
              placeholder="Phone"
            />
          </div>
          {(userErrors.email || userErrors.phone) && (
            <div className="flex gap-4">
              {userErrors.email && (
                <p className="text-red-600 text-sm md:text-base w-1/2">
                  {userErrors.email}
                </p>
              )}
              {userErrors.phone && (
                <p className="text-red-600 text-sm md:text-base w-1/2">
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
            className={`border ${
              userErrors.address ? "border-red-600" : "border-gray-200"
            } p-2 rounded`}
            placeholder="Street address or PO box"
          />
          {userErrors.address && (
            <p className="text-red-600 text-sm md:text-base">
              {userErrors.address}
            </p>
          )}

          <Input
            value={userForm.landmark}
            onChange={(e) =>
              setUserForm({ ...userForm, landmark: e.target.value })
            }
            className="border p-2 rounded"
            placeholder="Apt, suite, unit (optional)"
          />

          <div className="flex gap-4">
            <Input
              value={userForm.city}
              onChange={(e) =>
                setUserForm({ ...userForm, city: e.target.value })
              }
              className={`border ${
                userErrors.city ? "border-red-600" : "border-gray-200"
              } p-2 rounded w-1/2`}
              placeholder="City"
            />
            <Input
              value={userForm.state}
              onChange={(e) =>
                setUserForm({ ...userForm, state: e.target.value })
              }
              className={`border ${
                userErrors.state ? "border-red-600" : "border-gray-200"
              } p-2 rounded w-1/2`}
              placeholder="State"
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
            classNamePrefix="react-select"
            className={`w-full ${
              userErrors.country ? "border border-red-600 rounded" : ""
            }`}
          />
          {userErrors.country && (
            <p className="text-red-600 text-sm md:text-base">
              {userErrors.country}
            </p>
          )}
        </div>
     <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-deepPurple text-white py-6 font-semibold hover:bg-deepPurple/80 transition-all w-full"
        >
          {loading ? "Processing..." : "Pay & Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
