import React, { useState, useEffect, useMemo, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/supplier";
import { columns } from "./columns";
import MyUI from "./MyUI";
import { GradingSheetContext } from "../../context/GradingSheetContext";

export default function OthersGradingSheet() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sectiondata, sectionsetData] = useState([]);
  const [subjdata, subjsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const pcolumns = useMemo(() => columns, []);
  const { emptyData, setData } = useContext(GradingSheetContext);

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
      if(response.data.length){
        sectionsetData([...response["data"]]);
      }else{
        alert('No Classroom Set up / Enrollment detected! Please configure classroom / enroll student first!');
        history.push("/enroll");
      }
    }
    setLoading(false);
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

  const retrieveGradingSheet = async (secid) => {
    //setLoading(true);
    const a = { fn: `getGradingSheet(${secid})` };
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

  const retrieveData = async (secid) => {
    //setdata([]);
    setLoading(true);
    const requestSubj = {
      cols: "distinct(sb.code) as name, sb.name as subjName, g.subject",
      table: "classroom g",
      order: "sb.name",
      join: "left join subjects sb on sb.id=g.subject",
      wc: `g.section=${secid}`,
      limit: "",
    };
    const subjResp = await api
      .post("/getDataWithJoinClause", requestSubj)
      .catch((err) => {
        setLoading(false);
        console.debug("err", err);
        alert(JSON.stringify(err.message));
      });
    if (subjResp) {
      const a = subjResp.data.map((v) => {
        return { id: v.subject, code: v.name, name: v.subjName };
      });
      subjsetData([...a]);
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
    retrieveData(id);
    retrieveGradingSheet(id);
  };

  return (
    <MyUI
      loading={loading}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
      columns={pcolumns}
      subjdata={subjdata}
      handlePlotGrade={handlePlotGrade}
    ></MyUI>
  );
}
