import { Card, Row, Container, Col, Spinner } from "react-bootstrap";
import MyDropDown from "../MyDropDown";

const MyUI = ({
  sectiondata,
  selectedSection,
  handleOnSelectSection,
  loading
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyUI;
