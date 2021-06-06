import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import MyTable from "../MyTable";
import SearchBar from "../SearchBar";
import MyForm from "./MyForm";
import MyDropDown from "../MyDropDown";

const MyUI = ({
  handleSearch,
  loading,
  header,
  data,
  handleSort,
  mode,
  formValues,
  onSubmit,
  handleOnDelete,
  refnum,
  supplierData,
  handleOnSelectProductToStock,
  headerStockIn,
  stockindata,
  handleOnSelectStock,
  handleOnSelectSupplier,
  selectedSupplier,
  remarks,
  setRemarks,
  onSaveStockInTran
}) => {
  return (
    <div className="fluid">
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <div>
              <i className="mr-4"></i>STOCK IN (RECIEVING) ENTRY
            </div>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <button className="btn btn-sm btn-success" disabled={!remarks && !selectedSupplier} onClick={() => onSaveStockInTran()}>
                  <i className="far fa-save mr-1"></i>Save
                </button>
              </div>
            </div>
          </div>
        </Card.Header>
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
            <Container fluid>
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
                  <div>
                    Remarks:{" "}
                    <input
                      onBlur={(e)=>setRemarks(e.target.value)}
                      type="text"
                      placeholder="input remarks"
                      style={{ width: "300px" }}
                    />
                  </div>
                  <div>
                    Supplier: {selectedSupplier ? selectedSupplier.name : ""}
                  </div>
                  <MyDropDown
                    options={supplierData}
                    handleOnSelect={handleOnSelectSupplier}
                  />
                  <hr />
                  <MyForm
                    preloadedValues={formValues}
                    onSubmit={onSubmit}
                    loading={loading}
                    mode={mode}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <MyTable
                    header={headerStockIn}
                    data={stockindata}
                    handleOnEdit={handleOnSelectStock}
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
