import styles from "./SectionIntro.module.scss";
import Button from "../Button/Button";
import Swal from "sweetalert2";
import axios from "axios";
import {
  isTablet,
  isSmartTV,
  isAndroid,
  isIOS,
  isDesktop,
} from "react-device-detect";
import { baseURL } from "../config";

import React, { useEffect } from "react";

const SectionIntro = () => {
  function generateSimpleID() {
    const timestamp = new Date().getTime().toString();
    const randomNum = Math.floor(Math.random() * 1000).toString();
    return timestamp + randomNum;
  }
  // Sprawdź, czy użytkownik ma już przypisany UID w Local Storage
  const storedUID = localStorage.getItem("userUID");
  if (!storedUID) {
    // Jeśli użytkownik nie ma jeszcze przypisanego UID, wygeneruj nowy i zapisz go w Local Storage
    const newUID = generateSimpleID();
    localStorage.setItem("userUID", newUID);
    console.log("Przypisano nowy UID: " + newUID);
  } else {
    // Jeśli użytkownik już ma przypisany UID, odczytaj go z Local Storage
    console.log("UID użytkownika: " + storedUID);
  }

  const handleShowMoreInformationPopUp = () => {
    Swal.fire(
      "We collect user's location data to know which country users are from. To do it we use http://ip-api.com/json/ API. Also we check the type of your device by react-device-detect library. To check the date of visiting the website we use constructor Date() which is embedded in JavaScript language"
    );
  };
  const sendUserDataToServer = () => {
    if (localStorage.getItem("userConsent") === "true") {
      const data = {
        userId: localStorage.getItem("userUID"),
        location: null,
        deviceType: null,
        date: null,
        year: null,
        month: null,
        day: null,
        hour: null,
        minutes: null,
      };
      fetch("http://ip-api.com/json/")
        .then((response) => response.json())
        .then((ipData) => {
          data.location = ipData.country;
          console.log("Kraj: " + data.location);

          // Ustal rodzaj urządzenia
          if (isDesktop) {
            data.deviceType = "Desktop";
          } else if (isAndroid) {
            data.deviceType = "Android Smartphone";
          } else if (isIOS) {
            data.deviceType = "IOS Smartphone";
          } else if (isTablet) {
            data.deviceType = "Tablet";
          } else if (isSmartTV) {
            data.deviceType = "Smart TV";
          } else {
            data.deviceType = "Other";
          }

          // Pobierz datę i czas
          const entryTime = new Date();
          data.year = entryTime.getFullYear();
          data.month = entryTime.getMonth() + 1;
          data.day = entryTime.getDate();
          data.hour =
            entryTime.getHours() < 10
              ? "0" + entryTime.getHours()
              : entryTime.getHours();
          data.minutes =
            entryTime.getMinutes() < 10
              ? "0" + entryTime.getMinutes()
              : entryTime.getMinutes();
          data.date = entryTime;

          // Wyślij dane na serwer używając Axios
          axios
            .post(`${baseURL}/userData`, data)
            .then((response) => {
              console.log(
                "Dane zostały przesłane na serwer. Odpowiedź serwera:",
                response.data
              );
            })
            .catch((error) => {
              console.error("Błąd podczas wysyłania danych na serwer:", error);
            });
        })
        .catch((error) => {
          console.error(
            "Błąd podczas pobierania informacji o kraju, urządzeniu lub czasie wizyty: " +
              error
          );
        });
    }
  };

  const handleConsentBtn = () => {
    if (localStorage.getItem("userConsent") === "true") {
      Swal.fire({
        title: "Do you want to remove your consent ?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("userConsent", "false");
          Swal.fire("Your consent is removed.", "", "success");
        } else if (result.isDenied) {
          Swal.fire("We still have your consent.", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Are you giving us your consent to collect your data ?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if (localStorage.getItem("userConsent") !== "true") {
            localStorage.setItem("userConsent", "true");
          }
          Swal.fire("Data collected!", "", "success");
          sendUserDataToServer();
        } else if (result.isDenied) {
          localStorage.setItem("userConsent", "false");
          Swal.fire(
            "Your data is not collected because you havent given us your consent.",
            "",
            "info"
          );
        }
      });
    }
  };
  useEffect(() => {
    sendUserDataToServer();
  }, []);
  return (
    <div className={styles.bgcWrapper}>
      <section id="intro" className={styles.sectionWrapper}>
        <div className={styles.innerWrapper}>
          <h1>Welcome to WebWatchTower</h1>
          <p>
            Webwatchtower is a website that collects information about the user,
            including their location {"(country)"}, the type of device and the
            time of visit. Please click on consent button to share the data with
            us.
          </p>
          <div className={styles.btns}>
            <Button handleOnClick={handleShowMoreInformationPopUp}>
              Learn more
            </Button>
            <div className={styles.consentBtn}>
              <Button handleOnClick={handleConsentBtn}>Consent</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionIntro;
