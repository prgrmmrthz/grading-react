import React, { useState, useEffect, useContext } from "react";
import api from "../../api/supplier";
import { AuthContext } from "../../context/AuthContext";
import MyUI from "./MyUI";
import { v1 as uuidv1 } from 'uuid';

export default function StockInEntry() {
  const [auth, setAuth] = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const header = ["name", "barcode",'unit','qty'];
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);
  const [refnum, setRefNum] = useState(0);
  const [tranId, setTranId] = useState(0);

  const retrieveData = async (term = "") => {
    const request = {
      cols: "p.id,p.barcode,p.name,u.name as unit,p.qty",
      table: "products p",
      order: "p.updatedAt desc",
      join: "left join units u on u.id=p.unit",
      wc: term ? `p.name like '%${term}%' or p.barcode like '%${term}%'` : "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  const retrievePreviousTransaction = async () => {
    const request = {
      cols: "id, supplier, reference_number, status",
      table: "stock_in",
      order: "id",
      join: "",
      wc: `user=${auth.id} and status=0`,
      limit: "0,1",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    const a= response["data"][0] ;
    if (a) {
      const {reference_number,id} = a;
      retrieveData();
      setRefNum(reference_number);
      setTranId(id);
      setLoading(false);
      alert("retrieved previous transaction");
    }else{
      createNewStockInId();
    }
  };

  const createNewStockInId = async () => {
    setLoading(true);
    const a = { fn: `createStockIn(${auth.id})` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot create stock id!");
    });
    const {idX,refnum} = response["data"][0];
    console.debug(idX);
    //setLoading(false);
    if (idX != 0) {
      retrieveData();
      setRefNum(refnum);
      setLoading(false);
      alert("new transaction");
    } else{
      alert("cannot create stock id!");
      window.location.reload();
    }

  };

  useEffect(() => {
    retrievePreviousTransaction();
  }, []);

  const handleOnEdit = (d) => {
    //console.debug(d);
    setFormValues(d);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveData(e.target[0].value);
  };

  const handleSort = () => {
    const a = data.sort((a, b) => {
      setIsAsc(!isAsc);
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
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
    const a = { fn: `insertStockAdjustment(${id},${adjustqty},'${reason}',${auth.id})` };
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
      refnum={refnum}
    />
  );
}
