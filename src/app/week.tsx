'use client';

import Day from "./day";

type DailyData = {
    apparentTemperatureHigh: number;
    apparentTemperatureLow: number;
    time: number;
    icon: string;
    summary: string;
  };
  
  type WeekProps = {
    data: DailyData[];
  };

  export default function Week({ data }: WeekProps) {
    const weekData = [...data];
    weekData.shift(); 
    return weekData.map((instance, i) => <Day key={i} data={instance} />);
  }
  