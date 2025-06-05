import { AssetsCardProps } from "@/utils/Options/admin/assetCard";
import { Bookmark, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const AssetsCard: React.FC<AssetsCardProps> = ({
  title,
  subtitle,
  imageSrc,
  logoSrc,
  bookmarked = false,
  showPagination = false,
}) => {
  return (
    <div className="group relative w-64 aspect-[3/4] rounded-md overflow-hidden shadow bg-white cursor-pointer transition-transform hover:scale-[1.02]">
      <img
        src={imageSrc}
        alt="Card"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300 group-hover:opacity-30"
      />
      <div className="relative z-10 flex flex-col justify-between h-full p-3 text-white">
        <div className="flex items-center gap-1">
          {logoSrc && (
            <img src={logoSrc} alt="logo" className="h-5 w-5 object-contain" />
          )}
          <span className="text-xs font-medium">Alinma</span>
        </div>
        <div className="text-xs mt-auto">
          <p className="font-semibold leading-snug">{title}</p>
          <p className="opacity-90">{subtitle}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          {showPagination && (
            <div className="flex gap-1">
              {[1, 2, 3].map((dot) => (
                <span
                  key={dot}
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                />
              ))}
            </div>
          )}
          <Bookmark
            className={cn(
              "w-4 h-4 ml-auto",
              bookmarked ? "fill-white stroke-white" : "stroke-white"
            )}
          />
        </div>
      </div>

      {/* Hover Icon */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <ArrowUpRight className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};
