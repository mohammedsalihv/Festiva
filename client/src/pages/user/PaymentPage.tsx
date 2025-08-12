import { useState, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Images } from "@/assets";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import {
  validateUserInformation,
  validateCard,
  cardInformation,
  userInformation,
} from "@/utils/validations/user/bookings/payment";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IAsset } from "@/utils/Types/user/commonDetails";

const PaymentPage = () => {
  const [method, setMethod] = useState("card");

  const bookedService = useSelector(
    (state: RootState) => state.booking.currentBooking
  );
  console.log("-", bookedService);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const [cardForm, setCardForm] = useState<cardInformation>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOfCardHolder: "",
  });

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

  const [cardErrors, setCardErrors] = useState<
    Partial<Record<keyof cardInformation, string>>
  >({});
  const [userErrors, setUserErrors] = useState<
    Partial<Record<keyof userInformation, string>>
  >({});

  const handleSubmit = () => {
    const cardErrs = validateCard(cardForm);
    const userErrs = validateUserInformation(userForm);

    setCardErrors(cardErrs);
    setUserErrors(userErrs);

    if (
      Object.keys(cardErrs).length === 0 &&
      Object.keys(userErrs).length === 0
    ) {
      console.log("✅ Form valid! Proceed to payment gateway...");
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Calculate total amount
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
        pricePerUnit = service.about;
        break;
      default:
        pricePerUnit = "0";
    }

    const dateCount = bookedService.selectedDates?.length || 1;
    return Number(pricePerUnit || 0) * dateCount;
  };

  const totalAmount = calculateTotal();

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-JosephicSans">
      {/* Left Panel */}
      <div className="bg-gradient-to-br bg-main_gradient text-white px-3 py-20 sm:px-5 md:px-16 md:py-32 flex flex-col">
        <button className="flex items-center mb-8 text-white font-extrabold">
          <ChevronLeft className="w-5 h-5 mr-2 font-extrabold" /> Booked data
        </button>
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
            <span className="text-base font-bold">{totalAmount.toLocaleString()}.00</span>
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
        <h2 className="text-xl font-semibold mb-4">Payment method</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {[
            { id: "card", label: "Credit or Debit card", icon: Images.cards },
            { id: "googlepay", label: "Google pay", icon: Images.googlePay },
            { id: "phonepe", label: "Phone Pe", icon: Images.phonePe },
            { id: "paytm", label: "Paytm", icon: Images.paytm },
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
          <>
            <h2 className="text-xl font-semibold mb-4">Payment information</h2>
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={cardForm.cardNumber}
                onChange={(e) =>
                  setCardForm({ ...cardForm, cardNumber: e.target.value })
                }
                className={`border ${
                  cardErrors.cardNumber ? "border-red-600" : "border-gray-200"
                } p-2 rounded`}
                placeholder="Card number"
              />
              {cardErrors.cardNumber && (
                <p className="text-red-600 text-sm md:text-base">
                  {cardErrors.cardNumber}
                </p>
              )}

              <Input
                value={cardForm.nameOfCardHolder}
                onChange={(e) =>
                  setCardForm({ ...cardForm, nameOfCardHolder: e.target.value })
                }
                className={`border ${
                  cardErrors.nameOfCardHolder
                    ? "border-red-600"
                    : "border-gray-200"
                } p-2 rounded`}
                placeholder="Name on card"
              />
              {cardErrors.nameOfCardHolder && (
                <p className="text-red-600 text-sm md:text-base">
                  {cardErrors.nameOfCardHolder}
                </p>
              )}

              <div className="flex gap-4">
                <Input
                  value={cardForm.expiryDate}
                  onChange={(e) =>
                    setCardForm({ ...cardForm, expiryDate: e.target.value })
                  }
                  className={`border ${
                    cardErrors.expiryDate ? "border-red-600" : "border-gray-200"
                  } p-2 rounded w-1/2`}
                  placeholder="Expiry date (MM/YY)"
                />
                <Input
                  value={cardForm.cvc}
                  onChange={(e) =>
                    setCardForm({ ...cardForm, cvc: e.target.value })
                  }
                  className={`border ${
                    cardErrors.cvc ? "border-red-600" : "border-gray-200"
                  } p-2 rounded w-1/2`}
                  placeholder="CVC"
                />
              </div>
              {(cardErrors.expiryDate || cardErrors.cvc) && (
                <div className="flex gap-4">
                  {cardErrors.expiryDate && (
                    <p className="text-red-600 text-sm md:text-base w-1/2">
                      {cardErrors.expiryDate}
                    </p>
                  )}
                  {cardErrors.cvc && (
                    <p className="text-red-600 text-sm md:text-base w-1/2">
                      {cardErrors.cvc}
                    </p>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        <h2 className="text-xl font-semibold mb-4 mt-6">User information</h2>
        <div className="grid grid-cols-1 gap-4">
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
          className="mt-4 bg-deepPurple text-white py-5 font-semibold hover:bg-deepPurple/80 transition-all w-full"
        >
          Pay & Confirm
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
