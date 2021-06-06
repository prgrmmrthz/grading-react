import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";
var jsPDF = require("jspdf");
require("jspdf-autotable");

export default function StockInRecievingList() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const header = ['reference_number','supplier','qty','updatedAt','createdAt','remarks','user'];
  const [data, setData] = useState([]);
  const [formValues] = useState({});
  const [mode] = useState(1);
  const [filterDate, setFilterDate] = useState({from: new Date(), to: new Date()});

  const retrieveData = async (from, to) => {
    const request = {
      cols:
        "si.reference_number,s.name as supplier,si.qty,si.createdAt,si.updatedAt,a.name as user,si.status,si.remarks",
      table: "stock_in si",
      order: "si.updatedAt desc",
      join:
        "left join suppliers s on s.id=si.supplier left join user a on a.id=si.user",
      wc:
        from && to
          ? `si.createdAt >= '${cd(from)}' and si.createdAt <= '${cd(to)}'`
          : "DATE(si.createdAt) = CURDATE()",
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

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEdit = (d) => {};

  const handleSearch = (e) => {
    e.preventDefault();
    const {from,to} = filterDate;
    retrieveData(from,to);
  };

  const handleSelection = ({ startDate: f, endDate: t }) => {
    retrieveData(f, t);
    //console.debug(f);
  };

  const handleSort = () => {
    const a = data.sort((a, b) => {
      setIsAsc(!isAsc);
      var nameA = a.product.toUpperCase(); // ignore upper and lowercase
      var nameB = b.product.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return isAsc ? -1 : 1;
      }
      if (nameA > nameB) {
        return isAsc ? 1 : -1;
      }

      // names must be equal
      return 0;
    });
    //sconsole.debug(a);
    setData([...a]);
  };

  const onSubmit = async ({ adjustqty, id, reason }, e) => {};

  const onPrint = () => {
    const dataPrint = data.map((v) => {
      const { id, product, unit, qty, reason, date, adjustedBy } = v;
      return {
        id,
        product,
        unit,
        qty,
        reason,
        date,
        adjustedBy
      };
    });
    var columns = [
      { title: "Tran#", dataKey: "id" },
      { title: "Product", dataKey: "product" },
      { title: "Unit", dataKey: "unit" },
      { title: "Qty", dataKey: "qty" },
      { title: "Reason", dataKey: "reason" },
      { title: "Date", dataKey: "date" },
      { title: "Adjusted By", dataKey: "adjustedBy" },
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
        ordertotal: {
          halign: "right",
          fontStyle: "bold",
        },
        id: {
          halign: "center",
          columnWidth: 40,
        },
        /*         totalrelease: {
          halign: 'right',
          columnWidth: 60
        } */
      },
      didDrawPage: function (dataToPrint) {
        //console.debug(dataPrint);
        doc.setFontSize(18);
        doc.text(`Adjusted Stocks Report`, 40, 80);
        doc.setFontSize(12);
        doc.text(`Date Printed: ${new Date().toLocaleDateString()}`, 40, 100);
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
          "Printed by: AAA ",
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
    />
  );
}
