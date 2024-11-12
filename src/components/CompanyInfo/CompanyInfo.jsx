import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {  
  setShowEmpDetailsstateAction,
  fetchCompanyInfoRequest,
  toggleLoadingStateAction,} from '../../redux/companyInfoSlice'
import { ProgressSpinner } from "primereact/progressspinner";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { Dialog } from "primereact/dialog";
import EmployeeSummaryTable from "../EmployeesSummaryTable/EmployeesSummaryTable";
import Header from "../Header/Header";
import "./CompanyInfo.css";

const CompanyInfo = () => {
  const dispatch = useDispatch();
  const companyInfoState = useSelector((state) => state.companyInfoState);
  useEffect(() => {
    dispatch(toggleLoadingStateAction())
    setTimeout(() => {
      dispatch(fetchCompanyInfoRequest());
    });
  }, []);


  return (
    <>
      <div>
        {companyInfoState?.loading && <ProgressSpinner />}

        {!companyInfoState?.loading && companyInfoState?.errorMessage && (
          <><div className="errmsg">Failed to load. Please ensure server is up.</div></>
        )}
      </div>
      <div>
        <div>
          {companyInfoState?.companyInfo && (
            <Header/>
          )}
        </div>

        {companyInfoState?.companyInfo && (
          <div className="card">
            <EmployeeSummaryTable/>
          </div>
        )}
      </div>

      <div className="card flex justify-content-center">
        <Dialog visible={companyInfoState?.showEmpDetails} modal={true} closable={true} dismissableMask={true}
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

export default CompanyInfo;
