import {
  eachDayOfInterval,
  format,
  endOfWeek,
  subWeeks,
  startOfWeek,
  addWeeks,
} from "date-fns";
import { timeHorizonsT } from "../_components/Calendar";

/**
 * @param {timeHorizonsT} timeHorizon - The time horizon object defining weeks before and after the given date.
 * @param {Date} date - The reference date for the calculation.
 * @returns {string[]} An array of dates in the format 'dd-MM-yyyy' for the specified time horizon.
 */

export function calculateDays(
  timeHorizon: timeHorizonsT,
  date: Date
): string[] {
  return eachDayOfInterval({
    start: startOfWeek(subWeeks(date, timeHorizon.weeksBefore), {
      weekStartsOn: 0,
    }),
    end: endOfWeek(addWeeks(date, timeHorizon.weeksAfter), {
      weekStartsOn: 0,
    }),
  }).map((date) => format(date, "dd-MM-yyyy"));
}
