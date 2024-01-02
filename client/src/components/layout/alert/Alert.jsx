import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => <div key={alert.id} className={`rounded-lg bg-opacity-90 font-montserrat font-medium text-sm md:text-base px-4 py-3 translate-x-[100%] animate-alert overflow-hidden ${alert.alertCss}`}>{alert.msg}</div>);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
