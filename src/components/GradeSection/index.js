import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";

import { gradesectioncolumn } from "./columns";

export default function GradeSection() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);

  const retrieveData = async (term = "") => {
    const request = {
      cols: "id,grade,section",
      table: "grade_section",
      order: "id asc",
      join: "",
      wc: term ? `grade like '%${term}%' or section like '%${term}%'` : "",
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

  const onSubmit = async ({ grade, section }, e) => {
    const {id} = formValues;
    setLoading(true);
    let p = "";
    if (mode === 2) {
      p = `updateGradeSection('${grade}',${id},'${section}')`;
    } else {
      p = `insertGradeSection('${grade}','${section}')`;
    }
    const a = { fn: p };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save grade/section already exist!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      alert("saved");
      setOpenModal(false);
      //console.debug(response);
      retrieveData();
    } else if (response["data"][0].res === 3) {
      setLoading(false);
      alert("cannot save "+grade+"-"+section+" already exist!");
    }
  };

  const handleOnEdit = (d) => {
    setFormValues(d);
    setMode(2);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveData(e.target[0].value);
  };

  const handleOnDelete = async ({ id, grade, section }) => {
    if (window.confirm(`Delete ${grade}-${section}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=grade_section&wc=id`)
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
