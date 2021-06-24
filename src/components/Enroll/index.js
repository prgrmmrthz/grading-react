import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";

import { gradesectioncolumn } from "./columns";

export default function Enroll() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [classroomdata, setclassroomData] = useState([]);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});

  const retrieveData = async () => {
    const request = {
      cols: "id,name as studentname,lrn, concat(lrn, ' - ', name) as name",
      table: "student",
      order: "id asc",
      join: "",
      wc: "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  const retrieveSections = async (term = "") => {
    const request = {
      cols: "id,grade,section,concat(grade, '-', section) as name",
      table: "grade_section",
      order: "id",
      join: "",
      wc: "",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      sectionsetData([...response["data"]]);
    }
  };

  const retrieveClassroom = async (secid, term="") => {
    const request = {
      cols: "e.id,s.lrn,s.name",
      table: "enrolldet e",
      order: "id",
      join: "left join student s on s.id=e.student",
      wc: `e.section=${secid}${term && " and s.name like '%"+term+"%' or s.lrn like '%"+term+"%'"}`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setclassroomData([...response["data"]]);
    }
  };

  useEffect(() => {
    retrieveSections();
    retrieveData();
  }, []);

  const handleOnEdit = (d) => {

  };

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveClassroom(selectedSection.id, e.target[0].value);
  };

  const handleOnDelete = async ({ id, subject }) => {
    if (window.confirm(`Delete ${subject}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=classroom&wc=id`)
        .catch((err) => {
          setLoading(false);
          console.debug("err", err);
          alert("error occured!");
        });
      if (response) {
        retrieveClassroom(selectedSection.id);
      }
    }
  };

  const handleOnSelectSection = ({id, grade, section, name}) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    retrieveClassroom(id);
  };

  const handleOnAddSubject = async({id, name}) => {
    //console.debug(d);
    setLoading(true);
    const a = { fn: `enrollStudent(${selectedSection.id},${id})` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save error occured!");
    });
    if (response["data"][0].res === 1) {
      setLoading(false);
      //alert("saved");
      //console.debug(response);
      retrieveClassroom(selectedSection.id);
    }else if (response["data"][0].res === 2) {
      setLoading(false);
      alert("cannot save "+name+" already exist!");
    }
  };

  return (
    <MyUI
      handleSearch={handleSearch}
      loading={loading}
      data={data}
      handleOnEdit={handleOnEdit}
      handleOnDelete={handleOnDelete}
      gradesectioncolumn={gradesectioncolumn}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      classroomdata={classroomdata}
      handleOnAddSubject={handleOnAddSubject}
    />
  );
}
