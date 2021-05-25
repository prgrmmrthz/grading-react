import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

export default function DateFromTo({handleSelection}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <div>
      <DateRangePicker
        onChange={(item) => handleSelection(item.selection)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
      ; ;
    </div>
  );
}
