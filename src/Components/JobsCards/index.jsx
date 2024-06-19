/* eslint-disable react/prop-types */
import "./index.css";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";

const JobsCards = (props) => {
  const { jobsDetails } = props;
  return (
    <li className="jobs-card-cont">
      <div className="jobs-card">
        <div className="icon-title-rating-cont">
          <img
            src={jobsDetails.company_logo_url}
            alt="company logo"
            className="jobs-icon"
          />
          <div className="title-rating-cont">
            <h2 className="jobs-title">{jobsDetails.title}</h2>
            <span>
              <FaStar className="rating-icon" />
            </span>
            <span className="rating">{jobsDetails.rating}</span>
          </div>
        </div>
        <div className="loaction-emp-package-cont">
          <div>
            <FaLocationDot />
            <span className="emp-package-text">{jobsDetails.location}</span>
            <FaBriefcase />
            <span className="emp-package-text">
              {jobsDetails.employment_type}
            </span>
          </div>
          <h2 className="package">{jobsDetails.package_per_annum}</h2>
        </div>
        <hr />
        <h6>Description</h6>
        <p>{jobsDetails.job_description}</p>
      </div>
    </li>
  );
};

export default JobsCards;
