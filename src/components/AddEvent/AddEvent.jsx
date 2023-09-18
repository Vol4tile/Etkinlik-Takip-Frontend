import React, { useState } from "react";
import styles from "./AddEvent.module.css";
import axios from "axios";
import { provinces } from "../../assets/provinces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddEvent = ({ setToggle }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Location: "",
    Time: "",
  });

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const inputChangeHandler = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const sendingFormData = new FormData();
      sendingFormData.append("Photo", file);
      sendingFormData.append("Title", formData.Title);
      sendingFormData.append("Description", formData.Description);
      sendingFormData.append("Location", formData.Location);
      sendingFormData.append("Time", formData.Time);

      for (const pair of sendingFormData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      await axios.post("backendUrl", sendingFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Gönderme başarılı.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const ClosinInterval = setInterval(() => {
        setIsClosing(true);

        clearInterval(ClosinInterval);
      }, 2550);
      const Interval = setInterval(() => {
        console.log("int");

        setToggle(false);

        clearInterval(Interval);
      }, 3000);

      console.log("Dosya başarıyla yüklendi.");
    } catch (error) {
      toast.error("İşlem başarısız, Tekrar deneyin!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      console.error("Dosya yükleme hatası:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={submitHandler}
        className={`${styles.form} ${isClosing ? styles.close : ""}`}
      >
        <span
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              setToggle(false);
            }, 450);
          }}
        >
          X
        </span>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="Title"
            id="title"
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="Description"
            id="description"
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="Location">Location:</label>
          <select name="Location" onChange={inputChangeHandler}>
            <option value="">--</option>
            {provinces.map((province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            placeholder="Saat Seçiniz"
            name="Time"
            onChange={inputChangeHandler}
          />
        </div>
        <div
          className={styles.fileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="photo" className={styles.uploadLabel}>
            Drag & Drop or Click to Upload a Photo
            {file && (
              <span>
                {" "}
                <br /> {file.name} uploaded.
              </span>
            )}
          </label>
          <input
            type="file"
            name="Photo"
            id="photo"
            onChange={fileChangeHandler}
            className={styles.uploadInput}
          />
        </div>
        <button type="submit">Gönder</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddEvent;
