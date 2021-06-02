import { Card, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import MyTable from "../MyTable";
import MyModal from "../MyModal";
import SearchBar from "../SearchBar";
import MyForm from "./MyForm";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import MyDropDown from "../MyDropDown";

function filterBy(option, state) {
  if (state.selected.length) {
    return true;
  }
  return option.name.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
}

const ToggleButton = ({ isOpen, onClick }) => (
  <button
    className="toggle-button"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent input from losing focus.
      e.preventDefault();
    }}
  >
    {isOpen ? "▲" : "▼"}
  </button>
);

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
  refnum,
  supplierData,
  handleOnSelectProductToStock,
  headerStockIn,
  stockindata,
}) => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="fluid">
      <Card>
        <Card.Header>STOCK IN (RECIEVING) ENTRY</Card.Header>
        <Card.Body>
          <Card.Title>
            <p>
              REFERENCE#:
              <input
                type="text"
                value={refnum}
                disabled
                style={{ width: "500px" }}
              />
            </p>
            <Container>
              <Row>
                <Col>
                  <br />
                  <SearchBar
                    handleSearch={handleSearch}
                    placeholder="SEARCH PRODUCT | BARCODE"
                  />
                </Col>
              </Row>
            </Container>
          </Card.Title>
          <Card.Text>
            <Container fluid>
              <Row>
                <Col>
                  {loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <MyTable
                    header={header}
                    data={data}
                    handleOnEdit={handleOnSelectProductToStock}
                    handleOnDelete={handleOnDelete}
                    handleSort={handleSort}
                    showDelete={false}
                  />
                </Col>
                <Col xs={3}>
                  <MyDropDown options={supplierData} title="Supplier" />
                  <hr />
                  <MyForm
                    preloadedValues={formValues}
                    onSubmit={onSubmit}
                    loading={loading}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <MyTable
                    header={headerStockIn}
                    data={stockindata}
                    handleOnEdit={handleOnEdit}
                    handleOnDelete={handleOnDelete}
                    handleSort={handleSort}
                    showDelete={true}
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
