"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar as CalenderComp } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface Iprops {
  buttonTitle?: string;
  //   date: Date;
  setDate: (date: Date) => void;
}

export function DatePicker(props: Iprops) {
  const { buttonTitle } = props;
  const [date, setDate] = React.useState<Date | undefined>();

  React.useEffect(() => {
    if (date) {
      props.setDate(date);
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-dark-3 outline-none border-violet-3 text-white py-4 px-3 w-full text-md border rounded-md">
          <div className=" flex gap-2">
            <Calendar className="mr-3" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>{buttonTitle ? buttonTitle : "Pick a date"}</span>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalenderComp
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
