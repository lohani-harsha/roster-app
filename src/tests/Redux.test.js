import { setupStore } from "../redux/store";

import {
    companyInfoReducer,
    toggleLoadingStateAction,
    fetchCompanyInfoRequest,
    fetchCompanyInfoSuccess,
    fetchCompanyInfoFailure,
    setSelectedEmployeeStateAction,
    setShowEmpDetailsstateAction
  } from "../redux/companyInfoSlice";
import json from "../../sample-data.json";


//toggleLoadingStateAction state update test

  test("toggle loading state test", async () => {
    const store = setupStore({});
    expect(
      companyInfoReducer(
        ({
          loading: true,
          selectedEmp: null,
          showEmpDetails: false,
        }),
        toggleLoadingStateAction()
      )
    ).toEqual({
      loading: false,
      selectedEmp: null,
      showEmpDetails: false,
    });
  
    expect(
      companyInfoReducer(
        {
          loading: false,
          selectedEmp: null,
          showEmpDetails: false,
        },
        toggleLoadingStateAction()
      )
    ).toEqual({
      loading: true,
      selectedEmp: null,
      showEmpDetails: false,
    });
  
    
  });
  
  //fetchCompanyInfoRequest state update test

  test("Request to fetch company info", async () => {
    const store = setupStore({});
    
    expect(
      companyInfoReducer(
        ({
          loading: false,
          selectedEmp: null,
          showEmpDetails: false,
        }),
        fetchCompanyInfoRequest()
      )
    ).toEqual({
      loading: true,
      selectedEmp: null,
      showEmpDetails: false,
      error: null,
    }); 
  });


  // fetchCompanyInfoSuccess state update test

  test("Company info fetched successfully", async () => {
    const store = setupStore({});
    expect(
      companyInfoReducer(
        ({
          loading: false,
          selectedEmp: null,
          showEmpDetails: false,
        }),
        fetchCompanyInfoSuccess(json)
      )
    ).toEqual({
      loading: false,
      selectedEmp: null,
      showEmpDetails: false,
      errorMessage:null,
      companyInfo:json.companyInfo,
      employees:json.employees
    });
  
    
  });

  // fetchCompanyInfoFailure state update test

  test("Request to fetch company info", async () => {
    const store = setupStore({});
    const errorMessage =  "Failed to fetch"
    expect(
      companyInfoReducer(
        ({
          loading: false,
          selectedEmp: null,
          showEmpDetails: false,
        }),
        fetchCompanyInfoFailure(errorMessage)
      )
    ).toEqual({
      loading: false,
      selectedEmp: null,
      showEmpDetails: false,
      errorMessage:errorMessage,
    });
  });

  //setSelectedEmployeeStateAction state update test

  test("Set selected employee", async () => {
    const store = setupStore({});
    const selectedEmp ={
      "id": "38a12e96-9806-424a-b5f8-8fa61c7d1e6c",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ratbus/128.jpg",
      "firstName": "Poppy",
      "lastName": "Edwards",
      "jobTitle": "Senior Applications Administrator",
      "contactNo": "0454 012 242",
      "address": "Ruby Run Lake Annabellestad, New South Wales",
      "age": 27,
      "bio": "Voluptas minus et repellat similique ex. Earum dolores dolore sint modi. Iste aliquid et. Neque asperiores aut rem voluptate.",
      "dateJoined": "2023-10-28T09:07:43.325Z"
      }
    expect(
      companyInfoReducer(
        ({
          loading: false,
          selectedEmp: null,
          showEmpDetails: false,
        }),
        setSelectedEmployeeStateAction(selectedEmp)
      )
    ).toEqual({
      loading: false,
      selectedEmp:selectedEmp,
      showEmpDetails: false,
    });
  
    
  });

  //setShowEmpDetailsstateAction state update test

  test("Open/close employee detail modal", async () => {
    const store = setupStore({});
 
    expect(
      companyInfoReducer(
        ({
          showEmpDetails: false,
        }),
        setShowEmpDetailsstateAction(true)
      )
    ).toEqual({
      showEmpDetails: true,

    });

    expect(
      companyInfoReducer(
        ({
          showEmpDetails: true,
        }),
        setShowEmpDetailsstateAction(false)
      )
    ).toEqual({
      showEmpDetails: false,
      selectedEmp: null,

    });
  });