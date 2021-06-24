import React, { useState, useEffect } from "react";

import api from "../../api/supplier";
import MyUI from "./MyUI";

export default function GradingSheet() {
  const [loading, setLoading] = useState(false);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});

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

  useEffect(() => {
    retrieveSections();
  }, []);

  const handleOnSelectSection = ({ id, grade, section, name }) => {
    //console.debug(d);
    setselectedSection({ id, grade, section, name });
    //retrieveClassroom(id);
  };

  return (
    <MyUI
      loading={loading}
      sectiondata={sectiondata}
      selectedSection={selectedSection}
      handleOnSelectSection={handleOnSelectSection}
    ></MyUI>
  );
}
