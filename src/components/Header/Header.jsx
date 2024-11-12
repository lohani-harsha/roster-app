import React from "react";
import {useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const companyInfoState = useSelector((state) => state.companyInfoState);
  return (

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

  );
};

export default Header;
