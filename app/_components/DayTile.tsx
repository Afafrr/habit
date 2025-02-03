import React from "react";
//add tooltips

export default function DayTile({
  dateData = "",
  showText,
  curDate,
}: {
  dateData: string;
  showText: boolean;
  curDate: string;
}) {
  const [day, month] = dateData.split("-");

  return (
    <div
      date-data={dateData}
      className={`flex justify-center items-center aspect-square max-h-[60px] min-w-[5px] sm:rounded-sm bg-gray-300 text-[10px] cursor-pointer ${
        dateData === curDate ? "bg-orange-500" : null
      }`}
    >
      {showText && day + "-" + month}
    </div>
  );
}
