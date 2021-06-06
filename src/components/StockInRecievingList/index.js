import React, { useState, useEffect } from "react";
import api from "../../api/supplier";
import MyUI from "./MyUI";
var jsPDF = require("jspdf");
require("jspdf-autotable");

export default function StockInRecievingList() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAsc, setIsAsc] = useState(false);
  const header = ["id", "product", "unit", "qty", "reason", "date", "adjustedBy"];
  const [data, setData] = useState([]);
  const [formValues] = useState({});
  const [mode] = useState(1);

  const retrieveData = async (from, to) => {
    const request = {
      cols:
        "sa.id,p.name as product,u.name as unit,sa.adjust_qty as qty,sa.reason,DATE_FORMAT(sa.updatedAt,'%m-%d-%Y') as date, a.name as adjustedBy",
      table: "stock_adjustment sa",
      order: "sa.updatedAt desc",
      join:
        "left join products p on p.id=sa.product left join units u on u.id=p.unit left join user a on a.id=sa.user",
      wc:
        from && to
          ? `sa.updatedAt >= '${cd(from)}' and sa.updatedAt <= '${cd(to)}'`
          : "DATE(sa.updatedAt) = CURDATE()",
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
  }, []);

  const handleOnEdit = (d) => {};

  const handleSearch = (e) => {

  };

  const handleSelection = ({ startDate: f, endDate: t }) => {
    retrieveData(f, t);
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
        var pageHeight =
          doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
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
    />
  );
}
