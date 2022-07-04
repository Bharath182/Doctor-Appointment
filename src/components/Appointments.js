import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../services/user.service';
import headerClasses from '../styles/Header.module.css';

const Appointments = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useSelector(state => state.auth);
  let appointments;
  const appointmentCount = {
    position: 'absolute',
    right: '14px',
    top: '12px',
    width: '25px',
    height: '25px',
    backgroundColor: 'rgb(0 121 158)',
    textAlign: 'center',
    borderRadius: '50%',
    color: '#fff',
  };

  useEffect(() => {
    if (currentUser) {
      UserService.getAppointments(currentUser.user.id).then(
        response => {
          setLoading(false);
          setContent(response.data);
        },
        error => {
          setLoading(false);
          const message = (error.response
              && error.response.data
              && error.response.data.message)
            || error.message
            || error.toString();
          setContent(message);
        },
      );
    }
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  console.log({ content });
  if (!loading && content.length === 0) {
    appointments = (
      <h4>
        You do not have any appointment. Create one
        <Link to="/doctors">
          &nbsp;here
        </Link>
      </h4>
    );
  } else {
    appointments = content && content.map((appointment, index) => {
      const d = new Date(appointment.appointment_date);
      const addMinutes = function (date, min) {
        return new Date(date.getTime() + min * 60000);
      };
      const date = addMinutes(d, 1).toLocaleString().split(' ').shift();
      const fromTime = addMinutes(d, 1).toLocaleString().split(' ').slice(1);
      const toTime = addMinutes(d, 20).toLocaleString().split(' ').slice(1)
        .join(' ');
      return (
        <Link to={`/appointments/${appointment.id}`} key={appointment.id}>
          <div className="card m-4">
            <div className="card-body" style={{ textAlign: 'left', padding: '0' }}>
              <span style={appointmentCount}>{ index + 1 }</span>
              <p style={{ marginBottom: '8px' }}>
                {`Date: ${date}`}
              </p>
              <p style={{ marginBottom: 0 }}>
                {`Timings: ${fromTime} to ${toTime}`}
              </p>
            </div>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="container text-center">
      <div className={headerClasses.Header}>
        Appointments
      </div>
      {loading && <span className="spinner-border spinner-border-lg" />}
      <div className="d-flex flex-wrap">
        {appointments}
      </div>
    </div>
  );
};

export default Appointments;
