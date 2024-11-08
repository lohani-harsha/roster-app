import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  setSelectedEmployeeStateAction,
  setShowEmpDetailsstateAction,
  fetchCompanyInfoAction,
  toggleLoadingStateAction
} from "../../store/reducers";
import { ProgressSpinner } from "primereact/progressspinner";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { Dialog } from "primereact/dialog";
import "./EmployeeSummary.css";
import EmployeeRowImageTemplate from "../EmployeeRowImage/employeeRowImage";

const EmployeeSummary = () => {
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

  useEffect(() => {
    console.log("calling fetchCompanyInfoAction ");
    dispatch(toggleLoadingStateAction())
    setTimeout(() => {
      dispatch(fetchCompanyInfoAction());
    }, 1000);
  }, []);

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
      <div >
        {companyInfoState.loading && <ProgressSpinner />}

        {!companyInfoState.loading && companyInfoState.errorMessage && (
          <><div className="errmsg">Failed to load. Please ensure server is up.</div></>
        )}
      </div>
      <div>
        <div>
          {companyInfoState.companyInfo && (
            <>
              <div className="company-name">
                {companyInfoState.companyInfo.companyName}
              </div>
              <div className="company-sub-header">
                <div className="company-moto company-sub-header-item">
                  {companyInfoState.companyInfo.companyMotto}
                </div>
                <div className="company-est company-sub-header-item">
                  {companyInfoState.companyInfo.companyEst}
                </div>
              </div>
            </>
          )}
        </div>

        {companyInfoState.companyInfo && (
          <div className="card">
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
                console.log("event", e);
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
          </div>
        )}
      </div>

      <div className="card flex justify-content-center">
        <Dialog
          visible={companyInfoState.showEmpDetails}
          // visible={true}
          modal={true}
          closable={true}
          dismissableMask={true}
          onHide={() => {
            dispatch(setShowEmpDetailsstateAction(false));
          }}
          style={{ width: "50vw" }}
        >
          <EmployeeDetails></EmployeeDetails>
        </Dialog>
      </div>
    </>
  );
};

export default EmployeeSummary;
