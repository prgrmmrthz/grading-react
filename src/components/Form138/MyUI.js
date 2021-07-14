import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";

import MyModal from "../MyModal";
import SearchBar from "../SearchBar";
import { MyTableV2 } from "../MyTableV2";
import MyDropDown from "../MyDropDown";

const MyUI = (props) => {
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
        title={"Grade Preview for "+props.selectedStudent}
        size="lg"
      >
        <div className="d-flex justify-content-center">
          <div className="p-4">
            <span>List of Grades</span>
            <MyTableV2
              pcolumns={[
                { Header: "Subject", accessor: "subjectname" },
                { Header: "Score", accessor: "score" },
              ]}
              pdata={props.gradedata}
            />
          </div>
          <div className="p-4">
            <span>List of Attendance</span>
            <MyTableV2
              pcolumns={[
                { Header: "Month", accessor: "month" },
                { Header: "Present", accessor: "daysofpresent" },
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
