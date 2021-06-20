import React, { useState, useEffect, useContext } from "react";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/supplier";
import MyUI from "./MyUI";
import { stockindatacolumn, stockinlistcolumn } from "./columns";
import { numberWithCommas } from "../../utils/format";

export default function StockInRecievingList() {
  const [auth] = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const header = [
    "reference_number",
    "supplier",
    "qty",
    "updated_At",
    "created_At",
    "remarks",
    "user",
    "status",
  ];
  const headerStockIn = ["product", "qty"];
  const [data, setData] = useState([]);
  const [stockindata, setstockindata] = useState([]);
  const [selectedStockInDetails, setselectedStockInDetails] = useState(null);
  const [formValues] = useState({});
  const [mode] = useState(1);
  const [filterDate, setFilterDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retrieveData = async (from, to, term) => {
    const a = ` and (si.reference_number like '%${term}%' or s.name like '%${term}%' or remarks like '%${term}%')`;
    const request = {
      cols:
        "si.id,si.reference_number,s.name as supplier,si.qty, si.createdAt,si.updatedAt,a.name as user,si.status,si.remarks,si.status",
      table: "stock_in si",
      order: "si.updatedAt desc",
      join:
        "left join suppliers s on s.id=si.supplier left join user a on a.id=si.user",
      wc:
        from && to
          ? `si.createdAt >= '${cd(from)}' and si.createdAt <= '${cd(
              to
            )}' and si.status>0${term ? a : ""}`
          : "DATE(si.createdAt) = CURDATE() and si.status=1",
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setData(response["data"]);
    }
  };

  const cd = (date) => {
    const a = date.getMonth() + 1;
    const b = date.getDate();
    return `${date.getFullYear()}-${a < 10 ? "0" + a : a}-${
      b < 10 ? "0" + b : b
    }`;
  };

  const retrieveStockInData = async (id) => {
    const request = {
      cols:
        "sd.id,sd.reference_number,p.name as product,sd.qty,p.barcode,p.qty as productqty ",
      table: "stock_in_det sd",
      order: "sd.updatedAt desc",
      join: "left join products p on p.id = sd.product",
      wc: `sd.stock_in_id=${id}`,
      limit: "",
    };
    const response = await api.post("/getDataWithJoinClause", request);
    //console.log("response", response);
    if (response["data"]) {
      setLoading(false);
      setstockindata(response["data"]);
    }
  };

  const handleOnEdit = ({
    id,
    reference_number,
    qty,
    createdAt,
    user,
    supplier,
  }) => {
    retrieveStockInData(id);
    setselectedStockInDetails({
      id,
      reference_number,
      qty,
      createdAt,
      user,
      supplier,
    });
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const { from, to } = filterDate;
    retrieveData(from, to, e.target[0].value);
  };

  const handleSelection = ({ startDate: f, endDate: t }) => {
    retrieveData(f, t);
    //console.debug(f);
  };

  const handleSort = (d) => {};

  const onSubmit = async ({ adjustqty, id, reason }, e) => {};

  const onPrint = () => {
    const dataPrint = data.map((v) => {
      const {
        reference_number,
        supplier,
        qty,
        createdAt,
        updatedAt,
        remarks,
        user,
        status,
      } = v;
      return {
        reference_number,
        supplier,
        qty: numberWithCommas(Number(qty)),
        createdAt: format(new Date(createdAt), "MM/dd/yyyy"),
        updatedAt: format(new Date(updatedAt), "MM/dd/yyyy"),
        remarks,
        user,
        status: status === 1 ? "Completed" : "Cancelled",
      };
    });
    var columns = [
      {
        title: "Ref#",
        dataKey: "reference_number",
      },
      {
        title: "Supplier",
        dataKey: "supplier",
      },
      {
        title: "QTY",
        dataKey: "qty",
      },
      {
        title: "Created At",
        dataKey: "createdAt",
      },
      {
        title: "Updated At",
        dataKey: "updatedAt",
      },
      {
        title: "Remarks",
        dataKey: "remarks",
      },
      {
        title: "User",
        dataKey: "user",
      },
      {
        title: "Status",
        dataKey: "status",
      },
    ];
    var doc = new jsPDF("p", "pt", "letter");
    var totalPagesExp = "{total_pages_count_string}";
    const { from, to } = filterDate;
    doc.autoTable(columns, dataPrint, {
      theme: "grid",
      startY: false, // false (indicates margin top value) or a number
      tableWidth: "auto", // 'auto', 'wrap' or a number
      showHead: "everyPage", // 'everyPage', 'firstPage', 'never'
      tableLineColor: 200, // number, array (see color section below)
      tableLineWidth: 0,
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fontStyle: "bold",
        halign: "center",
      },
      margin: { top: 160 },
      columnStyles: {
        qty: {
          halign: "center",
          fontStyle: "bold",
        },
        /*         totalrelease: {
          halign: 'right',
          columnWidth: 60
        } */
      },
      createdCell: function (cell, opts) {},
      didDrawPage: function (dataToPrint) {
        //console.debug(dataPrint);
        doc.setFontSize(14);
        doc.text(`STOCK IN LIST`, 40, 80);
        doc.setFontSize(10);
        doc.text(
          `Date: ${format(new Date(from), "MM/dd/yyyy")} - ${format(
            new Date(to),
            "MM/dd/yyyy"
          )}`,
          40,
          113
        );
        // FOOTER
        var str = "Page " + dataToPrint.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageHeight =
          doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        doc.text(
          "Printed By: " + auth.user,
          dataToPrint.settings.margin.right,
          pageHeight - 40
        );
        doc.setFontSize(8);
        doc.text(str, dataToPrint.settings.margin.right, pageHeight - 10);
      },
    });
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  };

  const onPrintStockInDetails = () => {
    const { qty, createdAt, user, supplier } = selectedStockInDetails;
    const dataPrint = stockindata.map((v) => {
      const { product, qty } = v;
      return {
        product,
        qty: numberWithCommas(Number(qty)),
      };
    });
    var columns = [
      { title: "Product", dataKey: "product" },
      { title: "Qty", dataKey: "qty" },
    ];
    var doc = new jsPDF("p", "pt", "letter");
    var totalPagesExp = "{total_pages_count_string}";
    doc.autoTable(columns, dataPrint, {
      theme: "grid",
      startY: false, // false (indicates margin top value) or a number
      tableWidth: "auto", // 'auto', 'wrap' or a number
      showHead: "everyPage", // 'everyPage', 'firstPage', 'never'
      tableLineColor: 200, // number, array (see color section below)
      tableLineWidth: 0,
      styles: {
        fontSize: 8,
      },
      headStyles: {
        fontStyle: "bold",
        halign: "center",
      },
      margin: { top: 160 },
      columnStyles: {
        qty: {
          halign: "center",
          fontStyle: "bold",
        },
        /*         totalrelease: {
          halign: 'right',
          columnWidth: 60
        } */
      },
      createdCell: function (cell, opts) {},
      didDrawPage: function (dataToPrint) {
        //console.debug(dataPrint);
        doc.setFontSize(14);
        doc.text(`STOCK IN / STOCK RECIEVING`, 40, 80);
        doc.setFontSize(10);
        doc.text(`Supplier: ${supplier}`, 40, 100);
        doc.setFontSize(10);
        doc.text(`Date: ${new Date(createdAt).toLocaleDateString()}`, 40, 113);
        doc.setFontSize(10);
        doc.text(`Total Stocks: ${numberWithCommas(Number(qty))}`, 40, 126);
        // FOOTER
        var str = "Page " + dataToPrint.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === "function") {
          str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        var pageHeight =
          doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        doc.text(
          "User: " + user,
          dataToPrint.settings.margin.right,
          pageHeight - 40
        );
        doc.setFontSize(8);
        doc.text(str, dataToPrint.settings.margin.right, pageHeight - 10);
      },
    });
    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPagesExp);
    }
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  };

  const onCancellTransaction = async () => {
    const cancelReason = prompt("Enter reason for cancelation");
    if (cancelReason) {

      setLoading(true);
      //stockinid int, p_user int, premarks text
      let p = `cancelStockin(${selectedStockInDetails.id},${auth.id},'${cancelReason}')`;
      const response = await api.post("/callSP", { fn: p }).catch((err) => {
        setLoading(false);
        alert("cannot save!");
      });
      if (response["data"][0].res === 1) {
        setLoading(false);
        alert("saved");
        console.debug(response);
        setOpenModal(false);
        retrieveData();
      } else {
        setLoading(false);
        alert("cannot save!");
      }
    } else {
      alert("input reason");
    }
  };

  return (
    <MyUI
      handleSearch={handleSearch}
      loading={loading}
      header={header}
      data={data}
      handleOnEdit={handleOnEdit}
      openModal={openModal}
      setOpenModal={setOpenModal}
      mode={mode}
      formValues={formValues}
      onSubmit={onSubmit}
      handleSort={handleSort}
      handleSelection={handleSelection}
      onPrint={onPrint}
      filterDate={filterDate}
      setFilterDate={setFilterDate}
      headerStockIn={headerStockIn}
      stockindata={stockindata}
      stockindatacolumn={stockindatacolumn}
      stockinlistcolumn={stockinlistcolumn}
      onPrintStockInDetails={onPrintStockInDetails}
      selectedStockInDetails={selectedStockInDetails}
      onCancellTransaction={onCancellTransaction}
    />
  );
}
