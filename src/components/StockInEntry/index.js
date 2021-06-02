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
  const header = ["name", "barcode",'unit','qty','classification'];
  //sd.reference_number,p.name as product,sd.qty
  const headerStockIn = ["reference_number", "product",'qty'];
  const [data, setData] = useState([]);
  const [stockindata, setstockindata] = useState([]);
  const [supplierData, setsupplierData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);
  const [refnum, setRefNum] = useState(0);
  const [tranId, setTranId] = useState(0);
  const [productId, setProductId] = useState(0);

  const retrieveData = async (term = "") => {
    const request = {
      cols: "p.id,p.barcode,p.name,u.name as unit,p.qty,c.name as classification",
      table: "products p",
      order: "p.updatedAt desc",
      join: "left join units u on u.id=p.unit left join classifications c on c.id=p.class_id",
      wc: term ? `p.name like '%${term}%' or p.barcode like '%${term}%' or c.name like '%${term}%'` : "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  const retrieveStockInData = async (id) => {
    const request = {
      cols: "sd.id,sd.reference_number,p.name as product,sd.qty",
      table: "stock_in_det sd",
      order: "sd.updatedAt desc",
      join: "left join products p on p.id = sd.product",
      wc: `sd.stock_in_id=${id}`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setstockindata(response["data"]);
    }
  };

  const retrieveSuppliers = async (term = "") => {
    const request = {
      cols: "id,name",
      table: "suppliers",
      order: "id",
      join: "",
      wc: "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setsupplierData(response["data"]);
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
      retrieveStockInData(id);
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
      setTranId(idX);
      setRefNum(refnum);
      setLoading(false);
      retrieveStockInData(idX);
      alert("new transaction");
    } else{
      alert("cannot create stock id!");
      window.location.reload();
    }

  };

  useEffect(() => {
    retrieveSuppliers();
    retrievePreviousTransaction();
  }, []);

  const handleOnSelectProductToStock = (d) => {
    //console.debug(d);
    setFormValues(d);
    setProductId(d.id);
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

  const onSubmitProductToStock = async ({ stockinqty, id }, e) => {
    setLoading(true);
    //prefnum varchar(255), pproduct int, pqty int, pstock_in_id int
    const a = { fn: `addProductToStockIn(${refnum},${productId},${stockinqty},${tranId})` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      alert("saved");
      console.debug(response);
      retrieveStockInData(tranId);
    } else{
      setLoading(false);
      alert("cannot save!");
    }
  };

  const handleOnDelete = async ({ product: name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=stock_in_det&wc=id`)
        .catch((err) => {
          setLoading(false);
          console.debug("err", err);
        });
      if (response) {
        retrieveStockInData(tranId);
      }
    }
  };

  return (
    <MyUI
      handleSearch={handleSearch}
      loading={loading}
      header={header}
      data={data}
      handleOnSelectProductToStock={handleOnSelectProductToStock}
      openModal={openModal}
      setOpenModal={setOpenModal}
      mode={mode}
      formValues={formValues}
      onSubmit={onSubmitProductToStock}
      handleSort={handleSort}
      refnum={refnum}
      supplierData={supplierData}
      headerStockIn={headerStockIn}
      stockindata={stockindata}
      handleOnDelete={handleOnDelete}
    />
  );
}
