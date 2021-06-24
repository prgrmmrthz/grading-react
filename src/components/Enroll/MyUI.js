import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

import SearchBar from "../SearchBar";
import { MyTableV2 } from "../MyTableV2";
import MyDropDown from "../MyDropDown";

const MyUI = ({
  handleSearch,
  loading,
  data,
  handleOnEdit,
  handleOnDelete,
  gradesectioncolumn,
  sectiondata,
  selectedSection,
  handleOnSelectSection,
  classroomdata,
  handleOnAddSubject
}) => {
  return (
    <div>
      <Card>
        <Card.Header>Enrollment Form</Card.Header>
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
                      <div>
                        <span>
                          Select Student to enroll in this section
                        </span>
                        <MyDropDown
                          options={data}
                          handleOnSelect={handleOnAddSubject}
                          btnTitle="Add"
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
              <Row>
                <Col md={2}>

                </Col>
                <Col md={{ span: 6, offset: 4 }}>
                  <SearchBar
                    handleSearch={handleSearch}
                    placeholder="Search for Student | LRN"
                  />
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  {loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <span>List of Students enrolled in {selectedSection ? selectedSection.name : ""}</span>
                  <MyTableV2
                    pcolumns={[
                      ...gradesectioncolumn,
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
                              handleOnDelete(row.original);
                            }}
                          >
                            x
                          </button>
                        ),
                      },
                    ]}
                    pdata={classroomdata}
                    handleOnDblClick={handleOnEdit}
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
