/*
Advanced AG Grid React Example
File: AdvancedAgGrid.jsx

Features included:
- AG Grid v32+ module registration
- Rich sample data (orders with many fields)
- Column groups, sorting, filtering, floating filters
- Pagination, quick filter (global search)
- Row selection (checkbox)
- Inline editing for some fields
- Custom cell renderers: status badge, currency formatting, actions
- CSV export button
- Column resizing, reordering, pinned column
- Example of server-side style: simulated large data + virtualization via default
- Tailwind UI for toolbar and layout (no Tailwind imports required here — assumes project uses Tailwind)

Install:
npm install ag-grid-community ag-grid-react

Usage: drop this file into your React project and import/render <AdvancedAgGrid />
*/

import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

// AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Register modules for AG Grid v32+
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// Helper: sample data generator
const makeSampleOrders = (count = 100) => {
  const products = [
    "Mutton Curry",
    "Perfume - Noir",
    "Pizza Margherita",
    "Burger Classic",
    "Pepsi Can",
    "Fanta",
    "Lab Test A",
    "Subscription",
  ];
  const regions = ["Sikar", "Jaipur", "Delhi", "Mumbai", "Bengaluru"];
  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  const customers = [
    "Aman Sharma",
    "Rohit Verma",
    "Priya Singh",
    "Kavita Joshi",
    "Vikram Rathore",
    "Washid Chouhan",
    "Neha Gupta",
    "Saurabh Jain",
  ];

  const rows = [];
  for (let i = 1; i <= count; i++) {
    const qty = Math.floor(Math.random() * 7) + 1;
    const price = Math.floor(Math.random() * 900 + 50);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const cust = customers[Math.floor(Math.random() * customers.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const daysAgo = Math.floor(Math.random() * 60);
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - daysAgo);

    rows.push({
      orderId: `ORD-${1000 + i}`,
      customerName: cust,
      email: `${cust.split(" ")[0].toLowerCase()}@example.com`,
      product,
      quantity: qty,
      unitPrice: price,
      total: qty * price,
      status,
      orderDate: orderDate.toISOString().split("T")[0],
      shipped: status === "Shipped" || status === "Delivered",
      region,
      notes: Math.random() > 0.85 ? "Priority" : "",
    });
  }
  return rows;
};

// Custom Status Cell Renderer
const StatusBadge = (props) => {
  const val = props.value;
  const base =
    "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium";
  const map = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-indigo-100 text-indigo-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  const cls = map[val] || "bg-gray-100 text-gray-800";
  return <span className={`${base} ${cls}`}>{val}</span>;
};

// Currency Formatter
const currencyFormatter = (params) => {
  if (params.value == null) return "";
  return "₹" + Number(params.value).toLocaleString("en-IN");
};

// Date Formatter
const dateFormatter = (params) => {
  if (!params.value) return "";
  return new Date(params.value).toLocaleDateString("en-IN");
};

export default function AdvancedAgGrid() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [quickFilter, setQuickFilter] = useState("");
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // Simulate fetch
    const data = makeSampleOrders(200);
    setRowData(data);
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "Order",
        field: "orderId",
        pinned: "left",
        checkboxSelection: true,
        headerCheckboxSelection: true,
        minWidth: 120,
      },
      {
        headerName: "Customer",
        field: "customerName",
        sortable: true,
        filter: true,
        minWidth: 160,
        tooltipField: "customerName",
      },
      {
        headerName: "Email",
        field: "email",
        minWidth: 200,
        filter: "agTextColumnFilter",
        sortable: true,
      },
      { headerName: "Product", field: "product", minWidth: 180, filter: true },
      {
        headerName: "Qty",
        field: "quantity",
        width: 90,
        editable: true,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Unit Price",
        field: "unitPrice",
        valueFormatter: currencyFormatter,
        width: 120,
        filter: "agNumberColumnFilter",
      },
      {
        headerName: "Total",
        field: "total",
        valueFormatter: currencyFormatter,
        sortable: true,
        width: 120,
        aggFunc: "sum",
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: "statusRenderer",
        filter: true,
        minWidth: 140,
        floatingFilter: true,
      },
      {
        headerName: "Order Date",
        field: "orderDate",
        valueFormatter: dateFormatter,
        filter: "agDateColumnFilter",
        minWidth: 140,
      },
      { headerName: "Region", field: "region", filter: true, minWidth: 120 },
      {
        headerName: "Shipped",
        field: "shipped",
        width: 100,
        cellRenderer: (p) => (p.value ? "✅" : "—"),
      },
      { headerName: "Notes", field: "notes", editable: true, minWidth: 140 },
      {
        headerName: "Actions",
        field: "actions",
        pinned: "right",
        cellRenderer: (params) => {
          const id = params.data?.orderId;
          return (
            <div className="flex gap-2">
              <button
                className="px-2 py-1 rounded text-sm border"
                onClick={() => alert(`Edit ${id}`)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 rounded text-sm border text-red-600"
                onClick={() => {
                  if (confirm(`Delete ${id}?`)) {
                    const updated = gridRef.current.api.applyTransaction({
                      remove: [params.data],
                    });
                  }
                }}
              >
                Delete
              </button>
            </div>
          );
        },
        width: 160,
      },
    ],
    []
  );

  const frameworkComponents = useMemo(
    () => ({ statusRenderer: StatusBadge }),
    []
  );

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      minWidth: 100,
      flex: 1,
      floatingFilter: true,
      filter: true,
    }),
    []
  );

  const onExport = () => {
    gridRef.current.api.exportDataAsCsv({
      fileName: `orders_export_${new Date().toISOString().slice(0, 10)}.csv`,
    });
  };

  const onSelectionChanged = () => {
    const selected = gridRef.current.api.getSelectedRows();
    // You can use selected rows for bulk actions
    // console.log('selected', selected);
  };

  const onPageSizeChange = (e) => {
    const val = Number(e.target.value);
    setPageSize(val);
    gridRef.current.api.paginationSetPageSize(val);
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">Orders Dashboard</h2>
            <p className="text-sm text-gray-500">
              Advanced AG Grid example with many features
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3">
            <input
              className="border rounded px-3 py-2 text-sm"
              placeholder="Search (quick filter)"
              value={quickFilter}
              onChange={(e) => {
                setQuickFilter(e.target.value);
                gridRef.current.api.setQuickFilter(e.target.value);
              }}
            />

            <select
              value={pageSize}
              onChange={onPageSizeChange}
              className="border rounded px-2 py-2 text-sm"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <button
              onClick={onExport}
              className="bg-indigo-600 text-white px-3 py-2 rounded text-sm"
            >
              Export CSV
            </button>

            <button
              onClick={() => gridRef.current.api.sizeColumnsToFit()}
              className="border rounded px-3 py-2 text-sm"
            >
              Fit Columns
            </button>
          </div>
        </div>

        {/* Grid */}
        <div
          className="ag-theme-alpine"
          style={{ height: "600px", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            frameworkComponents={frameworkComponents}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={pageSize}
            rowSelection={"multiple"}
            onSelectionChanged={onSelectionChanged}
            animateRows={true}
            suppressRowClickSelection={true}
            enableRangeSelection={true}
            allowContextMenuWithControlKey={true}
            domLayout={"normal"}
            onGridReady={(params) => {
              params.api.sizeColumnsToFit();
            }}
          />
        </div>

        {/* Footer / small notes */}
        <div className="p-3 text-xs text-gray-500 border-t">
          You can edit Qty & Notes inline. Select rows using checkboxes for bulk
          actions. Try sorting and filtering on different columns.
        </div>
      </div>
    </div>
  );
}
