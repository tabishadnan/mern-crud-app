import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner'

const Users = () => {

    const [users, setUsers] = useState([]);

    const [hasusers, setHasUsers] = useState(false);

    useEffect(() => {

        let isMounted = true;

        if (isMounted) {
            axios.get("http://localhost:5000/users")
                .then(res => {
                    const response = res.data;
                    if (response) {
                        setUsers(response);
                        setHasUsers(true);
                    } else {
                        setHasUsers(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

    });

    const deleteUser = (uid) => {

        axios.delete(`http://localhost:5000/users/delete/${uid}`)
            .then(res => {
                console.log("User Deleted !!");
            })
            .catch(err => {
                console.log("some error occured");
            })
    }

    return (
        <div id="main-content">
            {!hasusers ? <div className="loader"><Loader
                type="Audio"
                color="#c71165"
                height={50}
                width={50}
            /></div> : <>
                    {users.length > 0 ? <>
                        <h2>All Users</h2>
                        <table cellPadding="7px">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Class</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!users && users.map((user, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.uname}</td>
                                        <td>{user.uaddress}</td>
                                        <td>{user.uclass}</td>
                                        <td>{user.uphone}</td>
                                        <td>
                                            <Link to={`/edit/${user._id}`}>Edit</Link>
                                            <Link to="/" onClick={() => deleteUser(user._id)}>Delete</Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </> : <div className="no-found">No User Found !!!</div>}
                </>}
        </div>
    );
}

export default Users;