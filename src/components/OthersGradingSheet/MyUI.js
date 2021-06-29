import { useContext, useEffect, useState } from "react";
import { Card, Row, Container, Col, Spinner, ListGroup } from "react-bootstrap";
import { GradingSheetContext } from "../../context/GradingSheetContext";
import MyDropDown from "../MyDropDown";
import { MyTableV3 } from "../MyTableV3";

const MyUI = ({
  sectiondata,
  selectedSection,
  handleOnSelectSection,
  loading,
  columns,
  subjdata,
  handlePlotGrade
}) => {
  const [data, setData] = useState([]);
  const { gradingData } = useContext(GradingSheetContext);
  const [nCol, setCol] = useState(columns);
  const [nLoadingColumns, setLoadingColumns] = useState(false);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    setSkipPageReset(false);
    setData(gradingData);
    setLoadingColumns(true);
    if (gradingData.length > 0) {
      const col = Object.keys(gradingData[0]).map((v) => {
        return { Header: v, accessor: v, sticky: v === "name" ? "left" : "" };
      });
      setCol(col);
      setLoadingColumns(false);
    } else {
      setCol(columns);
      setLoadingColumns(false);
    }
    //map(v => { return {Header: v, accessor: v}})
    //const objKeys = await gradingData;
    //console.debug(await Object.keys(objKeys[0]));
  }, [gradingData]);

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
    handlePlotGrade(a);
  };

  return (
    <div>
      <Card>
        <Card.Header>Grading Sheet</Card.Header>
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
                    <Col md={2}>
                      <div>
                        <span>
                          Grade & Section:{" "}
                          {selectedSection ? selectedSection.name : ""}
                        </span>
                        <MyDropDown
                          options={sectiondata}
                          handleOnSelect={handleOnSelectSection}
                          btnTitle="Change"
                        />
                      </div>
                    </Col>
                    <Col>
                      {subjdata.map((v) => (
                        <div className="d-inline-flex p-2">
                          <small className="font-weight-bold">{v.code}</small> - <small className="font-italic">{v.name}</small>
                        </div>
                      ))}
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
                      ...nCol,
                      {
                        Header: () => (
                          <div
                            style={{
                              width: 5,
                            }}
                          ></div>
                        ),
                        id: "delete",
                        accessor: (str) => "delete",
                        Cell: ({ row }) => (
                          <button
                            onClick={() => {
                              //console.debug('to del', row.original.id);
                              //data.splice(row.index, 1)
                              console.debug(row.original);
                            }}
                          >
                            save
                          </button>
                        ),
                      },
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
