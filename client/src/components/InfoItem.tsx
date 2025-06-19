export const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2 text-gray-500 text-sm font-semibold">
      {icon} {label}
    </div>
    <div className="text-black text-[13px]">{value}</div>
  </div>
);
