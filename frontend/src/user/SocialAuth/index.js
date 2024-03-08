import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { GoogleAuth } from "../../features/actions/authActions";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const SocialAuth = () => {
  let location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = 'Google Authentication';
}, []);
  useEffect(() => {
    const values = queryString.parse(location.search);
    const code = values.code ? values.code : null;
    if (code) {
      onGogglelogin();
    }
  }, []);

  

  const onGogglelogin = async () => {
    const raw_res = await dispatch(GoogleAuth(location.search));
    const res = await unwrapResult(raw_res);
    if(!res.errors){
      navigate('/');
    }
  }

  return (
    <div className="loading-icon-container">
      <div className="loading-icon">
        <div className="loading-icon__circle loading-icon__circle--first"></div>
        <div className="loading-icon__circle loading-icon__circle--second"></div>
        <div className="loading-icon__circle loading-icon__circle--third"></div>
        <div className="loading-icon__circle loading-icon__circle--fourth"></div>
      </div>
        <small className=" text-center mr-2">
          Just a moment
        </small>
    </div>
  );
};


export default SocialAuth;