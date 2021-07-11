import React, { useState, useEffect, useMemo, useContext } from "react";

import api from "../../api/supplier";
import { columns } from "./columns";
import MyUI from "./MyUI";
import { AttendanceSheetContext } from "../../context/AttendanceSheetContext";

export default function AttendanceSheet() {
  const [loading, setLoading] = useState(false);
  const [sectiondata, sectionsetData] = useState([]);
  const [subjdata, subjsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const pcolumns = useMemo(() => columns, []);
  const { emptyData, setData } = useContext(AttendanceSheetContext);

  const retrieveSections = async (term = "") => {
    setLoading(true);
    const request = {
      cols: "id,grade,section,concat(grade, '-', section) as name",
      table: "grade_section",
      order: "id",
      join: "",
      wc: "id in (select section from classroom) and id in (select section from enrolldet)",
      limit: "",
    };
    const response = await api
      .post("/getDataWithJoinClause", request)
      .catch((err) => {
        setLoading(false);
        console.debug("err", err);
        alert(JSON.stringify(err.message));
      });
    //console.log("response", response);
    if (response) {
      setLoading(false);
      sectionsetData([...response["data"]]);
    }
  };

  const handlePlotGrade = async ({ subj, score, studid }) => {
    //setLoading(true);
    const { id: sec } = selectedSection;
    const { id: subjId } = subjdata.find((v) => {
      return v.code === subj;
    });
    //console.debug('subjid', subjId);
    //psec int, pstud int, psubj int, pscore text
    const a = { fn: `updateGrade(${sec},${studid},${subjId},'${score}')` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      console.debug("err", JSON.stringify(err.message));
    });
    if (response) {
      setLoading(false);
      console.debug("resp", response.data[0].res);
      //console.debug(response);
      //retrieveClassroom(selectedSection.id);
    }
  };

  const retrieveSheet = async (secid) => {
    //setLoading(true);
    const a = { fn: `getAttendanceSheet(${secid})` };
    const response = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      console.debug("err", JSON.stringify(err.message));
    });
    if (response) {
      //console.debug("resp", response.data);
      setData([...response.data]);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("sb-sidenav-toggled");
    retrieveSections();
    return () => {
      emptyData();
    };
  }, []);

  const handleOnSelectSection = ({ id, grade, section, name }) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    emptyData();
    retrieveSheet(id);
  };

  return (
    <MyUI
      loading={loading}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      columns={pcolumns}
      handlePlotGrade={handlePlotGrade}
    ></MyUI>
  );
}
