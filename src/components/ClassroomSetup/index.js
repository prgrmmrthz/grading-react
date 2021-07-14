import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import classroomapi from "../../api/classroom";
import MyUI from "./MyUI";

import { gradesectioncolumn } from "./columns";

export default function ClassroomSetup() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [classroomdata, setclassroomData] = useState([]);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const [formValues, setFormValues] = useState({});
  const [mode, setMode] = useState(1);

  const retrieveData = async (term = "") => {
    const request = {
      cols: "id,name",
      table: "subjects",
      order: "id asc",
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
      cols: "Distinct c.subject as subjectid, s.name as subject, s.code",
      table: "classroom c",
      order: "c.id desc",
      join: "left join subjects s on s.id=c.subject",
      wc: `c.section=${secid}${term && " and s.name like '%"+term+"%'"}`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request).catch((err) => {
      setLoading(false);
      alert("cannot save error occured!");
    });
    //console.log("response", response);
    if (response) {
      setLoading(false);
      setclassroomData([...response["data"]]);
    }
  };

  useEffect(() => {
    retrieveSections();
    retrieveData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveClassroom(selectedSection.id, e.target[0].value);
  };

  const handleOnDelete = async ({ id, subject, subjectid }) => {
    if (window.confirm(`Delete ${subject}?`)) {
      setLoading(true);
      const response = await classroomapi
        .delete(`/deleteBySubjSection?sec=${selectedSection.id}&subj=${subjectid}`)
        .catch((err) => {
          setLoading(false);
          console.debug("err", err);
          alert("error occured!");
        });
      if (response) {
        retrieveClassroom(selectedSection.id);
      }else{
        alert("cannot delete!");
      }
      setLoading(false);
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
    const a = { fn: `addSubjectToClassroom(${selectedSection.id},${id})` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      alert("cannot save error occured!");
    });
    if(response){
      if (response["data"][0].res > 1) {
        setLoading(false);
        //alert("saved");
        //console.debug(response);
        retrieveClassroom(selectedSection.id);
      }else if (response["data"][0].res === 0) {
        setLoading(false);
        alert("cannot save "+name+" already exist!");
      }
    }
  };

  return (
    <MyUI
      handleSearch={handleSearch}
      loading={loading}
      data={data}
      handleOnDelete={handleOnDelete}
      openModal={openModal}
      setOpenModal={setOpenModal}
      mode={mode}
      formValues={formValues}
      gradesectioncolumn={gradesectioncolumn}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      classroomdata={classroomdata}
      handleOnAddSubject={handleOnAddSubject}
    />
  );
}
