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
    if (response) {
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
    const response = await api.post(
      "/getDataWithJoinClause",
      request
    ).catch((err) => {
      setLoading(false);
      console.error('error', JSON.stringify(err.message));
      alert(JSON.stringify(err.message));
    });
    //console.log("response", response);
    if (response) {
      setData([...response["data"]]);
      setLoading(false);
    }
  };

  const retrieveSections = async (term = "") => {
    const request = {
      cols: "id,grade,section,concat(grade, '-', section) as name",
      table: "grade_section",
      order: "id",
      join: "",
      wc: "id in (select section from classroom)",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request).catch((err) => {
      setLoading(false);
      console.error('error', JSON.stringify(err.message));
      alert(JSON.stringify(err.message));
    });
    if (response) {
      setLoading(false);
      sectionsetData([...response.data]);
    }
  };

  const retrieveClassroom = async (secid, term = "") => {
    const request = {
      cols: "e.id,s.lrn,s.name,e.student",
      table: "enrolldet e",
      order: "e.updatedAt desc",
      join: "left join student s on s.id=e.student",
      wc: `e.section=${secid}${
        term &&
        " and s.name like '%" + term + "%' or s.lrn like '%" + term + "%'"
      }`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request).catch((err) => {
      setLoading(false);
      console.error('error', JSON.stringify(err.message));
      alert(JSON.stringify(err.message));
    });
    //console.log("response", response);
    if (response) {
      setLoading(false);
      setclassroomData([...response.data]);
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

  const handleOnDelete = async ({ student, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      setLoading(true);
      const a = { fn: `unenroll(${student},${selectedSection.id})` };
      const {data: unenrollRes} = await api.post("/callSP", a).catch((err) => {
        setLoading(false);
        alert("cannot save error occured!");
      });
      if (unenrollRes) {
        if(unenrollRes[0].res > 0){
          setLoading(false);
          alert("saved");
          //console.debug(response);
          retrieveClassroom(selectedSection.id);
        }
      }else{
        setLoading(false);
        alert("cannot unenroll!");
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
