import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Home.module.css';

const Home = () => (
  <div>
    <div className={classes.Home}>
      <div className={classes.Overlay}>
        <div className="d-flex justify-content-center flex-column align-items-center h-75">
          <h1 className={classes.HomeWelcome}>Welcome to Apollo Tele Health</h1>
          <h2> BOOK AN APPOINTMENT NOW ! </h2>
          <div className="d-flex mt-3">
            <Link to="/doctors" className={classes.Button}>
              Click Here
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div>
      <ul className={classes.BoxAnimation}>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
        <li> </li>
      </ul>
    </div>
  </div>
);

export default Home;
