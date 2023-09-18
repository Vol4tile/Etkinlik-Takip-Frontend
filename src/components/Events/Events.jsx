import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";

const Events = ({ data, selectedProvince }) => {
  const [selectedProvinces, setSelectedProvinces] = useState([]);

  useEffect(() => {
    if (selectedProvince.trim() !== "") {
      const filteredProvinces = data.filter(
        (item) => item.location === selectedProvince
      );
      setSelectedProvinces(filteredProvinces);
    } else {
      setSelectedProvinces(data);
    }
  }, [selectedProvince, data]);

  return (
    <div>
      {selectedProvinces.map((item, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.cardImage}>
            <img src={`backendUrl/${item.photo}`} alt="Etkinlik Resmi" />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{item.title}</div>
            <div className={styles.cardDescription}>{item.description}</div>
            <div className={styles.cardLocationDate}>
              {item.location} | {item.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
