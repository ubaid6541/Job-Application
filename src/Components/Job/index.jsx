/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../Header";
import JobFilterSection from "../JobFilterSection";
import JobsCards from "../JobsCards";
import "./index.css";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Job = () => {
  const [allvalues, setValues] = useState({
    allJobsList: [],
    searchInput: "",
    emptype: [],
    minPakage: "",
  });

  useEffect(() => {
    const fetchAllJobsDetails = async () => {
      const token = Cookies.get("jwtToken");

      const url = `https://apis.ccbp.in/jobs?employment_type=${allvalues.emptype}&minimum_package=${allvalues.minPakage}&search=${allvalues.searchInput}`;
      const options = {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const fetchData = await response.json();
      console.log(fetchData);
      if (response.ok === true) {
        setValues({ ...allvalues, allJobsList: fetchData.jobs });
      }
    };

    fetchAllJobsDetails();
  }, [allvalues.searchInput, allvalues.emptype, allvalues.minPakage]);

  const onChangeUserSearch = (event) => {
    setValues({ ...allvalues, searchInput: event.target.value });
  };

  const onChangeEmpType = (value, isChecked) => {
    if (isChecked) {
      setValues({ ...allvalues, emptype: [...allvalues.emptype, value] });
    } else {
      setValues({
        ...allvalues,
        emptype: allvalues.emptype.filter((each) => each !== value),
      });
    }
  };

  const onChangeSalaryType = (value) => {
    setValues((allvalues) => ({ ...allvalues, minPakage: value }));
  };
  return (
    <div className="Jobs-main-cont">
      <Header />

      <div className="filter-all-jobs-cont">
        <div className="filter-sec">
          <JobFilterSection
            changeEmpType={onChangeEmpType}
            changeSalaryType={onChangeSalaryType}
          />
        </div>
        <div className="Jobs-sec">
          <div className="all-jobs-cont">
            <div className="w-75">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                onKeyDown={onChangeUserSearch}
              />
            </div>

            <ul>
              {allvalues.allJobsList.map((each) => (
                <JobsCards jobsDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
