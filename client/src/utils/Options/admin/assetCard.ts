export interface AssetsCardProps {
  title: string;
  status: string;
  host: string;
  reqDate: string;
  imageSrc: string;
  bookmarked?: boolean;
  showPagination?: boolean;
  id: string;
  fulldata?: (id: string) => void;
}
