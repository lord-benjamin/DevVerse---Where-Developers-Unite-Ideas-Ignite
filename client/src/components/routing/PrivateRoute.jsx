import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
}) => {
  if(!loading && !isAuthenticated){
    return <Navigate to="/login" />;
  }
  return <Component/>
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
