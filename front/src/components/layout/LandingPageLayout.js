import LandingPageNavbar from './navbars/LandingPageNavbar';

import classes from './LandingPageLayout.module.css';

function LandingPageLayout(props) {
  return (
    <div>
      <LandingPageNavbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default LandingPageLayout;