export interface INotification {
  _id: string;
  message: string;
  createdAt: string;
  assetId: string;
  assetType: "rentcar" | "studio" | "venue" | "caters";
  isRead: boolean;
  creator?: {
    firstname?: string;
    lastname?: string;
    profilePic?: string;
  };
  asset?: unknown;
}

export interface notificationProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}
