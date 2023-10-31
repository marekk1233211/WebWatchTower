import styles from "./Button.module.scss";
const Button = ({ children, handleOnClick, id }) => {
  return (
    <button className={styles.btn} onClick={handleOnClick} id={id}>
      {children}
    </button>
  );
};

export default Button;
