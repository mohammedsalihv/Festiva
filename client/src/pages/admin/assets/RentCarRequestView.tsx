import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { FaParking, FaTree, FaUserCircle } from "react-icons/fa";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { GiChecklist } from "react-icons/gi";
import { rentCarRequestProps } from "@/utils/Types/admin/assetManagement/rentCar";

const RentCarRequestView: React.FC<rentCarRequestProps> = ({ data }) => {
  const {
    businessName,
    carName,
    rent,
    make,
    model,
    year,
    plate,
    color,
    fuel,
    transmission,
    seats,
    deposite,
    features,
    inclusion,
    terms,
    carImages,
    host,
    location,
  } = data;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Images */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {carImages?.length ? (
            carImages.map((img, idx) => (
              <img
                key={idx}
                src={`/${img}`}
                alt={`Car image ${idx}`}
                className="rounded-xl object-cover w-full h-40"
              />
            ))
          ) : (
            <div className="text-center text-gray-500 col-span-4">No car images available.</div>
          )}
        </div>
      </div>

      {/* Left Info Section */}
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <MdLocationOn className="text-xl" /> {location?.address || "Location"}
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <FaParking className="text-xl" /> Parking Available
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <BsClockHistory className="text-xl" /> {year || "N/A"} Model
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <FaTree className="text-xl" /> {color || "Color"}
          </div>
        </div>
        {inclusion && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-sm text-gray-700">{inclusion}</p>
            </CardContent>
          </Card>
        )}
        {terms && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-700">{terms}</p>
            </CardContent>
          </Card>
        )}

        {/* Features */}
        {features?.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Extra Features</h3>
              <ul className="list-disc text-sm text-gray-700 pl-4">
                {features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Host + Rent Section */}
      <div className="space-y-4">
        {/* Host Info */}
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <FaUserCircle className="text-4xl text-gray-600" />
            <div>
              <h4 className="font-semibold">{host?.name || "Host Name"}</h4>
              <p className="text-sm text-gray-600">{host?.email}</p>
              <p className="text-sm text-gray-600">{host?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Capacity */}
        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800 flex items-center gap-1">
              <MdAttachMoney className="text-2xl" /> ₹{rent || "0"}/hr
            </div>
            <div className="text-md font-medium text-gray-600 flex items-center gap-1">
              <GiChecklist className="text-lg" /> {seats || "0"} Seats
            </div>
          </CardContent>
        </Card>

        {/* Approve/Reject Buttons */}
        <div className="flex gap-2">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
            Approve
          </Button>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentCarRequestView;
