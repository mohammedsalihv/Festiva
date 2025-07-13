import { VscListSelection } from "react-icons/vsc";
import { TableProps } from "@/utils/Options/user/tableFields";

const Table = <T extends object>({
  data,
  columns,
  onRowClick,
  renderRowStart,
}: TableProps<T>) => {
  return (
    <div className="relative w-full overflow-x-auto">
      <table className="min-w-full table-auto divide-y divide-gray-200">
        <thead className="bg-gray-50 text-center">
          <tr>
            {renderRowStart && (
              <th className="px-4 py-3 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
                <div className="flex justify-center">
                  <VscListSelection />
                </div>
              </th>
            )}
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200 text-center">
          {data.map((row, rowIndex) => (
            <tr
              key={
                typeof row === "object" && "_id" in row
                  ? (row as { _id?: string })._id ?? rowIndex
                  : rowIndex
              }
              className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
              onClick={() => onRowClick?.(row)}
            >
              {renderRowStart && (
                <td className="px-4 py-4">{renderRowStart(row, rowIndex)}</td>
              )}
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-4 text-[10px] sm:text-xs lg:text-sm whitespace-nowrap"
                >
                  {typeof col.accessor === "function" ? (
                    <div className="flex justify-center items-center">
                      {col.accessor(row, rowIndex)}
                    </div>
                  ) : (
                    String(row[col.accessor])
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
