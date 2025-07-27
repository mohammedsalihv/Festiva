import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { TbPoint } from "react-icons/tb";
import { CiCalendarDate, CiCircleCheck } from "react-icons/ci";
import { MdOutlineWifi, MdOutlineSecurity } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import {
  FaMicrophoneAlt,
  FaChair,
  FaParking,
  FaHandsHelping,
  FaToilet,
  FaBriefcase,
} from "react-icons/fa";
import { GiGreenPower, GiClothes, GiLockedChest } from "react-icons/gi";
import { RiLiveLine, RiTeamLine } from "react-icons/ri";
import { BsBrush } from "react-icons/bs";
import { SiVirustotal } from "react-icons/si";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import { studioRequestProps } from "@/utils/Types/admin/assetManagement/IStudio";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  assetRequestApprove,
  assetRequestReject,
} from "@/api/admin/assetManagement.services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import CustomToastContainer from "@/reusable-components/Messages/ToastContainer";
import { clearSingleAssetDetails } from "@/redux/Slice/admin/assetManagementSlice";
import { useDispatch } from "react-redux";

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
    rejectedReason,
    typeOfAsset,
    host,
  } = data;

  const [confirmAction, setConfirmAction] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [showActions, setShowActions] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanldeAccept = async (id: string, assetType: string) => {
    await assetRequestApprove(id, assetType);
    toast.success("Asset approved successfully");
    navigate("/admin/assets");
  };

  const handleReject = async (
    id: string,
    assetType: string,
    reason: string
  ) => {
    await assetRequestReject(id, assetType, reason);
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
              <FaMicrophoneAlt className="text-lg" /> Audio Equipment
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <BsBrush className="text-lg" /> Makeup Room
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <GiClothes className="text-lg" /> Dressing Room
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <PiSpeakerSimpleHighFill className="text-lg" /> Speaker Setup
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <GiGreenPower className="text-lg" /> Power Backup
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <MdOutlineWifi className="text-lg" /> High-Speed Wi-Fi
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaChair className="text-lg" /> Props & Furniture
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaParking className="text-lg" /> Parking Facility
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaHandsHelping className="text-lg" /> On-Site Support
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <GiLockedChest className="text-lg" /> Equipment Storage
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaToilet className="text-lg" /> Restroom Access
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <FaBriefcase className="text-lg" /> Lounge Area
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <SiVirustotal className="text-lg" /> Sanitized Environment
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <RiLiveLine className="text-lg" /> Live Streaming Setup
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <RiTeamLine className="text-lg" /> Virtual Team Support
            </div>
            <div className="flex flex-col items-center bg-gray-100 rounded-lg p-3 shadow-md hover:shadow-xl border border-blue-300">
              <MdOutlineSecurity className="text-lg" /> Studio Security
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
              <p className="text-sm font-semibold text-gray-500 mb-1">
                Packages
              </p>
              {packages && packages.length > 0 ? (
                packages.map((pkg, i) => (
                  <div
                    key={pkg._id || i}
                    className="border p-3 rounded-md shadow-sm bg-gray-10"
                  >
                    <p className="text-sm font-semibold text-black mb-1">
                      {pkg.packageName}
                    </p>

                    <div className="text-xsspace-y-1">
                      <p>
                        <span className="font-medium text-gray-500">
                          Payment:
                        </span>{" "}
                        ₹{pkg.payment.trim()}
                      </p>
                      <p>
                        <span className="font-medium text-gray-500">
                          Manpower:
                        </span>{" "}
                        {pkg.manPower}
                      </p>
                      <p>
                        <span className="font-medium text-gray-500">
                          Delivery Time:
                        </span>{" "}
                        {pkg.deliveryTime}
                      </p>
                      <p>
                        <span className="font-medium text-gray-500">
                          Validity:
                        </span>{" "}
                        {pkg.validity}
                      </p>

                      <div>
                        <p className="font-medium text-gray-500">Includes:</p>
                        {pkg.packageIncludes?.length > 0 ? (
                          <ul className="list-disc list-inside ml-2">
                            {pkg.packageIncludes.map((inc, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <TbPoint className="text-blue-700" />
                                {inc}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ml-2">None</p>
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-500">Equipments:</p>
                        {pkg.equipments?.length > 0 ? (
                          <ul className="list-disc list-inside ml-2">
                            {pkg.equipments.map((equip, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <TbPoint className="text-blue-700" />
                                {equip}
                              </li>
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
                          <TbPoint className="w-4 h-4 mt-1 flex-shrink-0 text-blue-700" />
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
              <div className="w-full">
                <div className="flex justify-between items-center gap-2">
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
                {status === "rejected" && rejectedReason?.trim() && (
                  <p className="mt-2">
                    <span className="text-sm font-semibold text-gray-500 mb-2">
                      Reason:{" "}
                    </span>
                    <span className="text-xs text-red-500">
                      {rejectedReason}
                    </span>
                  </p>
                )}
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
                : "Are you sure you want to reject this asset? Please provide a reason."
            }
            confirmText={
              actionType === "approve" ? "Yes, Approve" : "Yes, Reject"
            }
            cancelText="Cancel"
            onConfirm={async () => {
              if (!typeOfAsset) {
                toast.error("Asset type is required");
                return;
              }

              if (actionType === "approve") {
                await hanldeAccept(_id, typeOfAsset);
              } else if (actionType === "reject") {
                if (!rejectReason.trim()) {
                  toast.error("Please provide a rejection reason");
                  setReasonError(true);
                  return;
                }
                await handleReject(_id, typeOfAsset, rejectReason);
              }

              setConfirmAction(false);
              setActionType(null);
              setRejectReason("");
            }}
            onCancel={() => {
              setConfirmAction(false);
              setActionType(null);
              setRejectReason("");
            }}
          >
            {actionType === "reject" && (
              <textarea
                value={rejectReason}
                onChange={(e) => {
                  setRejectReason(e.target.value);
                  if (e.target.value.trim()) {
                    setReasonError(false);
                  }
                }}
                placeholder="Enter reason for rejection"
                className={`w-full mt-4 border rounded-md p-2 text-sm ${
                  reasonError ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
              />
            )}
          </ConfirmDialog>

          <CustomToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RentCarRequestView;
