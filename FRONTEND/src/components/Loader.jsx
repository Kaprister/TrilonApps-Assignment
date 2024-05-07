import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Loader.css'

function Loader() {
  return (
    <div className="d-flex flex-row gap-2">
      <div className="spinner-circle"></div>
      <div className="spinner-circle" style={{ animationDelay: '-0.3s' }}></div>
      <div className="spinner-circle" style={{ animationDelay: '-0.5s' }}></div>
    </div>
  );
}

export default Loader;
