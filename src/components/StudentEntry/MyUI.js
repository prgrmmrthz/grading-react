import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import MyModal from "../MyModal";
import SearchBar from "../SearchBar";
import MyForm from "./MyForm";
import { MyTableV2 } from "../MyTableV2";

const MyUI = ({
  onNew,
  handleSearch,
  loading,
  data,
  handleOnEdit,
  openModal,
  setOpenModal,
  mode,
  formValues,
  onSubmit,
  handleOnDelete,
  gradesectioncolumn,
}) => {
  return (
    <div>
      <Card>
        <Card.Header>Student Master List</Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col md={4}>
                  <Button
                    onClick={() => {
                      onNew();
                    }}
                    variant="primary"
                  >
                    Add
                  </Button>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                  <SearchBar
                    handleSearch={handleSearch}
                    placeholder="Name | LRN | Grade | Section"
                  />
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Text>
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col>
                  {loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
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
                    pdata={data}
                    handleOnDblClick={handleOnEdit}
                  />
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>

      <MyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={mode === 1 ? "New" : "Edit"}
        size="md"
      >
        <MyForm
          preloadedValues={formValues}
          onSubmit={onSubmit}
          loading={loading}
        />
      </MyModal>
    </div>
  );
};

export default MyUI;
