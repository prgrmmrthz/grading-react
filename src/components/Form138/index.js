import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";
import { useHistory } from "react-router-dom";

import { gradesectioncolumn } from "./columns";

export default function Form138() {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [data, setData] = useState([]);
  const [genAve, setgenAve] = useState(0);
  const [gradedata, setgradeData] = useState([]);
  const [othergradedata, setothergradeData] = useState([]);
  const [attendancedata, setattendanceData] = useState([]);
  const [classroomdata, setclassroomData] = useState([]);
  const [sectiondata, sectionsetData] = useState([]);
  const [selectedSection, setselectedSection] = useState({});
  const [selectedStudent, setselectedStudent] = useState("");

  const retrieveSections = async (term = "") => {
    const request = {
      cols: "id,grade,section,concat(grade, '-', section) as name",
      table: "grade_section",
      order: "id",
      join: "",
      wc: "id in (select section from grading_sheet) and id in (select section from attendance_sheet)",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request).catch((err) => {
      setLoading(false);
      console.error('error', JSON.stringify(err.message));
      alert(JSON.stringify(err.message));
    });
    if (response) {
      if(response.data.length){
        sectionsetData([...response.data]);
      }else{
        alert('No attendance/grading sheet detected. Please fill up those sheets first!');
        history.push("/others-grading-sheet");
      }
      setLoading(false);
    }
  };

  const retrieveClassroom = async (secid, term = "") => {
    const request = {
      cols: "e.student as id,s.lrn,s.name,e.student,s.sex,s.birthday,s.age",
      table: "enrolldet e",
      order: "s.name asc",
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
    //retrieveData();
    if (selectedSection.id) {
      setdisabled(false);
    }
  }, [selectedSection]);

  const handleOnEdit = (d) => {};

  const handleSearch = (e) => {
    e.preventDefault();
    retrieveClassroom(selectedSection.id, e.target[0].value);
  };

  const handlePreview = async (d) => {
    //console.debug(d);
    const a = { fn: `getForm138Grades(${selectedSection.id},${d.id},1)` };
    const graderesponse = await api.post("/callSP", a).catch((err) => {
      setLoading(false);
      console.debug("err", JSON.stringify(err.message));
    });
    const b = { fn: `getForm138Grades(${selectedSection.id},${d.id},0)` };
    const othergraderesponse = await api.post("/callSP", b).catch((err) => {
      setLoading(false);
      console.debug("err", JSON.stringify(err.message));
    });
    const attendancerequest = {
      cols: "month,schooldays,daysofpresent",
      table: "viewattendancesheet",
      order: "name asc",
      join: "",
      wc: `studid=${d.id} and sectionid=${selectedSection.id} and sy_id=1`,
      limit: "",
    };
    const attendanceresponse = await api.post("/getDataWithJoinClause", attendancerequest).catch((err) => {
      setLoading(false);
      console.error('error', JSON.stringify(err.message));
      alert(JSON.stringify(err.message));
    });
    //console.log("response", response);
    if (graderesponse && attendanceresponse && othergraderesponse) {
      const a = graderesponse.data.map(v => {
        const fr = ((Number(v.Q1) + Number(v.Q2) + Number(v.Q3)+ Number(v.Q4)) / 4).toFixed(2);
        return {
          subj_name: v.subj_name,
          Q1: v.Q1,
          Q2: v.Q2,
          Q3: v.Q3,
          Q4: v.Q4,
          final_rating: fr,
          remarks: (fr>74.99) ? 'PASSED' : 'FAILED'
        }
      });
      const attendanceData = attendanceresponse.data.map(v => {
        return {
          month: v.month,
          schooldays: v.schooldays,
          daysofpresent: v.daysofpresent,
          absent: Number(v.schooldays) - Number(v.daysofpresent)
        }
      });
      const generalaverage = a.reduce((p,c) => {return p + Number(c.final_rating) }, 0) / a.length;
      setgenAve(generalaverage.toFixed(2));
      setselectedStudent(`${d.name} (${d.lrn})`);
      setgradeData([...a]);
      setattendanceData([...attendanceData]);
      setothergradeData([...othergraderesponse.data]);
      setOpenModal(true);
      setLoading(false);
    }
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
      if(response){
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
      disabled={disabled}
      openModal={openModal}
      setOpenModal={setOpenModal}
      handlePreview={handlePreview}
      gradedata={gradedata}
      attendancedata={attendancedata}
      selectedStudent={selectedStudent}
      othergradedata={othergradedata}
      genAve={genAve}
    />
  );
}
