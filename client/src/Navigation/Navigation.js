import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div>
            <div id="header">
                <h1>Mern Crud</h1>
            </div>
            <div id="menu">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/add">Add</Link>
                    </li>
                    <li>
                        <Link to="/delete">Delete</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navigation;