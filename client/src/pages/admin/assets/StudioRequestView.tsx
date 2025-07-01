import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { GiDoubleStreetLights } from "react-icons/gi";
import { IoVideocamOff } from "react-icons/io5";
import { CiCalendarDate, CiCircleCheck } from "react-icons/ci";
import { LuDot } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { FaBirthdayCake } from "react-icons/fa";
import { GiDeliveryDrone } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdMonochromePhotos } from "react-icons/md";
import { studioRequestProps } from "@/utils/Types/admin/assetManagement/IStudio";
import {
  assetRequestApprove,
  assetRequestReject,
} from "@/api/admin/assetManagement.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";

const RentCarRequestView: React.FC<studioRequestProps> = ({ data }) => {
  const {
    _id,
    studioName,
    timeSlots,
    availableDates,
    serviceFeatures,
    packages,
    terms,
    description,
    about,
    Images,
    status,
    typeOfAsset,
    host,
  } = data;

  const [confirmAction, setConfirmAction] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const navigate = useNavigate();

  const hanldeAccept = async (id: string, assetType: string) => {
    await assetRequestApprove(id, assetType);
    toast.success("Asset approved successfully");
    navigate("/admin/assets");
  };

  const hanldeReject = async (id: string, assetType: string) => {
    await assetRequestReject(id, assetType);
    toast.success("Asset rejected successfully");
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
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <MdMonochromePhotos className="text-lg" />
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <GiDeliveryDrone className="text-lg" />
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <FaBirthdayCake className="text-lg" /> Multipurpose event
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <GiDoubleStreetLights className="text-lg" /> Lights & Cameras
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <IoVideocamOff className="text-lg" /> Video & photography
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl">
              <FaPhotoFilm className="text-lg" /> Studio
            </div>
          </div>
          <Card>
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">
                  Business Name
                </p>
                <p className="text-xs text-black">{studioName}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid grid-cols-1 gap-4">
              {packages && packages.length > 0 ? (
                packages.map((pkg, i) => (
                  <div
                    key={pkg._id || i}
                    className="border p-3 rounded-md shadow-sm bg-gray-50"
                  >
                    <p className="text-sm font-semibold text-black mb-1">
                      {pkg.packageName}
                    </p>

                    <div className="text-xs text-gray-700 space-y-1">
                      <p>
                        <span className="font-medium">Payment:</span> ₹
                        {pkg.payment.trim()}
                      </p>
                      <p>
                        <span className="font-medium">Manpower:</span>{" "}
                        {pkg.manPower}
                      </p>
                      <p>
                        <span className="font-medium">Delivery Time:</span>{" "}
                        {pkg.deliveryTime}
                      </p>
                      <p>
                        <span className="font-medium">Validity:</span>{" "}
                        {pkg.validity}
                      </p>

                      <div>
                        <p className="font-medium">Includes:</p>
                        {pkg.packageIncludes?.length > 0 ? (
                          <ul className="list-disc list-inside ml-2">
                            {pkg.packageIncludes.map((inc, idx) => (
                              <li key={idx}>{inc}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ml-2">None</p>
                        )}
                      </div>

                      <div>
                        <p className="font-medium">Equipments:</p>
                        {pkg.equipments?.length > 0 ? (
                          <ul className="list-disc list-inside ml-2">
                            {pkg.equipments.map((equip, idx) => (
                              <li key={idx}>{equip}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ml-2">None</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No packages available</p>
              )}
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
                        <LuDot /> <span>{date}</span>
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
                        <LuDot /> <span>{slot}</span>
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
                Description
              </h3>
              <p className="text-xs text-black">{description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                Description
              </h3>
              <p className="text-xs text-black">{terms}</p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={host?.profilePic}
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
            <CardContent className="p-4">
              {serviceFeatures ? (
                <>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    Features
                  </h3>
                  {serviceFeatures.length > 0 ? (
                    <ul className="text-xs text-black space-y-1">
                      {serviceFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CiWarning className="w-4 h-4 mt-1 flex-shrink-0 text-yellow-600" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-black">None</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-black">No features available</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div className="text-xl text-gray-800 flex items-center gap-1">
                <FaRupeeSign className="text-sm" />
                <span className="font-bold"></span>
                <span className="text-xs font-semibold text-gray-500">
                  /Day
                </span>
              </div>
            </CardContent>
          </Card>
          {status === "pending" ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full ">
              <Button
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setActionType("approve");
                  setConfirmAction(true);
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
                }}
              >
                <IoIosCloseCircleOutline className="w-6 h-6" />
                <span>Reject</span>
              </Button>
            </div>
          ) : (
            <h1 className="text-sm text-red-600 font-medium bg-red-300 px-3 py-1 rounded">
              {status}
            </h1>
          )}
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

export default RentCarRequestView;
