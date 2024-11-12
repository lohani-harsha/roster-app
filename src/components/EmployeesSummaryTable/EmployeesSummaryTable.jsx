import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {  
  setSelectedEmployeeStateAction,
  setShowEmpDetailsstateAction} from './../../redux/companyInfoSlice'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import EmployeeRowImageTemplate from "../EmployeeRowImage/employeeRowImage";

const EmployeeSummaryTable = () => {
  const dispatch = useDispatch();
  const companyInfoState = useSelector((state) => state.companyInfoState);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };


  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <div></div>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };
  const header = renderHeader();
  return (
    <>
            <DataTable
              value={companyInfoState.employees}
              paginator
              rows={5}
              paginatorTemplate=" CurrentPageReport RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink "
              currentPageReportTemplate="{first} to {last} of {totalRecords}"
              dataKey="id"
              filters={filters}
              header={header}
              selection={companyInfoState.selectedEmp}
              onRowClick={(e) => {
                dispatch(setSelectedEmployeeStateAction(e.data));
                dispatch(setShowEmpDetailsstateAction(true));
              }}
              selectionMode="single"
            >
              <Column field="id" header="ID"></Column>
              <Column
                field="firstName"
                header="Name"
                sortable
                body={EmployeeRowImageTemplate}
              ></Column>
              <Column field="contactNo" header="Contact No" sortable></Column>
              <Column field="address" header="Address" sortable></Column>
            </DataTable>
     
    </>
  );
};

export default EmployeeSummaryTable;
