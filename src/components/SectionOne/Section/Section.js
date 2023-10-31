import styles from "./Section.module.scss";
import Button from "../../Button/Button";
function Section({
  children,
  img,
  backgroundColor,
  title,
  btnTitle,
  handleShowMoreInformationPopUp,
}) {
  const sectionStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className={styles.bgcWrapper} style={sectionStyle}>
      <section className={`${styles.sectionWrapper}`} style={sectionStyle}>
        <div className={styles.imgWrapper}>
          <img src={img} alt=""></img>
        </div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{children}</p>
          <Button handleOnClick={handleShowMoreInformationPopUp}>
            {btnTitle}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Section;
