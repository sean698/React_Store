import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
import 'css/app.scss';  //放在index下使全局生效
import 'commons/auth';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
    <div>
        <Router /> 
        <ToastContainer 
            position={"top-left"}
            autoClose={3000} 
        />
    </div>,
    document.getElementById('root')
);