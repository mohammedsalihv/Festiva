import {
  packageFormState,
  packageError,
  packageFormErrorState,
} from "@/utils/Types/host/services/studio/packageForm.types";

export interface StructuredValidationResult {
  isValid: boolean;
  errors: packageFormErrorState;
}

export const validatePackageForm = (
  packages: packageFormState
): StructuredValidationResult => {
  const errors: packageFormErrorState = {
    packages: [],
  };

  if (!packages || packages.packages.length === 0) {
    errors.packages.push({
      packageName: "Package name is required",
      manPower: "Manpower details are required",
      payment: "Payment is required",
      packageIncludes: "Packages included is required",
      equipments: "Equipments is required",
      deliveryTime: "Delivery time is required",
      validity: "Validity is required",
    });
  } else {
    packages.packages.forEach((pkg) => {
      const pkgErrors: packageError = {
        packageName: "",
        manPower: "",
        payment: "",
        packageIncludes: "",
        equipments: "",
        deliveryTime: "",
        validity: "",
      };

      if (!pkg.packageName?.trim()) {
        pkgErrors.packageName = "Package name is required";
      }
      if (!pkg.payment?.trim()) {
        pkgErrors.payment = "Payment information is required";
      }
      if (!pkg.manPower?.trim()) {
        pkgErrors.manPower = "Manpower details are required";
      }
      if (!pkg.deliveryTime?.trim()) {
        pkgErrors.deliveryTime = "Delivery time is required";
      }
      if (!pkg.validity?.trim()) {
        pkgErrors.validity = "Validity is required";
      }
      if (!pkg.packageIncludes || pkg.packageIncludes.length === 0) {
        pkgErrors.packageIncludes = "At least one included feature is required";
      }
      if (!pkg.equipments || pkg.equipments.length === 0) {
        pkgErrors.equipments = "At least one equipment is required";
      }

      errors.packages.push(pkgErrors);
    });
  }

  const isValid = errors.packages.every((pkg) =>
    Object.values(pkg).every((val) => val === "")
  );

  return { isValid, errors };
};
