/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import JobsCards from "../JobsCards";

const DisplayAllJobs = () => {
  const [allvalues, setValues] = useState({
    alljobsList: [],
  });
  useEffect(() => {
    const fetchAllJobsDetails = async () => {
      const token = Cookies.get("jwtToken");
      const url = "https://apis.ccbp.in/jobs";
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, options);
      const fetchData = await response.json();
      console.log(fetchData);
      if (response.ok === true) {
        setValues({ ...allvalues, alljobsList: fetchData.jobs });
      }
    };
    fetchAllJobsDetails();
  }, []);
  return (
    <div className="all-jobs-cont">
      <div className="w-75">
      <input type="search" placeholder="Search" className="form-control search-input"/>
      </div>
      <ul>
        {allvalues.alljobsList.map((each) => (
          <JobsCards key={each.id} jobsDetails={each} />
        ))}
      </ul>
    </div>
  );
};
export default DisplayAllJobs;
