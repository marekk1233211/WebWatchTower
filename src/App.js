import "./App.css";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SectionIntro from "./components/SectionIntro/SectionIntro";
import SectionOne from "./components/SectionOne/SectionOne";
import SectionTwo from "./components/SectionTwo/SectionTwo";
import SectionThree from "./components/SectionThree/SectionThree";
function App() {
  return (
    <div className="App">
      <Layout
        header={<Header />}
        sectionIntro={<SectionIntro />}
        sectionOne={<SectionOne />}
        sectionTwo={<SectionTwo />}
        sectionThree={<SectionThree />}
        footer={<Footer />}
      />
    </div>
  );
}

export default App;
