import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";

import MyModal from "../MyModal";
import SearchBar from "../SearchBar";
import { MyTableV2 } from "../MyTableV2";
import MyDropDown from "../MyDropDown";
import { useState } from "react";

const MyUI = (props) => {
  const [gheader]= useState([
    { Header: "Subject", accessor: "subj_name" },
    { Header: "Q1", accessor: "Q1" },
    { Header: "Q2", accessor: "Q2" },
    { Header: "Q3", accessor: "Q3" },
    { Header: "Q4", accessor: "Q4" }
  ]);
  return (
    <div>
      <Card>
        <Card.Header>Generate Form 138</Card.Header>
        <Card.Body>
          <Card.Title>
            <Container fluid>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <div>
                        <span>
                          Grade & Section:{" "}
                          {props.selectedSection
                            ? props.selectedSection.name
                            : ""}
                        </span>
                        <MyDropDown
                          options={props.sectiondata}
                          handleOnSelect={props.handleOnSelectSection}
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
            <Container>
              <br />
              <Row>
                <Col md={2}></Col>
                <Col md={{ span: 6, offset: 4 }}>
                  <SearchBar
                    handleSearch={props.handleSearch}
                    placeholder="Search for Student | LRN"
                  />
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  {props.loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <span>
                    List of Students enrolled in{" "}
                    {props.selectedSection ? props.selectedSection.name : ""}
                  </span>
                  <MyTableV2
                    pcolumns={[
                      ...props.gradesectioncolumn,
                      {
                        Header: () => (
                          <div
                            style={{
                              width: 5,
                            }}
                          ></div>
                        ),
                        id: "view",
                        accessor: (str) => "view",
                        Cell: ({ row }) => (
                          <Button
                            variant="link"
                            onClick={() => {
                              props.handlePreview(row.original);
                            }}
                          >
                            view
                          </Button>
                        ),
                      },
                    ]}
                    pdata={props.classroomdata}
                    handleOnDblClick={props.handleOnEdit}
                  />
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>

      <MyModal
        openModal={props.openModal}
        setOpenModal={props.setOpenModal}
        title={props.selectedStudent}
        size="xl"
      >
        <div className="d-flex justify-content-center">
          <div className="p-4">
            <span>List of Grades</span>
            <MyTableV2
              pcolumns={[...gheader,
                { Header: "Final Rating", accessor: "final_rating" },
                { Header: "Remarks", accessor: "remarks" }
              ]}
              pdata={props.gradedata}
            />
            <span>General Average: {props.genAve}</span>
          </div>
          <div className="p-4">
            <span>Other Grades</span>
            <MyTableV2
              pcolumns={gheader}
              pdata={props.othergradedata}
            />
          </div>
          <div className="p-4">
            <span>List of Attendance</span>
            <MyTableV2
              pcolumns={[
                { Header: "Month", accessor: "month" },
                { Header: "Days", accessor: "schooldays" },
                { Header: "Present", accessor: "daysofpresent" },
                { Header: "Absent", accessor: "absent" }
              ]}
              pdata={props.attendancedata}
            />
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default MyUI;
