import React, { useState, useEffect, useMemo } from "react";

import api from "../../api/supplier";
import { columns } from "./columns";
import makeData from "./makeData";
import MyUI from "./MyUI";

export default function OthersGradingSheet() {
  const [loading, setLoading] = useState(false);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const [classroomdata, setclassroomData] = useState([]);
  const pcolumns = useMemo(() => columns, []);
  const [data, setdata] = useState([]);

  const retrieveSections = async (term = "") => {
    setLoading(true);
    const request = {
      cols: "id,grade,section,concat(grade, '-', section) as name",
      table: "grade_section",
      order: "id",
      join: "",
      wc: "",
      limit: "",
    };
    const response = await api
    .post("/getDataWithJoinClause", request)
    .catch((err) => {
      setLoading(false);
      console.debug("err", err);
      alert("error occured!");
    });
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      sectionsetData([...response["data"]]);
    }
  };

  const retrieveData = async (secid) => {
    const request = {
      cols: "g.id,s.name",
      table: "grading_sheet g",
      order: "s.name",
      join: "left join student s on s.id=g.student",
      wc: `g.section=${secid}`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setdata([...response["data"]]);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("sb-sidenav-toggled");
    retrieveSections();
  }, []);

  const handleOnSelectSection = ({ id, grade, section, name }) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    retrieveData(id);
  };

  return (
      <MyUI
      loading={loading}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      columns={pcolumns} data={data}
    ></MyUI>
  );
}
