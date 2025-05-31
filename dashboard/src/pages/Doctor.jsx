import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

import SideBar from "./SideBar";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "    https://hospital-management-r7hc.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <SideBar />
      <section
        className="page doctors"
        style={{ backgroundColor: " #0e8797 " }}
      >
        <h1 style={{ color: "white" }}>DOCTORS</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element) => {
              return (
                <div className="card">
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="doctor avatar"
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                  <div className="details">
                    <p>
                      Email: <span>{element.email}</span>
                    </p>
                    <p>
                      Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      DOB: <span>{element.dob.substring(0, 10)}</span>
                    </p>
                    <p>
                      Department: <span>{element.doctorDepartment}</span>
                    </p>
                    <p>
                      Adhar No: <span>{element.Adhar}</span>
                    </p>
                    <p>
                      Gender: <span>{element.gender}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No Registered Doctors Found!</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
