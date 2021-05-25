import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";

export default function AdjustedStock() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const header = ["name"];
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);

  const retrieveSuppliers = async (term = "") => {
    const request = {
      cols: "id,name",
      table: "suppliers",
      order: "updatedAt desc",
      join: "",
      wc: term ? `name like '%${term}%'` : "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  useEffect(() => {
    retrieveSuppliers();
  }, []);

  const onNew = () => {
    setFormValues({});
    setMode(1);
    setOpenModal(true);
  };

  const onSubmit = async ({ name }, e) => {
    setLoading(true);
    let p = "";
    if (mode === 2) {
      p = `updateSupplier('${name}',${formValues["id"]})`;
    } else {
      p = `insertSupplier('${name}')`;
    }
    const a = { fn: p };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save " + name + " already exist!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      alert("saved");
      setOpenModal(false);
      console.debug(response);
      retrieveSuppliers();
    } else if (response["data"][0].res === 3) {
      setLoading(false);
      alert("cannot save " + name + " already exist!");
    }
  };

  const handleOnEdit = (d) => {
    setFormValues(d);
    setMode(2);
    setOpenModal(true);
  };

  const handleSelection = (selection) => {
    console.debug(selection);
  };


  const handleSearch = (e) => {
    e.preventDefault();
    retrieveSuppliers(e.target[0].value);
  };

  const handleOnDelete = async ({ name, id }) => {
    if (window.confirm(`Delete ${name}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=suppliers&wc=id`)
        .catch((err) => {
          setLoading(false);
          console.debug("err", err);
        });
      if (response) {
        retrieveSuppliers();
      }
    }
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
    console.debug(a);
    setData([...a]);
  };

  return (
    <MyUI
      onNew={onNew}
      handleSearch={handleSearch}
      loading={loading}
      header={header}
      data={data}
      handleOnEdit={handleOnEdit}
      handleOnDelete={handleOnDelete}
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
