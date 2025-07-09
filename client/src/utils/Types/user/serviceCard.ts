export interface ServicesCardProps {
  assets: any[];
  loading: boolean;
  error: string | null;
  onRetry: () => Promise<void>;
}
