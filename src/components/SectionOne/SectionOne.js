import styles from "./SectionOne.module.scss";
import Section from "./Section/Section";
import dataGatheringImg from "../../assets/images/dataGathering.png";
import dataAnalysis from "../../assets/images/dataAnalysis.png";
import dataDisplay from "../../assets/images/dataDisplay.png";
import Swal from "sweetalert2";

function SectionOne() {
  const handleShowMoreInformationPopUp1 = () => {
    Swal.fire(
      "We collect your location data to know which country users are from. To do it we use http://ip-api.com/json/ API. Also we check the type of your device by react-device-detect library. To check the date of visiting the website we use constructor Date() which is embedded in JavaScript language",
      "",
      "info"
    );
  };
  const handleShowMoreInformationPopUp2 = () => {
    Swal.fire("Still in process", "", "info");
  };
  const handleShowMoreInformationPopUp3 = () => {
    Swal.fire("Next chart is still in progress", "", "info");
  };
  return (
    <div className={styles.bgcWrapper}>
      <section id="one" className={styles.sectionsWrapper}>
        <Section
          title={"Data gathering"}
          img={dataGatheringImg}
          btnTitle={"Learn more"}
          handleShowMoreInformationPopUp={handleShowMoreInformationPopUp1}
          backgroundColor="rgba(0, 0, 0, 0)"
        >
          {
            "We collect the data every time a user visits the website, but only if they've previously clicked on the consent button and confirmed their willingness to share their data with us. This process continues until the user revokes their consent."
          }
        </Section>
        <Section
          title={"Data analysis"}
          img={dataAnalysis}
          btnTitle={"Learn more"}
          handleShowMoreInformationPopUp={handleShowMoreInformationPopUp2}
          backgroundColor="rgba(0, 0, 0, 0.1)"
        >
          {"In process."}
        </Section>
        <Section
          title={"Data display"}
          img={dataDisplay}
          btnTitle={"Learn more"}
          handleShowMoreInformationPopUp={handleShowMoreInformationPopUp3}
          backgroundColor="rgba(0, 0, 0, 0.05)"
        >
          {
            "To understand, interpret, and present information from the collected data, the data has been visualized using three different charts."
          }
        </Section>
      </section>
    </div>
  );
}

export default SectionOne;
