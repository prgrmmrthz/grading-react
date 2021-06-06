import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

export default function DateFromTo({handleSelection}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
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
