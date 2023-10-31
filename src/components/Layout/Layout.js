const Layout = (props) => {
  return (
    <div>
      <div>{props.header}</div>
      <div>{props.sectionIntro}</div>
      <div>{props.sectionOne}</div>
      <div>{props.sectionTwo}</div>
      <div>{props.sectionThree}</div>
      <div>{props.footer}</div>
    </div>
  );
};

export default Layout;
