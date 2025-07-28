import { useMemo, useState } from "react";
import type { IVenue } from "@/utils/Types/user/venueTypes";
import type { ICa } from "@/utils/Types/user/venueTypes";
import type { IVenue } from "@/utils/Types/user/venueTypes";
import type { IVenue } from "@/utils/Types/user/venueTypes";

import { Button } from "@/components/Button";

type AssetDetailsProps = {
  asset: IVenue | IStudio | IRentCar | ICaters;
};

export const AssetDetails = ({ asset }: AssetDetailsProps) => {
  const type = asset.typeOfAsset;
  const [selectedImage, setSelectedImage] = useState(asset.Images?.[0]);

  const common = {
    images: asset.Images ?? [],
    about: asset.about,
    description: asset.description,
    timeSlots: asset.timeSlots ?? [],
    availableDates: asset.availableDates ?? [],
  };

  const renderSpecificFields = useMemo(() => {
  switch (type) {
  case "venue": {
    const v = asset as IVenue;
    return (
      <>
        <DetailGroup label="Features" data={v.features} />
        <DetailGroup label="Parking Features" data={v.parkingFeatures} />
        <DetailLine label="Capacity" value={v.capacity} />
        <DetailLine label="Square Feet" value={v.squareFeet} />
        <DetailLine label="Rent" value={v.rent} />
        <DetailLine label="Shift" value={v.shift} />
        <DetailLine label="Terms" value={v.terms} />
      </>
    );
  }

  case "studio": {
    const s = asset as IStudio;
    return (
      <>
        <DetailGroup label="Service Features" data={s.serviceFeatures} />
        <DetailLine label="Terms" value={s.terms} />
        <div className="space-y-2">
          <p className="font-medium text-sm">Packages</p>
          {s.packages.map((pkg, idx) => (
            <div key={idx} className="text-sm bg-gray-100 rounded p-2">
              <p className="font-semibold">
                {pkg.packageName} - ₹{pkg.payment}
              </p>
              <p>Equipments: {pkg.equipments.join(", ")}</p>
              <p>Includes: {pkg.packageIncludes?.join(", ")}</p>
              <p>
                Delivery: {pkg.deliveryTime} | Validity: {pkg.validity}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }

  case "rentcar": {
    const c = asset as IRentCar;
    return (
      <>
        <DetailLine label="Make & Model" value={`${c.make} / ${c.model}`} />
        <DetailLine label="Seats" value={c.seats} />
        <DetailLine label="Fuel" value={c.fuel} />
        <DetailLine label="Transmission" value={c.transmission} />
        <DetailGroup label="Car Features" data={c.carFeatures} />
        <DetailGroup label="Additional Features" data={c.additionalFeatures} />
        <DetailLine label="Deposit" value={c.deposite} />
        <DetailLine label="Guidelines" value={c.guidelines} />
      </>
    );
  }

  case "caters": {
    const cat = asset as ICaters;
    return (
      <>
        <DetailLine label="Charge" value={cat.charge} />
        <DetailLine label="Total Amount" value={cat.totalAmount} />
        <DetailLine label="Manpower" value={cat.manpower} />
        <DetailGroup label="Service Types" data={cat.serviceTypes} />
        <DetailGroup label="Features" data={cat.features} />
        <DetailLine label="Conditions" value={cat.conditions} />
        <DetailLine label="Terms" value={cat.terms} />
      </>
    );
  }

  default:
    return null;
}

  }, [asset, type]);

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left - Image */}
      <div className="space-y-4">
        <img
          src={selectedImage}
          alt="Main"
          className="w-full aspect-square object-cover rounded-lg border"
        />
        <div className="flex gap-2">
          {common.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb-${i}`}
              className={`w-16 h-16 rounded object-cover border cursor-pointer ${
                selectedImage === img ? "ring-2 ring-black" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right - Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {asset["venueName"] || asset["studioName"] || asset["carName"] || asset["catersName"]}
        </h2>

        <Button className="w-full md:w-auto">Add to Cart</Button>

        {/* Dynamic Details Below */}
        <div className="border-t pt-4 space-y-4">
          <DetailLine label="About" value={common.about} />
          <DetailLine label="Description" value={common.description} />
          {common.timeSlots.length > 0 && (
            <DetailGroup label="Available Time Slots" data={common.timeSlots} />
          )}
          {common.availableDates.length > 0 && (
            <DetailGroup label="Available Dates" data={common.availableDates} />
          )}
          {renderSpecificFields}
        </div>
      </div>
    </div>
  );
};

// Subcomponents
const DetailLine = ({ label, value }: { label: string; value?: any }) =>
  value ? (
    <p className="text-sm">
      <span className="font-medium">{label}:</span> {value}
    </p>
  ) : null;

const DetailGroup = ({ label, data }: { label: string; data?: string[] }) =>
  data && data.length > 0 ? (
    <div className="text-sm">
      <p className="font-medium">{label}:</p>
      <ul className="list-disc ml-5 space-y-1">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  ) : null;
