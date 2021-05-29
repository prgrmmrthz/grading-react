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
  handleSelection,
  onPrint
}) => {
  return (
    <div>
      <Card>
        <Card.Header>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div><i class="fas fa-cash-register mr-4"></i> Adjusted Stocks</div>
            <div class="btn-toolbar mb-2 mb-md-0">

              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-success" onClick={()=>onPrint()}>
                  <i class="far fa-save mr-1"></i>Print
                </button>
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col>
                  <DateFromTo handleSelection={handleSelection} />
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
              showDelete={false}
            />
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
