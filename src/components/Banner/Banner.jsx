import React, { useEffect, useState } from "react";
import ProvinceSelector from "../ProvinceSelector/ProvinceSelector";
import styles from "./Banner.module.css";
import Events from "../Events/Events";
import AddEvent from "../AddEvent/AddEvent";
import axios from "axios";
const Banner = () => {
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    axios
      .get("backendUrl")
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.banner}>
      <div className={styles.topBar}>
        <h1>81 İldeki Etkinlikleri Takip Edin</h1>
        <p>En güncel etkinlikleri kaçırmayın!</p>
      </div>
      <div className={styles.header}>
        <button
          className={styles.btn}
          onClick={() => {
            setToggle(true);
          }}
        >
          Etkinlik Ekle
        </button>
        {toggle ? <AddEvent setToggle={setToggle} /> : null}
        <ProvinceSelector
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
        />
      </div>
      <Events data={data} selectedProvince={selectedProvince} />
    </div>
  );
};

export default Banner;
