export interface revenueResponse {
  serviceType: string;
  totalRevenue: number;
  bookingGrowthPercentage: string;
}

export interface serviceStatisticsResponse {
  assetType: string[];
  assetCounts: number[];
}

export interface serviceOverviewsResponse {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface totalUsersResponse {
  personCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalHostsResponse {
  personCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalBookingsResponse {
  bookingCount: number;
  topBookedAsset: string;
  topBookedAssetCount: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface totalIncomeResponse {
  total: number;
  totalPayments: number;
  platformFee: number;
  fromDate?: string | Date;
  toDate?: string | Date;
}

export interface allReviewsResponse {
  ReviewerName: string;
  ReviewerImage: string;
  rating: number;
  comment: string;
  ReviewedDate: string | Date;
}

export interface recentActivitiesResponse {
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
