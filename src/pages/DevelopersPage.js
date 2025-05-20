import React from "react";
import "../App.css";

function DevelopersPage() {
  const devs = [
    { 
      name: "Vikas Kumar Jha", 
      img: "/dev_pic/vikas.jpg", 
      role: "Frontend & AttendIQ Module Developer",
      mail: "vikaskumarjha763@gmail.com"
    },
    { 
      name: "Vishwajeet Kumar Nikhil", 
      img: "/dev_pic/vishwajeet.jpg", 
      role: "Backend Specialist",
      mail: "vishwajeet2349@gmail.com"
    },
    { 
      name: "Raghavi Saxena", 
      img: "/dev_pic/Raghavi.jpg", 
      role: "AI/ML Specialist",
      mail: "raghavi.saxena22@gmail.com"
    },
    { 
      name: "Saloni Kanyal", 
      img: "/dev_pic/Saloni.jpg", 
      role: "AI/ML Model Intergration & Preprocessing Lead",
      mail: "kanyalsaloni@gmail.com"
    }
  ];

  return (
    <div className="developers-container">
      <h2 className="developers-title">Meet the Developers</h2>
      <div className="developers-list">
        {devs.map(dev => (
          <div key={dev.name} className="developer-card">
            <img
              src={dev.img}
              alt={dev.name}
              className="developer-img"
            />
            <h3 className="developer-name">{dev.name}</h3>
            <a className="developer-mail" href={`mailto:${dev.mail}`}>
              {dev.mail}
            </a>
            <p className="developer-role">{dev.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DevelopersPage;