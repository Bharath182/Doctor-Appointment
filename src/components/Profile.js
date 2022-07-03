import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from '../styles/Header.module.css';

const Profile = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <div className={classes.Header}>
        <p>{currentUser.user.name}</p>
      </div>
      <h3>
        <strong>{currentUser.user.name}</strong>
        {' '}
        Profile
      </h3>
      <p>
        <strong>Email:</strong>
        {' '}
        {currentUser.user.email}
      </p>
    </div>
  );
};

export default Profile;
