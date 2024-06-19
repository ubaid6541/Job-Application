/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./index.css";

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const JobFilterSection = ({ changeEmpType, changeSalaryType }) => {
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const apiUrl = "https://apis.ccbp.in/profile";
      const options = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYW5lZXRoYSIsInJvbGUiOiJQUklNRV9VU0VSIiwiaWF0IjoxNjIzMDY1NTMyfQ.68FuDFraHW7GplQiXVUrnsU1goYgmwd0tXNk6-HxCok`,
        },
        method: "GET",
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setProfileDetails(data.profile_details);
      }
    };
    fetchProfileDetails();
  }, []);

  const renderEmploymentTypes = () => (
    <>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map((eachType) => (
          <li key={eachType.employmentTypeId} className="fliters-list-item">
            <input
              type="checkbox"
              className="checkbox-input"
              value={eachType.employmentTypeId}
              id={eachType.employmentTypeId}
              onChange={(event) =>
                changeEmpType(event.target.value, event.target.checked)
              }
            />
            <label htmlFor={eachType.employmentTypeId} className="filter-label">
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  const renderSalaryRanges = () => (
    <>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map((eachRange) => (
          <li key={eachRange.salaryRangeId} className="fliters-list-item">
            <input
              type="radio"
              className="checkbox-input"
              value={eachRange.salaryRangeId}
              id={eachRange.salaryRangeId}
              name="salary ranges"
              onChange={(event) => changeSalaryType(event.target.value)}
            />
            <label htmlFor={eachRange.salaryRangeId} className="filter-label">
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  );

  const renderProfileDetails = () => (
    <div className="profile-details-container">
      <img
        src={profileDetails.profile_image_url}
        alt="profile"
        className="profile-image"
      />
      <h1 className="profile-name">{profileDetails.name}</h1>
      <p className="profile-bio">{profileDetails.short_bio}</p>
    </div>
  );

  return (
    <div className="filters-group-container">
      {renderProfileDetails()}
      {renderEmploymentTypes()}
      <hr className="separator" />
      {renderSalaryRanges()}
    </div>
  );
};

export default JobFilterSection;
