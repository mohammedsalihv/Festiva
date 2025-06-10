import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { FaParking, FaTree, FaUserCircle } from "react-icons/fa";
import { MdLocationOn, MdAttachMoney } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { GiChecklist } from "react-icons/gi";
import { catersRequestProps } from "@/utils/Types/admin/assetManagement/caters";


const CatersRequestView:React.FC<catersRequestProps> = ({data}) => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((_, idx) => (
            <img
              key={idx}
              src={`https://source.unsplash.com/featured/?building,${idx}`}
              alt="Asset View"
              className="rounded-xl object-cover w-full h-40"
            />
          ))}
        </div>
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
            <BsClockHistory className="text-xl" /> 880 sq.ft
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3">
            <FaTree className="text-xl" /> Garden view
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-700">
              Conveniently located in the heart of the city, Vista Convention
              Center offers state-of-the-art amenities with scenic views and
              top-notch services for all occasions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Terms & Conditions</h3>
            <p className="text-sm text-gray-700">
              Booking must be done at least 24 hours in advance. Smoking and
              pets are not allowed. Guests are responsible for damages caused.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2">Extra Features</h3>
            <p className="text-sm text-gray-700">
              High-speed WiFi, premium interior decor, advanced AV setup, and
              garden-facing conference rooms.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <FaUserCircle className="text-4xl text-gray-600" />
            <div>
              <h4 className="font-semibold">Benrick</h4>
              <p className="text-sm text-gray-600">benrick@gmail.com</p>
              <p className="text-sm text-gray-600">+91 90000 00000</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Air Conditioners</li>
              <li>✔ CCTV</li>
              <li>✔ Security Guards</li>
              <li>✔ Seating Equipments</li>
              <li>✔ Restroom Access</li>
              <li>✔ Internet WiFi</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-800 flex items-center gap-1">
              <MdAttachMoney className="text-2xl" /> $450/hr
            </div>
            <div className="text-md font-medium text-gray-600 flex items-center gap-1">
              <GiChecklist className="text-lg" /> 2000
            </div>
          </CardContent>
        </Card>

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

export default CatersRequestView;
