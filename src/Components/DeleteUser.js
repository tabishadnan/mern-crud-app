import axios from 'axios';
import React, { useState } from 'react';

const DeleteUser = (props) => {

    const { history } = props;

    const [uid, setUid] = useState("");

    const deleteUser = (evt) => {
        evt.preventDefault();

        axios.delete(`/users/delete/${uid}`)
        .then(res => { 
            console.log("User Deleted !!");
            if(res){ history.push("/")}
        })
        .catch(err => {
            console.log("some error occured");
        })
      }

    return (
        <div id="main-content">
            <h2>Delete User</h2>
            <div class="post-form" method="post">
                <div class="form-group">
                    <label>Id</label>
                    <input type="text" name="uid" value={uid} onChange={(e) => setUid(e.target.value)} />
                </div>
                <button className="submit" onClick={deleteUser}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteUser;
