export interface revenueCards {
  serviceType: string;
  totalRevenue: number;
  bookingGrowthPercentage: string;
}

export interface serviceStatics {
  assetType: string[];
  assetCounts: number[];
}

export interface serviceOverviews {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface totalUsers {
  personCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalHosts {
  personCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalBookings {
  bookingCount: number;
  topBookedAsset: string;
  topBookedAssetCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalIncome {
  total: number;
  totalPayments: number;
  platformFee: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface recentActivities {
  bookings?: {
    assetImage: string | null;
    bookedService: string;
    bookedDate: string | Date;
    bookingStatus: string;
  }[];
  registrations?: {
    userName: string;
    userImage: string;
    userEmail: string;
  }[];
  listings?: {
    assetType: string;
    assetImage: string | null;
    assetName: string | null;
    listedStatus: string;
  }[];
  reviews?: {
    reviewerName: string;
    reviewerImage: string;
    revieweComment: string;
  }[];
  assetAdminUpdation?: {
    adminName: string;
    adminImage: string;
    assetName: string;
    assetImage: string;
    assetStatus: string;
    rejectionReason?: string;
  }[];
  hostBoookingApproval?: {
    bookedAssetName: string;
    bookedAssetType: string;
    bookedDate: string;
    bookingStatus: string;
    hostName: string;
    hostImage: string;
    rejectionReason?: string;
  }[];
}

export interface allReviews {
  ReviewerName: string;
  ReviewerImage: string;
  rating: number;
  comment: string;
  ReviewedDate: string | Date;
}
