import React from 'react';
import { Redirect, Route, redirect, useNavigate } from 'react-router-dom';

function PrivateRoute ({ component: Component, ...rest }) {
    const navigate = useNavigate();
    return (
        <Route />
    )
}

export default PrivateRoute;