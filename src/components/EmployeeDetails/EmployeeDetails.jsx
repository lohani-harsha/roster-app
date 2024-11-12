import React, { useRef } from "react";
import { useSelector } from "react-redux";
import "./EmployeeDetails.css";

const EmployeeDetails = () => {
  const companyInfoState = useSelector((state) => state.companyInfoState);
  const op = useRef(null);
  return (
    <>
      {companyInfoState.selectedEmp && (
        <div>
          <div className="employee-details-header flex">
            <div className="left-part">
              <img
                alt="flag"
                src={companyInfoState.selectedEmp.avatar}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                }}
                className={`flag flag-`}
                style={{ width: "6em" }}
              />
            </div>
            <div className="right-part employee-name">
              {companyInfoState.selectedEmp.firstName}{" "}
              {companyInfoState.selectedEmp.lastName}
            </div>
          </div>
          <div>
            <div className="flex">
              <div className="left-part">
                <div>{companyInfoState.selectedEmp.jobTitle} </div>
                <div>{companyInfoState.selectedEmp.age} </div>
                <div>{companyInfoState.selectedEmp.dateJoined} </div>
              </div>
              <div className="right-part">
                {companyInfoState.selectedEmp.bio}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeDetails;
