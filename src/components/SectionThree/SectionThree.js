import styles from "./SectionThree.module.scss";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import React, { useRef } from "react";
function SectionThree() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_xkhl5xw",
        "template_c3uphtq",
        form.current,
        "hXbt_EhXf5F3qHJ_V"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire("Your message has been sent.", "", "success");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className={styles.bgcWrapper}>
      <div id="three" className={styles.innerWrapper}>
        <h2>Get in touch</h2>
        <p>
          If you liked the website or have any feedback regarding its visual
          design, functionality, or if you've noticed any errors, or simply wish
          to get in touch with me, feel free to send me a message.
        </p>
        <div className={styles.formAndContactWrapper}>
          <form ref={form} className={styles.formWrapper} onSubmit={sendEmail}>
            <div className={styles.fields}>
              <div className={styles.fieldHalf}>
                <label className={styles.fieldLabel}>Name</label>
                <input type="text" name="user_name"></input>
              </div>
              <div className={styles.fieldHalf}>
                <label className={styles.fieldLabel}>Email</label>
                <input type="email" name="user_email"></input>
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Message</label>
                <textarea name="message" rows="5"></textarea>
              </div>
            </div>
            <div className={styles.btnForm}>
              <input
                type="submit"
                value="Send"
                className={styles.submitInput}
              ></input>
              {/* <Button type="submit" >Send message</Button> */}
            </div>
          </form>
          <div className={styles.contactWrapper}>
            <ul>
              <li className={styles.contactWrapperElement}>
                <h3>Address</h3>
                <span>Zabrze</span>
                <br></br>
                <span>Poland</span>
              </li>
              <li className={styles.contactWrapperElement}>
                <h3>Email</h3>
                <a
                  href="mailto:marekkorczakprogramowanie@gmail.com"
                  className={styles.email}
                >
                  marekkorczakprogramowanie@gmail.com
                </a>
              </li>
              <li className={styles.contactWrapperElement}>
                <h3>Phone</h3>
                <span>+48 519 656 014</span>
              </li>
              <li className={styles.contactWrapperElement}>
                <h3>Social</h3>
                <ul className={styles.socialList}>
                  <li>
                    <a
                      href="mailto:marekkorczakprogramowanie@gmail.com"
                      className={styles.social}
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/marek-korczak-913210285"
                      className={styles.social}
                    >
                      <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/marekk1233211"
                      className={styles.social}
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionThree;
