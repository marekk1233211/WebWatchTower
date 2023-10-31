import styles from "./Header.module.scss";
import { useState, useEffect } from "react";
const Header = () => {
  const [activeSection, setActiveSection] = useState("intro");
  function scrollToSection(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1); // Pobierz identyfikator z href
    const targetElement = document.getElementById(targetId); // Znajdź element docelowy

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // Przewiń do elementu docelowego płynnie
    }
  }
  useEffect(() => {
    // Funkcja do śledzenia położenia na stronie i aktualizacji aktywnej sekcji
    const handleScroll = () => {
      const intro = document.getElementById("intro");
      const one = document.getElementById("one");
      const two = document.getElementById("two");
      const three = document.getElementById("three");

      const scrollPosition = window.scrollY;

      if (scrollPosition >= intro.offsetTop && scrollPosition < one.offsetTop) {
        setActiveSection("intro");
      } else if (
        scrollPosition >= one.offsetTop &&
        scrollPosition < two.offsetTop
      ) {
        setActiveSection("one");
      } else if (
        scrollPosition >= two.offsetTop &&
        scrollPosition < three.offsetTop
      ) {
        setActiveSection("two");
      } else if (scrollPosition >= three.offsetTop) {
        setActiveSection("three");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={styles.sidebar}>
      <div className={styles.innerWrapper}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <a
                href="#intro"
                onClick={scrollToSection}
                className={activeSection === "intro" ? styles.activeLink : ""}
              >
                Welcome
              </a>
            </li>
            <li>
              <a
                href="#one"
                onClick={scrollToSection}
                className={activeSection === "one" ? styles.activeLink : ""}
              >
                What I do
              </a>
            </li>
            <li>
              <a
                href="#two"
                onClick={scrollToSection}
                className={activeSection === "two" ? styles.activeLink : ""}
              >
                Data Showcase
              </a>
            </li>
            <li>
              <a
                href="#three"
                onClick={scrollToSection}
                className={activeSection === "three" ? styles.activeLink : ""}
              >
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Header;
