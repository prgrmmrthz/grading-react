import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";

export default function AdjustedStock () {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const header = ['id','product','unit','qty','reason','date'];
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);

  const retrieveData = async (from,to) => {
    const request = {
      cols: "sa.id,p.name as product,u.name as unit,sa.adjust_qty as qty,sa.reason,DATE_FORMAT(sa.updatedAt,'%m-%d-%Y') as date",
      table: "stock_adjustment sa",
      order: "sa.updatedAt desc",
      join: "left join products p on p.id=sa.product left join units u on u.id=p.unit",
      wc: from && to ? `sa.updatedAt >= '${cd(from)}' and sa.updatedAt <= '${cd(to)}'` : "DATE(sa.updatedAt) = CURDATE()",
      limit: ""
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  const cd= (date) => {
    const a = date.getMonth() + 1;
    const b = date.getDate();
    return `${date.getFullYear()}-${a < 10 ? '0' + a : a}-${b < 10 ? '0' + b : b}`;
  }

  useEffect(() => {
    retrieveData();
  }, []);

  const handleOnEdit = (d) => {
  };

  const handleSearch = (e) => {
  };

  const handleSelection = ({startDate: f, endDate: t}) => {
    retrieveData(f,t);
    //console.debug(f);
  };

  const handleSort = () => {
    const a = data.sort((a, b) => {
      setIsAsc(!isAsc);
      var nameA = a.product.toUpperCase(); // ignore upper and lowercase
      var nameB = b.product.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return isAsc ? -1 : 1;
      }
      if (nameA > nameB) {
        return isAsc ? 1 : -1;
      }

      // names must be equal
      return 0;
    });
    //sconsole.debug(a);
    setData([...a]);
  };

  const onSubmit = async ({ adjustqty, id, reason }, e) => {
    setLoading(true);
    const a = { fn: `insertStockAdjustment(${id},${adjustqty},'${reason}')` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      alert("saved");
      setOpenModal(false);
      console.debug(response);
      retrieveData();
    } else if (response["data"][0].res === 2) {
      setLoading(false);
      alert("cannot save!");
    }
  };

  return (
    <MyUI
      handleSearch={handleSearch}
      loading={loading}
      header={header}
      data={data}
      handleOnEdit={handleOnEdit}
      openModal={openModal}
      setOpenModal={setOpenModal}
      mode={mode}
      formValues={formValues}
      onSubmit={onSubmit}
      handleSort={handleSort}
      handleSelection={handleSelection}
    />
  );
}
