import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAssetDetails } from "@/api/user/base/assets";
import ServiceDetails from "./ServiceDetails";
import Loader from "@/components/Loader";
import Retry from "@/components/Retry";
import { IAsset } from "@/utils/Types/user/commonDetails";
import { AssetType } from "@/utils/Types/user/commonDetails";
import { toast } from "react-toastify";

export default function DetailPageHelper() {
  const { type, id } = useParams();
  const [data, setData] = useState<IAsset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (type && id) {
      setLoading(true);
      fetchAssetDetails(type as AssetType, id)
        .then((res) => {
          setData(res);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setError("Failed to fetch asset details");
          setLoading(false);
        });
    }
  }, [type, id]);

  if (loading) return <Loader />;
  if (error || !data)
    return (
      <Retry
        message={error ?? "No data"}
        onRetry={() => window.location.reload()}
      />
    );

  return <ServiceDetails data={data} />;
}
