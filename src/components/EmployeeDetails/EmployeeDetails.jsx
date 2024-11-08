import React, { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
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
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. */}
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
