import MainNavbar from './navbars/MainNavbar';

import classes from './MainLayout.module.css'

function MainLayout(props) {
  return (
    <div>
      <MainNavbar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default MainLayout;