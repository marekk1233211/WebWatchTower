import styles from "./SectionTwo.module.scss";
import Section from "./Section/Section";
import axios from "axios";
import { baseURL } from "../config";
import { useState, useEffect } from "react";

function SectionTwo() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/usersData`)
      .then((response) => {
        setUserList(response.data); // Ustaw dane użytkowników w stanie userList
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  return (
    <div className={styles.bgcWrapper}>
      <div id="two" className={styles.innerWrapper}>
        <h2>Data showcase</h2>
        <p>
          In this section, we automatically generate different kind of charts
          after data analysis.
        </p>
        <section className={styles.sectionsWrapper}>
          <div className={styles.sectionWrapper}>
            <Section
              title={"Data analysis"}
              btnTitle={"Learn more"}
              userDataList={userList}
              typeOfChart={"whatCountryChartType"}
            >
              {" "}
              {
                "A bar chart representing the number of users visits based on their country."
              }
            </Section>
          </div>
          <div className={styles.sectionWrapper}>
            <Section
              title={"Data display"}
              btnTitle={"Learn more"}
              userDataList={userList}
              typeOfChart={"kindOfDeviceCounterChartType"}
            >
              {" "}
              {
                "A pie chart representing the number of users devices based on its type."
              }
            </Section>
          </div>

          <div className={styles.sectionWrapper}>
            <Section
              title={"Data gathering"}
              btnTitle={"Learn more"}
              userDataList={userList}
              typeOfChart={"numberOfVisitsChartType"}
            >
              {
                "A line chart representing the number of users visits depending on the date."
              }
            </Section>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SectionTwo;
