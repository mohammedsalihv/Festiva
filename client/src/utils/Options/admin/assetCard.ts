export interface AssetsCardProps {
  name: string;
  status?: string;
  assetType?: string;
  reqDate: string;
  imageSrc: string;
  bookmarked?: boolean;
  showPagination?: boolean;
  id: string;
  fulldata?: (id: string) => void;
}
