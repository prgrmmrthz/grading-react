import { Card, Row, Container, Col, Spinner } from "react-bootstrap";
import MyDropDown from "../MyDropDown";
import { MyTableV3 } from "../MyTableV3";

const MyUI = ({
  sectiondata,
  selectedSection,
  handleOnSelectSection,
  loading,
  columns,
  data
}) => {
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
                  <MyTableV3 columns={[
                    ...columns,
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
                    ]} data={data}/>
                  {/* <MyTableV2
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
                  /> */}
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
