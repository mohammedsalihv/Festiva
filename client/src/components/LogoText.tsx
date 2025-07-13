import { Images } from "@/assets";

const LogoText = () => {
  return (
    <div className="text-xl sm:text-2xl flex items-center gap-2 font-bold uppercase">
      <img src={Images.logo_png} alt="" className="h-6 w-6 md:h-8 md:w-9" />
      <span className="text-main_color font-orbitron text-2xl sm:text-3xl">
        Festiva.
      </span>
    </div>
  );
};

export default LogoText;
