import styles from "./Section.module.scss";
import Button from "../../Button/Button";
import UserVisitsChart from "./UserVisitsChart";
import TypeOfDeviceCounterChart from "./TypeOfDeviceCounterChart";
import WhatCountryChartType from "./WhatCountryChartType";
function Section({
  children,
  btnTitle,
  backgroundColor,
  userDataList,
  typeOfChart,
}) {
  const sectionStyle = {
    backgroundColor: backgroundColor,
  };
  const chartId = Math.floor(Math.random() * 1000);
  let chartToRender;
  if (typeOfChart === "numberOfVisitsChartType") {
    chartToRender = (
      <UserVisitsChart userDataList={userDataList} chartId={chartId} />
    );
  } else if (typeOfChart === "kindOfDeviceCounterChartType") {
    chartToRender = (
      <TypeOfDeviceCounterChart userDataList={userDataList} chartId={chartId} />
    );
  } else if (typeOfChart === "whatCountryChartType") {
    chartToRender = (
      <WhatCountryChartType userDataList={userDataList} chartId={chartId} />
    );
  } else {
    chartToRender = null;
  }

  return (
    <section className={`${styles.sectionWrapper}`} style={sectionStyle}>
      <div className={styles.content}>
        <div className="chartCard">
          <div className="chartBox">{chartToRender}</div>
        </div>
        <p className={styles.description}>{children}</p>
        {/* <Button>{btnTitle}</Button> */}
      </div>
    </section>
  );
}

export default Section;
