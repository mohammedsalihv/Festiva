import { addVenue, addRentCar, addCaters } from "@/api/host/hostService";
import { toast } from "react-toastify";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { ServiceFormUnion } from "@/utils/Types/host/services/commonTypes";

// Location
import { locationFormState } from "@/utils/validations/host/service/locationFormValidation";

import { ImageDetails } from "@/utils/Types/host/services/commonTypes";

// Venue
import {
  venueFormState,
  venueDetailsFormState,
} from "@/utils/Types/host/services/venueTypes";
import {
  resetVenueDetailsForm,
  resetVenueForm,
} from "@/redux/Slice/host/venue/venueSlice";

// RentCar
import {
  rentCarFormState,
  rentCarDetailsFormState,
} from "@/utils/validations/host/service/rentCarFormValidation";
import {
  resetRentCarForm,
  resetRentCarDetails,
} from "@/redux/Slice/host/rentcar/rentCarSlice";

// Common
import { resetLocationDetails } from "@/redux/Slice/host/common/locationSlice";
import { resetImages } from "@/redux/Slice/host/common/imageSlice";
import { serviceTypes } from "@/redux/Slice/host/common/serviceTypeSlice";
import {
  catersDetailsFormState,
  catersFormState,
} from "@/utils/Types/host/services/catersTypes";
import {
  resetCatersDetailsForm,
  resetCatersForm,
} from "@/redux/Slice/host/caters/catersSlice";

interface FinalSubmitParams {
  serviceType: serviceTypes;
  serviceForm: ServiceFormUnion;
  locationForm: locationFormState;
  fileImages: ImageDetails;
  navigate: NavigateFunction;
  dispatch: AppDispatch;
}

export const handleFinalSubmit = async ({
  serviceType,
  serviceForm,
  locationForm,
  fileImages,
  navigate,
  dispatch,
}: FinalSubmitParams) => {
  try {
    const formData = new FormData();

    Object.entries(locationForm).forEach(([key, value]) => {
      formData.append(`location[${key}]`, value);
    });

    fileImages.Images.forEach((file) => {
      formData.append("Images", file);
    });
    switch (serviceType) {
      case "venue": {
        const { form, details } = serviceForm as {
          form: venueFormState;
          details: venueDetailsFormState;
        };

        const { rent, timeSlots, availableDates, ...rest } = form;

        Object.entries(rest).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        if (rent !== undefined) {
          formData.append("rent", String(rent));
        }

        timeSlots?.forEach((slot) =>
          formData.append("timeSlots[]", String(slot))
        );

        availableDates?.forEach((date) =>
          formData.append("availableDates[]", String(date))
        );

        details.features.forEach((f, i) => {
          formData.append(`features[${i}]`, f);
        });

        details.parkingFeatures.forEach((p, i) =>
          formData.append(`parkingFeatures[${i}]`, p)
        );

        formData.append("about", details.about);
        formData.append("terms", details.terms);

        await addVenue(formData);
        toast.success("Venue submitted successfully!");

        dispatch(resetVenueDetailsForm());
        dispatch(resetVenueForm());
        break;
      }

      case "rentcar": {
        const { form, details } = serviceForm as {
          form: rentCarFormState;
          details: rentCarDetailsFormState;
        };

        const { timeSlots, availableDates, ...rest } = form;

        Object.entries(rest).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        timeSlots?.forEach((slot) =>
          formData.append("timeSlots[]", String(slot))
        );

        availableDates?.forEach((date) =>
          formData.append("availableDates[]", String(date))
        );

        details.carFeatures?.forEach((f, i) =>
          formData.append(`carFeatures[${i}]`, f)
        );

        details.additionalFeatures?.forEach((f, i) =>
          formData.append(`additionalFeatures[${i}]`, f)
        );

        details.termsOfUse?.forEach((f, i) =>
          formData.append(`termsOfUse[${i}]`, f)
        );

        formData.append("about", details.about ?? "");
        formData.append("guidelines", details.guidelines ?? "");
        formData.append("description", details.description ?? "");
        formData.append("userDocument", details.userDocument ?? "");

        await addRentCar(formData);
        toast.success("Car rental submitted successfully!");

        dispatch(resetRentCarForm());
        dispatch(resetRentCarDetails());
        break;
      }

      case "caters": {
        const { form, details } = serviceForm as {
          form: catersFormState;
          details: catersDetailsFormState;
        };

        const { timeSlots, availableDates, ...restOfCaterForm } = form;
        const { features, ...restOfCatersDetailsForm } = details;

        Object.entries(restOfCaterForm).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
        Object.entries(restOfCatersDetailsForm).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        timeSlots.forEach((slot) => {
          formData.append("`timeSlots[]", String(slot));
        });

        availableDates.forEach((date) => {
          formData.append("availableDates[]", String(date));
        });

        features?.forEach((feature) => {
          formData.append("features[]", String(feature));
        });

        await addCaters(formData);
        toast.success("Caters submitted successfully!");

        dispatch(resetCatersForm());
        dispatch(resetCatersDetailsForm());
        break;
      }

      default:
        toast.error("Unknown service type");
        return;
    }

    dispatch(resetLocationDetails());
    dispatch(resetImages());

    setTimeout(() => {
      navigate("/host/kind-of-service");
    }, 2000);
  } catch (error) {
    console.error("Submission Error:", error);
    toast.error("Something went wrong while submitting!");
  }
};
