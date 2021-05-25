import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";

export default function DateFromTo({handleSelection}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleThisSelection = (item) => {
    setState([item]);
    handleSelection(item);
  };

  return (
    <div>
      <DateRangePicker
        onChange={(item) => handleThisSelection(item.selection)}
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
