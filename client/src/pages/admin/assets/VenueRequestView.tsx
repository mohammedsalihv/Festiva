import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { FaParking, FaTree, FaRupeeSign } from "react-icons/fa";
import { MdLocationOn, MdCelebration, MdBedtime } from "react-icons/md";
import { LuShapes, LuArmchair } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { CiCalendarDate, CiCircleCheck } from "react-icons/ci";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { venueRequestProps } from "@/utils/Types/admin/assetManagement/IVenue";
import { useDispatch } from "react-redux";
import { clearSingleAssetDetails } from "@/redux/Slice/admin/assetManagementSlice";
import { useNavigate } from "react-router-dom";
import {
  assetRequestApprove,
  assetRequestReject,
} from "@/api/admin/assetManagement.services";
import { toast } from "react-toastify";
import { TbPoint } from "react-icons/tb";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import { useState } from "react";

const VenueRequestView: React.FC<venueRequestProps> = ({ data }) => {
  const {
    _id,
    venueName,
    about,
    Images,
    rent,
    shift,
    capacity,
    squareFeet,
    parkingFeatures,
    timeSlots,
    availableDates,
    features = [],
    description,
    typeOfAsset,
    status,
    terms,
    host,
  } = data;

  const [confirmAction, setConfirmAction] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [showActions, setShowActions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeAccept = async (id: string, assetType: string) => {
    await assetRequestApprove(id, assetType);
    toast.success("Asset approved successfully");
    dispatch(clearSingleAssetDetails());
    navigate("/admin/assets");
  };

  const hanldeReject = async (id: string, assetType: string) => {
    await assetRequestReject(id, assetType);
    toast.success("Asset rejected successfully");
    dispatch(clearSingleAssetDetails());
    navigate("/admin/assets");
  };

  return (
    <div className="text-xs md:text-sm">
      <div className="p-4 md:p-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 font-prompt bg-main_white rounded-md w-full h-full">
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {Images?.length ? (
            Images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="rounded-md object-cover w-full h-32 sm:h-40 md:h-44"
              />
            ))
          ) : (
            <img
              src="/client/src/assets/images/default_profile.png"
              alt="Image not available"
              className="rounded-xl object-cover w-full h-40"
            />
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs md:text-sm">
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <MdLocationOn className="text-lg" /> Easy Location
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <MdCelebration className="text-lg" /> Celebration
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <LuShapes className="text-lg" /> {squareFeet} sq.ft
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaTree className="text-lg" /> Garden View
            </div>
          </div>
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  Venue Name
                </p>
                <p className="text-xs text-black">{venueName}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1">
                  Shift <MdBedtime />
                </p>
                <p className="text-xs text-black">{shift}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1">
                  Capacity <LuArmchair />
                </p>
                <p className="text-xs text-black">{capacity} people</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1 flex items-center gap-1">
                  Parking <FaParking />
                </p>
                {parkingFeatures?.length > 0 ? (
                  parkingFeatures.map((feat, i) => (
                    <p
                      key={i}
                      className="text-xs text-black flex items-center gap-1"
                    >
                      <TbPoint className="text-blue-700" />
                      {feat}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-black">None</p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.isArray(availableDates) && availableDates.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                    Available Dates <CiCalendarDate />
                  </h3>
                  <ul className="text-xs text-black space-y-1">
                    {availableDates?.map((date, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 flex-wrap"
                      >
                        <TbPoint className="text-blue-700" />{" "}
                        <span>{date}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {Array.isArray(timeSlots) && timeSlots.length > 0 && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                    Time Slots <IoMdTime />
                  </h3>
                  <ul className="text-xs text-black space-y-1">
                    {timeSlots.map((slot, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 flex-wrap"
                      >
                        <TbPoint className="text-blue-700" />{" "}
                        <span>{slot}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                About
              </h3>
              <p className="text-xs text-black">{about}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                Venue Details
              </h3>
              <p className="text-xs text-black">{description}</p>
            </CardContent>
          </Card>

          {terms && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Terms & Conditions
                </h3>
                <p className="text-xs text-black">{terms}</p>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="space-y-4">
          {features?.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Features
                </h3>
                <ul className="text-xs text-black space-y-1">
                  {features.map((feat, i) => (
                    <li key={i}>✔ {feat}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <Card>
            <h3 className="text-sm font-semibold text-gray-500 mb-2 px-3 py-2">
              Host
            </h3>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={host.profilePic}
                className="w-14 h-14 rounded-full border border-solid"
              />
              <div>
                <h4 className="text-base font-semibold">{host?.name}</h4>
                <p className="text-sm text-gray-600">{host?.email}</p>
                <p className="text-sm text-gray-600">{host?.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="text-xl text-gray-800 flex items-center gap-1">
                <FaRupeeSign className="text-sm" />
                <span className="font-bold">{rent}</span>
                <span className="text-xs font-semibold text-gray-500">
                  /Day
                </span>
              </div>
            </CardContent>
          </Card>
          <div className="w-full">
            {status === "pending" || showActions ? (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setActionType("approve");
                    setConfirmAction(true);
                    setShowActions(false);
                  }}
                >
                  <CiCircleCheck className="w-6 h-6" />
                  <span>Approve</span>
                </Button>

                <Button
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    setActionType("reject");
                    setConfirmAction(true);
                    setShowActions(false);
                  }}
                >
                  <IoIosCloseCircleOutline className="w-6 h-6" />
                  <span>Reject</span>
                </Button>
              </div>
            ) : (
              <div className="w-full flex justify-between items-center gap-2">
                <div
                  className={`flex-1 text-xs px-4 py-2 rounded text-white font-semibold text-center ${
                    status === "approved"
                      ? "bg-blue-500"
                      : status === "rejected"
                      ? "bg-red-500"
                      : "bg-gray-400"
                  }`}
                >
                  {status
                    ? status.charAt(0).toUpperCase() + status.slice(1)
                    : ""}
                </div>

                <div className="flex-shrink-0">
                  <Button
                    variant="outline"
                    onClick={() => setShowActions(true)}
                    className="flex items-center justify-center gap-2 text-sm bg-black text-white hover:bg-slate-800"
                  >
                    Re-call <HiOutlineRefresh className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <ConfirmDialog
            isOpen={confirmAction}
            title={
              actionType === "approve"
                ? "Confirm Approval"
                : "Confirm Rejection"
            }
            description={
              actionType === "approve"
                ? "Are you sure you want to approve this asset?"
                : "Are you sure you want to reject this asset?"
            }
            confirmText={
              actionType === "approve" ? "Yes, Approve" : "Yes, Reject"
            }
            cancelText="Cancel"
            onConfirm={async () => {
              if (!typeOfAsset) {
                toast.success("asset type required");
                return;
              }
              if (actionType === "approve") {
                await hanldeAccept(_id, typeOfAsset);
              } else if (actionType === "reject") {
                await hanldeReject(_id, typeOfAsset);
              }
              setConfirmAction(false);
              setActionType(null);
            }}
            onCancel={() => {
              setConfirmAction(false);
              setActionType(null);
            }}
          />

          <CustomToastContainer />
        </div>
      </div>
    </div>
  );
};

export default VenueRequestView;
