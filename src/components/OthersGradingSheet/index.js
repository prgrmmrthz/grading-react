import React, { useState, useEffect, useMemo, useContext } from "react";

import api from "../../api/supplier";
import { columns } from "./columns";
import MyUI from "./MyUI";
import {GradingSheetContext} from '../../context/GradingSheetContext';

export default function OthersGradingSheet() {
  const [loading, setLoading] = useState(false);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const pcolumns = useMemo(() => columns, []);
  const {addData, emptyData} = useContext(GradingSheetContext);

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
    //setdata([]);
    setLoading(true);
    const requestStud = {
      cols: "distinct(s.name) as name, g.student",
      table: "grading_sheet g",
      order: "s.name",
      join: "left join student s on s.id=g.student",
      wc: `g.section=${secid}`,
      limit: "",
    };
    const {data: studentData} = await api.post("/getDataWithJoinClause", requestStud);
    const requestSubj = {
      cols: "distinct(sb.code) as name",
      table: "grading_sheet g",
      order: "sb.name",
      join: "left join subjects sb on sb.id=g.subject",
      wc: `g.section=${secid}`,
      limit: "",
    };
    const {data: subjectData} = await api.post("/getDataWithJoinClause", requestSubj);
    //console.log("response", studentData);
    studentData.forEach((v) => {
      let a = {};
      subjectData.forEach((s) => {
        a[s.name]=0;
      })
      addData({name: v.name, ...a});
    });
    setLoading(false);
  };

  useEffect(() => {
    document.body.classList.toggle("sb-sidenav-toggled");
    retrieveSections();
  }, []);

  const handleOnSelectSection = ({ id, grade, section, name }) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    emptyData();
    retrieveData(id);
  };

  return (
      <MyUI
      loading={loading}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      columns={pcolumns}
    ></MyUI>
  );
}
