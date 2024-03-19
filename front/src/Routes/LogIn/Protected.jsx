import { useEffect } from "react";
import React from 'react'
import { useNavigate } from "react-router-dom";

export const Protected = (props) => {
  const naviget = useNavigate();
  const {Component} = props;
  useEffect(() => {
    let login = localStorage.getItem('login');
    if(!login){
      localStorage.setItem("loginStatus", "please login to view the content");
      naviget('/', {replace: true})
    }
  }, [])
  return (
    <Component/>
  )
}
