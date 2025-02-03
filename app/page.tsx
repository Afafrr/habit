"use client";

import type React from "react";
import Calendar from "./_components/Calendar";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center gap-10">
      <Calendar />
    </div>
  );
}
