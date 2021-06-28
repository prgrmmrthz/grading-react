import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";

import { gradesectioncolumn } from "./columns";
const SEARCH_URI = "https://api.github.com/search/users";

export default function Enroll() {
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
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

  const handleSearchAsync = async (query) => {
    setLoading(true);
    const request = {
      cols: "id,name,lrn",
      table: "student",
      order: "id asc",
      join: "",
      wc: `name like '%${query}%' or lrn='${query}'`,
      limit: "0, 10",
    };
    const { data: studentData } = await api.post(
      "/getDataWithJoinClause",
      request
    );
    //console.log("response", response);
    if (studentData) {
      setData(studentData);
      setLoading(false);
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

  const retrieveClassroom = async (secid, term = "") => {
    const request = {
      cols: "e.id,s.lrn,s.name",
      table: "enrolldet e",
      order: "e.updatedAt desc",
      join: "left join student s on s.id=e.student",
      wc: `e.section=${secid}${
        term &&
        " and s.name like '%" + term + "%' or s.lrn like '%" + term + "%'"
      }`,
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
    if (selectedSection.id) {
      setdisabled(false);
    }
  }, [selectedSection]);

  const handleOnEdit = (d) => {};

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveClassroom(selectedSection.id, e.target[0].value);
  };

  const handleOnDelete = async ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      setLoading(true);
      const response = await api
        .delete(`/Delete?id=${id}&table=enrolldet&wc=id`)
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

  const handleOnSelectSection = ({ id, grade, section, name }) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    retrieveClassroom(id);
  };

  const handleOnAddSubject = async (data) => {
    //console.debug(d);
    if (data) {
      const { id, name } = data[0];
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
      } else if (response["data"][0].res === 2) {
        setLoading(false);
        alert("cannot save " + name + " already exist!");
      }
    }
    console.debug(data);
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
      handleSearchAsync={handleSearchAsync}
      disabled={disabled}
    />
  );
}
