import React, { useState } from 'react';
import axios from 'axios';

const AddUser = (props) => {

    const { history } = props;

    const inputAdd = {
        uname: "",
        uaddress: "",
        uclass: "",
        uphone: "",
    };

    const usrErorr = {
        uname: "",
        uaddress: "",
        uclass: "",
        uphone: "",
    };

      const [values, setValues] = useState(inputAdd);

      const [uErr, setuErr] = useState(usrErorr);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
      };

      const addUser = () => {
        axios.post("/users/add", values)
        .then(res => { 
            if (res) { history.push("/") }
        })
        .catch(err => {
            const errors = err.response.data.errors;
            const {uname, uaddress, uclass, uphone} = errors;
            setuErr({
                ...uErr,
                uname,
                uaddress,
                uclass,
                uphone,
            })
        })
      }

    return (
        <div id="main-content">
            <h2>Add New User</h2>
            <div className="post-form">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="uname" value={values.uname} onChange={handleInputChange} />
                    <div id="m_err">{uErr.uname}</div>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="uaddress" value={values.uaddress} onChange={handleInputChange} />
                    <div id="m_err">{uErr.uaddress}</div>
                </div>
                <div className="form-group">
                    <label>Class</label>
                    <input type="text" name="uclass" value={values.uclass} onChange={handleInputChange} />
                    <div id="m_err">{uErr.uclass}</div>
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="uphone" value={values.uphone} onChange={handleInputChange} />
                    <div id="m_err">{uErr.uphone}</div>
                </div>
                <button className="submit" onClick={addUser}>Save</button>
            </div>
        </div>
    );
}

export default AddUser;