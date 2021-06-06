import { useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import MyTable from "../MyTable";
import MyModal from "../MyModal";
import DateFromTo from "../DateFromTo";
import MyForm from "./MyForm";
import SearchBar from "../SearchBar";

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
  onPrint,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <div>
              <i className="mr-4"></i>Stock-In List
            </div>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => onPrint()}
                >
                  <i className="far fa-save mr-1"></i>Print
                </button>
              </div>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Container>
              <Row>
                <Col xs={2}>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() =>setShow(!show)}
                  >
                    <i className="far fa-save mr-1"></i>Select Date
                  </button>
                  {show && <DateFromTo handleSelection={handleSelection} />}
                </Col>
                <Col>
                  <SearchBar
                    handleSearch={handleSearch}
                    placeholder="SEARCH PRODUCT | BARCODE"
                  />
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
    </div>
  );
};

export default MyUI;
