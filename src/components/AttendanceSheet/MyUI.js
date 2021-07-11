import { useContext, useEffect, useState } from "react";
import { Card, Row, Container, Col, Spinner } from "react-bootstrap";
import { AttendanceSheetContext } from "../../context/AttendanceSheetContext";
import MyDropDown from "../MyDropDown";
import { MyTableV3 } from "../MyTableV3";

const MyUI = ({
  sectiondata,
  selectedSection,
  handleOnSelectSection,
  loading,
  columns,
  handlePlotGrade
}) => {
  const [data, setData] = useState([]);
  const { attendanceSheetData } = useContext(AttendanceSheetContext);
  const [nCol, setCol] = useState(columns);
  const [nLoadingColumns, setLoadingColumns] = useState(false);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    setSkipPageReset(false);
    setData(attendanceSheetData);
    setLoadingColumns(true);
    if (attendanceSheetData.length > 0) {
      const col = Object.keys(attendanceSheetData[0]).map((v) => {
        return { Header: v, accessor: v, sticky: v === "name" ? "left" : "" };
      });
      setCol(col);
      setLoadingColumns(false);
    } else {
      setCol(columns);
      setLoadingColumns(false);
    }
    //map(v => { return {Header: v, accessor: v}})
    //const objKeys = await attendanceSheetData;
    //console.debug(await Object.keys(objKeys[0]));
  }, [attendanceSheetData]);

  const updateMyData = (rowIndex, columnId, value, {studid}) => {
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
    //console.debug({columnId, value, studid});
    const a = {subj: columnId, score: value, studid};
    //handlePlotGrade(a);
  };

  return (
    <div>
      <Card>
        <Card.Header>Attendance Sheet</Card.Header>
        <Card.Body>
          <Card.Title>
            <Container fluid>
              <Card>
                <Card.Body>
                  {loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <Row>
                    <Col>
                      <div>
                        <span>
                          Select grade and section:{" "}
                          {selectedSection ? selectedSection.name : ""}
                        </span>
                        <MyDropDown
                          options={sectiondata}
                          handleOnSelect={handleOnSelectSection}
                          btnTitle="Change"
                        />
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br />
            </Container>
          </Card.Title>
          <Card.Text>
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col>
                  <span>
                    List of Students enrolled in{" "}
                    {selectedSection ? selectedSection.name : ""}
                  </span>
                  {nLoadingColumns && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <MyTableV3
                    data={data}
                    columns={[
                      ...nCol
                    ]}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                  />
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyUI;
