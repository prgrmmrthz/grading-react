import { Card, Container, Row, Col, Spinner } from "react-bootstrap";
import MyTable from "../MyTable";
import MyModal from "../MyModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchBar from "../SearchBar";
import { MyTableV2 } from "../MyTableV2";

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
  setFilterDate,
  filterDate,
  headerStockIn,
  stockindata,
  stockindatacolumn,
  stockinlistcolumn,
}) => {
  return (
    <div>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <div>
              <i className="mr-4"></i> Adjusted Stocks
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
            <Container fluid>
              <Row>
                <Col>
                  Date:&nbsp;
                  <DatePicker
                    selected={filterDate.from}
                    onChange={(date) =>
                      setFilterDate({ ...filterDate, from: date })
                    }
                  />
                  &nbsp;
                  <DatePicker
                    selected={filterDate.to}
                    onChange={(date) =>
                      setFilterDate({ ...filterDate, to: date })
                    }
                  />
                </Col>
                <Col>
                  <SearchBar
                    handleSearch={handleSearch}
                    placeholder="SEARCH SUPPLIER | REFERENCE#"
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
                  {/* <MyTable
                    header={header}
                    data={data}
                    handleOnEdit={handleOnEdit}
                    handleOnDelete={handleOnDelete}
                    handleSort={handleSort}
                    showDelete={false}
                  />
                  <hr /> */}
                  <MyTableV2 pcolumns={stockinlistcolumn} pdata={data} handleOnDblClick={handleOnEdit} />
                </Col>
              </Row>
              <br />
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>

      <MyModal openModal={openModal} setOpenModal={setOpenModal} size="xl">
        <MyTableV2 pcolumns={stockindatacolumn} pdata={stockindata} />
      </MyModal>
    </div>
  );
};

export default MyUI;
