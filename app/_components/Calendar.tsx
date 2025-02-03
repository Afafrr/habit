"use client";
import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import DayTile from "./DayTile";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { calculateDays } from "../utils/calendar";
const timeHorizons = [
  { label: "1 month", weeksBefore: 3, weeksAfter: 1 },
  { label: "3 months", weeksBefore: 10, weeksAfter: 2 },
  { label: "6 months", weeksBefore: 22, weeksAfter: 2 },
] as const;
export type timeHorizonsT = (typeof timeHorizons)[number];

export default function Calendar() {
  const [timeHorizon, setTimeHorizon] = useState<timeHorizonsT>(
    timeHorizons[0]
  );
  let curDate = useMemo(() => new Date(), []);
  let days = useMemo(() => calculateDays(timeHorizon, curDate), [timeHorizon]);

  //when horizon changed adjust correct horizon object
  function onSelectChange(label: string) {
    const found =
      timeHorizons.find((obj) => obj.label === label) || timeHorizons[0];
    setTimeHorizon(found);
  }
  //based on time horizon - change grid direction and maxWidth
  const maxCalWidth =
    timeHorizon.label === "1 month"
      ? "max-w-[450px]  grid-flow-row grid-cols-7 grid-rows-auto"
      : "w-full grid-flow-col grid-rows-7 grid-cols-auto ";

  return (
    <div className="max-w-4xl w-full h-screen p-10">
      <div className=" flex">
        <Select value={timeHorizon.label} onValueChange={onSelectChange}>
          <SelectTrigger className="w-[180px] h-10">
            <SelectValue placeholder="Select time horizon" />
          </SelectTrigger>
          <SelectContent>
            {timeHorizons.map((horizon) => (
              <SelectItem key={horizon.label} value={horizon.label}>
                {horizon.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        className={`grid gap-0.5 sm:gap-1 h-fit p-1 ${maxCalWidth}`}
        onClick={(e) => console.log(e.target)}
      >
        {days.map((day) => (
          <DayTile
            key={day}
            dateData={day}
            showText={timeHorizon.label !== "6 months"}
            curDate={format(curDate, "dd-MM-yyyy")}
          />
        ))}
      </div>
    </div>
  );
}
