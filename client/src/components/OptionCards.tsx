type CardOptionProps = {
  label: string;
  image: string;
  selected: string;
  onSelect: (label: string) => void;
};

const CardOption = ({ label, image, selected, onSelect }: CardOptionProps) => {
  return (
    <div
      className={`sm:h-32 border-2 rounded-md  cursor-pointer transition-all shadow-sm hover:shadow-md flex items-center gap-4 py-6 px-4 ${
        selected === label ? "border-main_host" : "border-gray-300"
      }`}
      onClick={() => onSelect(label)}
    >
      <img src={image} alt={label} className="w-10 h-10 object-cover rounded-md" />

      <div className="flex-1 flex justify-between items-center">
        <p className="text-sm sm:text-base font-medium">{label}</p>
        <input
          type="checkbox"
          checked={selected === label}
          readOnly
          className="h-5 w-5 text-main_host"
        />
      </div>
    </div>
  );
};

export default CardOption;
