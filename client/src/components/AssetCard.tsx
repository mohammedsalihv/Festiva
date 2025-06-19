import { AssetsCardProps } from "@/utils/Options/admin/assetCard";
import { Bookmark, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AssetsCard: React.FC<AssetsCardProps> = ({
  status,
  name,
  assetType,
  reqDate,
  imageSrc,
  id,
  bookmarked = false,
  showPagination = false,
  fulldata,
}) => {
  const formattedDate = new Date(reqDate).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className="group relative w-52 h-56 sm:h-60 rounded-md overflow-hidden shadow bg-white cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => fulldata?.(id)}
    >
      <img
        src={imageSrc}
        alt="Card"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 group-hover:opacity-30"
      />
      <div className="relative z-10 flex flex-col justify-between h-full p-2 sm:p-3 text-white text-xs">
        <div className="flex items-center gap-1">
          <span
            className={`${
              status === "pending" ? "text-yellow-600 " : "text-white"
            }  bg-yellow-200 p-1 rounded-md text-[12px] font-sans`}
          >
            {status}
          </span>
        </div>
        <div className="text-xs mt-auto">
          <p className="font-bold text-sm sm:text-sm">{name}</p>
          <p className="opacity-90 text-[10px]">{assetType}</p>
          <p className="opacity-90 text-[10px]">
            Requested on: {formattedDate}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          {showPagination && (
            <div className="flex gap-1">
              {[1, 2, 3].map((dot) => (
                <span key={dot} className="w-2 h-2 rounded-full bg-white/70" />
              ))}
            </div>
          )}
          <Bookmark
            className={cn(
              "w-6 h-6 ml-auto",
              bookmarked ? " stroke-white" : "stroke-white"
            )}
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <ArrowUpRight className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};
