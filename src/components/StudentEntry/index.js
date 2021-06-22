import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";
import { format } from "date-fns";

import { gradesectioncolumn } from "./columns";

export default function StudentEntry() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);

  const retrieveData = async (term = "") => {
    const request = {
      cols: "id,name,age,sex,lrn,birthday",
      table: "student",
      order: "id asc",
      join: "",
      wc: term ? `name like '%${term}%' or lrn like '%${term}%'` : "",
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
    retrieveData();
  }, []);

  const onNew = () => {
    setFormValues({});
    setMode(1);
    setOpenModal(true);
  };

  const onSubmit = async ({ name,sex,lrn,birthday }, e) => {
    const {id} = formValues;
    const age = calcuAge(birthday);
    const bdF = format(birthday, "yyyy-MM-dd");
    setLoading(true);
    let p = "";
    if (mode === 2) {
      p = `updateStudent('${name}',${age},'${sex}','${lrn}','${bdF}',${id})`;
    } else {
      //pname text, page int, psex text, plrn text, pbirthday text
      p = `insertStudent('${name}',${age},'${sex}','${lrn}','${bdF}')`;
    }
    const a = { fn: p };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save error occured!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      alert("saved");
      setOpenModal(false);
      //console.debug(response);
      retrieveData();
    } else if (response["data"][0].res === 3) {
      setLoading(false);
      alert("cannot save name:"+name+" already exist!");
    } else if (response["data"][0].res === 2) {
      setLoading(false);
      alert("cannot save LRN:"+lrn+" already exist!");
    }
  };

  const calcuAge = (bd) => {
    const ageDifMs = Date.now() - bd.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const handleOnEdit = (d) => {
    setFormValues(d);
    setMode(2);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveData(e.target[0].value);
  };

  const handleOnDelete = async ({ id, name, lrn }) => {
    if (window.confirm(`Delete ${lrn}-${name}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=student&wc=id`)
        .catch((err) => {
          setLoading(false);
          console.debug("err", err);
        });
      if (response) {
        retrieveData();
      }
    }
  };

  return (
    <MyUI
      onNew={onNew}
      handleSearch={handleSearch}
      loading={loading}
      data={data}
      handleOnEdit={handleOnEdit}
      handleOnDelete={handleOnDelete}
      openModal={openModal}
      setOpenModal={setOpenModal}
      mode={mode}
      formValues={formValues}
      onSubmit={onSubmit}
      gradesectioncolumn={gradesectioncolumn}
    />
  );
}
