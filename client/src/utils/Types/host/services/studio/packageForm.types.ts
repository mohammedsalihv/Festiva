











export interface packageFormState {
  packages: packageState[];
}

export interface packageState {
  packageName: string;
  manPower: string;
  payment: string;
  packageIncludes: string[];
  equipments: string[];
  deliveryTime: string;
  validity: string;
}

export interface packageError {
  packageName: string;
  manPower: string;
  payment: string;
  packageIncludes: string;
  equipments: string;
  deliveryTime: string;
  validity: string;
}

export interface packageFormErrorState {
  packages: packageError[];
}

export const initialPackageFormState: packageFormState = {
  packages: [
    {
      packageName: "",
      manPower: "",
      payment: "",
      packageIncludes: [],
      equipments: [],
      deliveryTime: "",
      validity: "",
    },
  ],
};

export const initialPackageFormErrorState: packageFormErrorState = {
  packages: [
    {
      packageName: "",
      manPower: "",
      payment: "",
      packageIncludes: "",
      equipments: "",
      deliveryTime: "",
      validity: "",
    },
  ],
};
