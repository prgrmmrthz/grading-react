import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import MyTable from "../MyTable";
import MyModal from "../MyModal";
import DateFromTo from "../DateFromTo";
import MyForm from "./MyForm";

const MyUI = ({
  onNew,
  handleSearch,
  loading,
  header,
  data,
  handleSort,
  handleOnEdit,
  openModal,
  setOpenModal,
  mode,
  formValues,
  onSubmit,
  handleOnDelete,
  handleSelection
}) => {
  return (
    <div>
      <Card>
        <Card.Header>STOCK ADJUSTED LIST</Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col md={4}>
                  <DateFromTo handleSelection={handleSelection} />
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                  {/* <Button
                    onClick={() => {
                      onNew();
                    }}
                    variant="primary"
                  >
                    Add Supplier
                  </Button> */}
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Text>
            {loading && (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <MyTable
              header={header}
              data={data}
              handleOnEdit={handleOnEdit}
              handleOnDelete={handleOnDelete}
              handleSort={handleSort}
            />
          </Card.Text>
        </Card.Body>
      </Card>

      <MyModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={mode === 1 ? "New" : "Edit"}
        size="sm"
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
