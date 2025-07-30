import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { MdOutlineLocationOn, MdOutlineRefresh } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  assetDelete,
  assetReApply,
  assetUnavailable,
  fetchAssetDetails,
} from "@/api/host/hostAccountService";
import { IVenue } from "@/utils/Types/host/services/venueTypes";
import { ICaters } from "@/utils/Types/host/services/catersTypes";
import { IRentCar } from "@/utils/Types/host/services/rentcarTypes";
import { IStudio } from "@/utils/Types/host/services/studio/studioTypes";
import { toast } from "react-toastify";
import ConfirmDialog from "@/reusable-components/user/Landing/ConfirmDialog";
import { useNavigate } from "react-router-dom";
type Asset = IVenue | IStudio | IRentCar | ICaters;

export const AssetDetails = () => {
  const [asset, setAsset] = useState<Asset>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [selectedAssetType, setSelectedAssetType] = useState<string | null>(
    null
  );
  const [confirmType, setConfirmType] = useState<
    "reapply" | "delete" | "unavailable" | null
  >(null);
  const navigate = useNavigate();

  const { id, type } = useParams();

  const fetchDetails = async () => {
    try {
      if (id && type) {
        const response = await fetchAssetDetails(id, type);
        setAsset(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch asset details", error);
      toast.error("Asset details not found");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id, type]);

  if (!asset?.typeOfAsset) {
    return (
      <p className="text-red-500 text-center p-16">
        Invalid or missing asset type.
      </p>
    );
  }

  const isVenue = (asset: Asset): asset is IVenue =>
    asset?.typeOfAsset === "venue";
  const isStudio = (asset: Asset): asset is IStudio =>
    asset?.typeOfAsset === "studio";
  const isCar = (asset: Asset): asset is IRentCar =>
    asset?.typeOfAsset === "rentcar";
  const isCaters = (asset: Asset): asset is ICaters =>
    asset?.typeOfAsset === "caters";

  const assetType = asset?.typeOfAsset;
  const selectedAsset = asset;

  const getTitle = () => {
    if (!selectedAsset) return "Asset";

    if (isVenue(selectedAsset)) return selectedAsset.venueName || "Venue";
    if (isStudio(selectedAsset)) return selectedAsset.studioName || "Studio";
    if (isCar(selectedAsset)) return selectedAsset.carName || "Car";
    if (isCaters(selectedAsset))
      return selectedAsset.catersName || "Catering Service";

    return "Asset";
  };

  const getPrice = () => {
    if (!selectedAsset) return "N/A";

    if (isVenue(selectedAsset))
      return selectedAsset.rent ? `$${selectedAsset.rent}` : "N/A";
    if (isStudio(selectedAsset))
      return selectedAsset.packages?.[0]?.payment || "N/A";
    if (isCar(selectedAsset)) return selectedAsset.rent || "N/A";
    if (isCaters(selectedAsset)) return selectedAsset.totalAmount || "N/A";

    return "N/A";
  };

  const getCarDetails = () => {
    if (!selectedAsset || !isCar(selectedAsset)) return null;

    return [
      {
        label: "Car name",
        options: [selectedAsset.carName || "N/A"],
      },
      {
        label: "Model",
        options: [selectedAsset.model || "N/A"],
      },
      {
        label: "Make",
        options: [selectedAsset.make || "N/A"],
      },
      {
        label: "Fuel",
        options: [selectedAsset.fuel || "N/A"],
      },
      {
        label: "Color",
        options: [selectedAsset.color || "N/A"],
      },
      {
        label: "Transmission",
        options: [selectedAsset.transmission || "N/A"],
      },
      {
        label: "Seats",
        options: [selectedAsset.seats || "N/A"],
      },
    ];
  };

  const getFeatures = (): { primary: string[]; secondary: string[] } => {
    if (!selectedAsset) return { primary: [], secondary: [] };

    if (isVenue(selectedAsset)) {
      return {
        primary: selectedAsset.features || [],
        secondary: selectedAsset.parkingFeatures || [],
      };
    }
    if (isStudio(selectedAsset)) {
      return {
        primary: selectedAsset.serviceFeatures || [],
        secondary: [],
      };
    }
    if (isCar(selectedAsset)) {
      return {
        primary: selectedAsset.carFeatures || [],
        secondary: selectedAsset.additionalFeatures || [],
      };
    }
    if (isCaters(selectedAsset)) {
      return {
        primary: selectedAsset.features || [],
        secondary: selectedAsset.serviceTypes || [],
      };
    }

    return { primary: [], secondary: [] };
  };

  const { primary, secondary } = getFeatures();
  const carOptions = getCarDetails();

  const date = new Date(asset?.createdAt);
  const listedDate = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const handleReApply = async (assetId: string, assetType: string) => {
    setIsSubmitting(true);
    try {
      await assetReApply(assetId, assetType);
      await fetchDetails();
      toast.success("Asset re-apply requested");
    } catch (error) {
      console.error("Failed to asset re apply", error);
      toast.error("Failed to asset re apply");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnavailable = async (assetId: string, assetType: string) => {
    setIsSubmitting(true);
    try {
      await assetUnavailable(assetId, assetType);
      await fetchDetails();
      toast.success("Asset unavailable requested");
    } catch (error) {
      console.error("Failed to asset unavailable", error);
      toast.error("Failed to asset unavailable");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (assetId: string, assetType: string) => {
    setIsSubmitting(true);
    try {
      await assetDelete(assetId, assetType);
      toast.success("Asset deleted");
      navigate("/host/assets");
    } catch (error) {
      console.error("Failed to asset deleting", error);
      toast.error("Failed to asset deleting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-12 md:px-20 mx-auto py-3 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {selectedAsset?.Images?.length > 0 ? (
              selectedAsset.Images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Asset Image ${i}`}
                  className="w-full aspect-square object-cover rounded-lg border"
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No images available
              </p>
            )}
          </div>
        </div>

        {/* Right - Details section */}
        <div className="flex flex-col gap-1 md:gap-1.5">
          {/* Title and Status Row */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-gray-800 m-0 p-0 leading-tight">
                {getTitle()}
              </h2>
              {selectedAsset?.location && (
                <p className="flex items-center gap-2 text-gray-500 text-[14px] sm:text-sm md:text-base mt-2">
                  <MdOutlineLocationOn className="w-6 h-6 text-main_color" />
                  <strong className="text-black text-[11px] sm:text-sm md:text-base">
                    House No {selectedAsset.location.houseNo?.trim()},{" "}
                    {selectedAsset.location.street?.trim()},
                    {selectedAsset.location.district?.trim()},{" "}
                    {selectedAsset.location.state?.trim()} -{" "}
                    {selectedAsset.location.zip?.trim()},
                    {selectedAsset.location.country?.trim()}
                  </strong>
                </p>
              )}
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs sm:text-sm md:text-base md:px-3 py-1 rounded-full text-blue-500">
                {listedDate}
              </span>
              <span
                className={`text-xs sm:text-sm md:text-base px-2 md:px-4 md:py-2 py-1 rounded-full ${
                  asset.status === "approved"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : asset.status === "rejected"
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                }  mt-1`}
              >
                {asset.status}
              </span>
            </div>
          </div>
          {assetType === "studio" && (
            <div className="space-y-4 mb-3">
              <p className="text-sm sm:text-sm md:text-base font-bold text-black font-sans">
                Packages:
              </p>

              {(selectedAsset as IStudio).packages?.map((pkg, index) => (
                <div
                  key={index}
                  className="px-1 py-2 md:py-3 md:px-5 border rounded-xl shadow-sm bg-gray-50 space-y-3"
                >
                  <p className="text-base font-semibold text-black">
                    {pkg.packageName}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-1 text-sm text-gray-700">
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      💰 <span className="font-medium">Payment:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.payment}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      🧍 <span className="font-medium">Manpower:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.manPower}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      ⏱️ <span className="font-medium">Delivery:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.deliveryTime}
                      </span>
                    </p>
                    <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                      📅 <span className="font-medium">Validity:</span>{" "}
                      <span className="text-black text-xs sm:text-sm md:text-lg">
                        {pkg.validity}
                      </span>
                    </p>
                  </div>

                  {Array.isArray(pkg.packageIncludes) &&
                    pkg.packageIncludes?.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                          Includes:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.packageIncludes.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-black text-white rounded text-xs sm:text-sm md:text-lg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {Array.isArray(pkg.equipments) &&
                    pkg.equipments?.length > 0 && (
                      <div>
                        <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                          Equipments:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pkg.equipments.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-white border border-black rounded text-xs sm:text-sm md:text-lg"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}

          {carOptions && (
            <div className="mb-2">
              <p className="text-sm sm:text-sm md:text-base font-bold text-black font-sans mb-2">
                Car details:
              </p>

              <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
                {(Array.isArray(carOptions) ? carOptions : [carOptions]).map(
                  (group, groupIdx) => (
                    <div key={groupIdx} className="space-y-2">
                      <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs sm:text-sm md:text-base bg-black text-white rounded border border-black whitespace-nowrap"
                          >
                            {option}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div>
            <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
              Details:
            </p>
            <div className="text-sm text-gray-700">
              <div className="flex items-center gap-1 text-sm sm:text-base md:text-base">
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Amount :{" "}
                </p>
                {`${getPrice()}/-`}
              </div>
              {selectedAsset?.availableDates && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Available Dates: {"  "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {selectedAsset.availableDates.join(", ") || "N/A"}
                  </strong>
                </p>
              )}
              {selectedAsset?.timeSlots && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Time Slots: {"  "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {selectedAsset.timeSlots.join(", ") || "N/A"}
                  </strong>
                </p>
              )}
              {assetType === "venue" && (selectedAsset as IVenue).capacity && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Capacity:{" "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {(selectedAsset as IVenue).capacity} people
                  </strong>
                </p>
              )}
              {assetType === "venue" && (selectedAsset as IVenue).shift && (
                <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                  Shift type:{" "}
                  <strong className="text-black text-xs sm:text-sm md:text-lg">
                    {(selectedAsset as IVenue).shift}
                  </strong>
                </p>
              )}
              {assetType === "venue" &&
                (selectedAsset as IVenue).squareFeet && (
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Square feet:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      {(selectedAsset as IVenue).squareFeet}
                    </strong>
                  </p>
                )}
            </div>

            {assetType === "car" && (
              <div className="py-2">
                <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                  Details:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Required Docs:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      Licence
                    </strong>
                  </p>
                  <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                    Deposite amount:{" "}
                    <strong className="text-black text-xs sm:text-sm md:text-lg">
                      500
                    </strong>
                  </p>
                </div>
              </div>
            )}
            {assetType === "caters" && (selectedAsset as ICaters).manpower && (
              <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                Manpower:{" "}
                <strong className="text-black text-xs sm:text-sm md:text-lg">
                  {(selectedAsset as ICaters).manpower}
                </strong>
              </p>
            )}
            {assetType === "caters" && (selectedAsset as ICaters).charge && (
              <p className="text-gray-500 text-[12px] sm:text-sm md:text-base">
                Per charge:{" "}
                <strong className="text-black text-xs sm:text-sm md:text-lg">
                  {(selectedAsset as ICaters).charge}
                </strong>
              </p>
            )}
          </div>
          {(primary.length > 0 || secondary.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {primary.length > 0 && (
                <div>
                  <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                    {assetType === "venue"
                      ? "Space features"
                      : assetType === "car"
                      ? "Car features"
                      : assetType === "caters"
                      ? "Features"
                      : "Service features"}
                  </p>
                  <ul className="list-disc pl-5 text-black text-xs sm:text-sm md:text-lg space-y-1">
                    {primary.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {secondary.length > 0 && (
                <div>
                  <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                    {assetType === "venue"
                      ? "Parking features"
                      : assetType === "car"
                      ? "Additional features"
                      : assetType === "caters"
                      ? "Available features"
                      : "Other features"}
                  </p>
                  <ul className="list-disc pl-5 text-black text-xs sm:text-sm md:text-lg space-y-1">
                    {secondary.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div>
            <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
              Description:
            </p>
            <p className="text-black text-xs sm:text-sm md:text-lg">
              {selectedAsset?.description}
            </p>
          </div>
          {selectedAsset?.about && (
            <div>
              <p className="text-sm sm:text-sm md:text-base font-bold mb-1 text-black font-sans">
                About:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.about}
              </p>
            </div>
          )}
          {"terms" in selectedAsset && selectedAsset.terms && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Terms:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.terms}
              </p>
            </div>
          )}
          {"conditions" in selectedAsset && selectedAsset.conditions && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Conditions:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.conditions}
              </p>
            </div>
          )}
          {"termsOfUse" in selectedAsset &&
            Array.isArray(selectedAsset.termsOfUse) &&
            selectedAsset.termsOfUse.length > 0 && (
              <div>
                <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                  Terms of use:
                </p>
                <ul className="list-disc ml-5 text-black text-xs sm:text-sm md:text-lg">
                  {selectedAsset.termsOfUse.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}
          {"serviceTypes" in selectedAsset &&
            Array.isArray(selectedAsset.serviceTypes) &&
            selectedAsset.serviceTypes.length > 0 && (
              <div>
                <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                  Service types:
                </p>
                <ul className="list-disc ml-5 text-black text-xs sm:text-sm md:text-lg">
                  {selectedAsset.serviceTypes.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}

          {"guidelines" in selectedAsset && selectedAsset.guidelines && (
            <div>
              <p className="text-sm sm:text-sm md:text-base mb-1 text-black font-sans font-bold">
                Guidelines:
              </p>
              <p className="text-black text-xs sm:text-sm md:text-lg">
                {selectedAsset.guidelines}
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => {
                if (asset._id && assetType) {
                  setSelectedAssetId(asset._id);
                  setSelectedAssetType(assetType);
                  setConfirmType("delete");
                  setConfirmAction(true);
                }
              }}
              className="py-3 text-sm md:text-base mt-4 md:py-6 w-full md:w-auto bg-red-600 text-white font-poppins hover:bg-red-500"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                if (asset._id && assetType) {
                  setSelectedAssetId(asset._id);
                  setSelectedAssetType(assetType);
                  setConfirmType("unavailable");
                  setConfirmAction(true);
                }
              }}
              className="py-3 text-sm md:text-base mt-4 md:py-6 w-full md:w-auto bg-blue-600 text-white font-poppins hover:bg-blue-500"
            >
              Un-Avaialable
            </Button>
            {asset.status === "rejected" &&
              (asset.isReapplied ? (
                <Button className="py-3 text-sm md:text-base mt-4 md:py-6 w-full md:w-auto bg-gray-200 text-black font-poppins pointer-events-none">
                  Requested
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (asset._id && assetType) {
                      setSelectedAssetId(asset._id);
                      setSelectedAssetType(assetType);
                      setConfirmType("reapply");
                      setConfirmAction(true);
                    }
                  }}
                  className={`mt-4 text-sm md:text-base md:py-6 w-full md:w-auto flex items-center gap-1 justify-center bg-black hover:bg-slate-800 text-white font-poppins ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  <MdOutlineRefresh className="w-5 h-5" />
                  Re-Apply
                </Button>
              ))}

            <ConfirmDialog
              isOpen={confirmAction}
              title={
                confirmType === "delete"
                  ? "Confirm Delete"
                  : confirmType === "unavailable"
                  ? "Mark as Unavailable?"
                  : "Confirm Re-Apply"
              }
              description={
                confirmType === "delete"
                  ? "Are you sure you want to delete this asset? This action cannot be undone."
                  : confirmType === "unavailable"
                  ? "Are you sure you want to mark this asset as unavailable?"
                  : "Are you sure you want to re-apply for this asset?"
              }
              confirmText={
                confirmType === "delete"
                  ? "Yes, Delete"
                  : confirmType === "unavailable"
                  ? "Yes, Mark Unavailable"
                  : "Yes, Re-Apply"
              }
              cancelText="Cancel"
              onConfirm={() => {
                if (!selectedAssetId || !selectedAssetType) return;

                if (confirmType === "reapply") {
                  handleReApply(selectedAssetId, selectedAssetType);
                } else if (confirmType === "delete") {
                  handleDelete(selectedAssetId, selectedAssetType);
                } else if (confirmType === "unavailable") {
                  handleUnavailable(selectedAssetId, selectedAssetType);
                }

                setConfirmAction(false);
                setConfirmType(null);
              }}
              onCancel={() => {
                setConfirmAction(false);
                setConfirmType(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
