import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { FaParking, FaTree, FaUserCircle } from "react-icons/fa";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { LuShapes } from "react-icons/lu";
import { venueRequestProps } from "@/utils/Types/admin/assetManagement/venue";
import { Images } from "@/assets";
import { useDispatch } from "react-redux";
import { clearAssetDetails } from "@/redux/Slice/admin/assetManagementSlice";
import { useNavigate } from "react-router-dom";
import { MdBedtime } from "react-icons/md";

const VenueRequestView: React.FC<venueRequestProps> = ({ data }) => {
  const {
    venueDescription,
    venueImages,
    rent,
    shift,
    capacity,
    squareFeet,
    parkingFeatures,
    timeSlots,
    availableDates,
    features = [],
    details,
    terms,
    host,
  } = data;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeAccept = () => {
    dispatch(clearAssetDetails());
    navigate("/admin/users");
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-prompt">
      <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {venueImages?.length ? (
          venueImages?.map((img, i) => (
            <img
              key={i}
              src={`${import.meta.env.VITE_PROFILE_URL}${img}`}
              className="rounded-xl object-cover w-full h-40"
            />
          ))
        ) : (
          <img
            src={Images.imageNA}
            alt="Image not available"
            className="rounded-xl object-cover w-full h-40"
          />
        )}
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <MdLocationOn className="text-xl" /> Easy Location
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <FaParking className="text-xl" /> Parking
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <LuShapes className="text-xl" />
            {squareFeet} sq.ft
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <FaTree className="text-xl" /> Garden View
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <MdBedtime className="text-xl" /> {shift}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(availableDates) && availableDates.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Available Dates</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {availableDates.map((date, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      📅 <span>{date}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {Array.isArray(timeSlots) && timeSlots.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">Time Slots</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {timeSlots.map((slot, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      ⏰ <span>{slot}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-700">{venueDescription}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Venue Details</h3>
            <p className="text-sm text-gray-700">{details}</p>
          </CardContent>
        </Card>
        {terms && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-700">{terms}</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <FaUserCircle className="text-4xl text-gray-600" />
            <div>
              <h4 className="font-semibold">{host?.name}</h4>
              <p className="text-sm text-gray-600">{host?.email}</p>
              <p className="text-sm text-gray-600">{host?.phone}</p>
            </div>
          </CardContent>
        </Card>
        {features?.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-none text-sm text-gray-700 pl-0">
                {features.map((feat, i) => (
                  <li key={i}>✔ {feat}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {parkingFeatures?.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">Parkings</h3>
              <ul className="list-disc text-sm text-gray-700 pl-4">
                {parkingFeatures.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800 flex items-center gap-1">
              <MdAttachMoney className="text-2xl" /> ₹{rent}/Day
            </div>
            <div className="text-md font-medium text-gray-600 flex items-center gap-1">
              <FaPeopleGroup className="text-lg" /> {capacity}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={hanldeAccept}
          >
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

export default VenueRequestView;
