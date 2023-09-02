import React from 'react'
import Menu from './Menu';
const Base = ({
    title="My Title",
    description="My Description",
    className="bg-dark text-white p-4",
    children
}) => {
  return (
    <div>
        <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center py-3">
            <h2 className='display-4'>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <hr />
      <footer className='footer bg-dark mt-auto py-3'>
        <div className="container-fluid bg-success text-white text-center py-3">
            <h4>if you got any issues,reach me out at LinkedIn</h4>
            <button className='btn btn-warning btn-lg'>Contact Us</button>
            <div className="container">
                <span className="text-dark">
                    An Amazing Website
                </span>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default Base
