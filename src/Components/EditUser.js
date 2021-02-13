import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

const EditUser = (props) => {

    const { history } = props;

    const { match } = props;

    const uid = match.params.id;

    const inputEdit = {
        _id: "",
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

    const [values, setValues] = useState(inputEdit);

    const [hasuser, setHasUser] = useState(false);

    const [uErr, setuErr] = useState(usrErorr);

    useEffect(() => {

        let isMounted = true;

        if (isMounted) {
            axios.get(`http://localhost:5000/users/${uid}`)
                .then(res => {
                    const response = res.data;
                    if (response) {
                        setHasUser(true);
                        setValues({
                            ...values,
                            _id: response._id,
                            uname: response.uname,
                            uaddress: response.uaddress,
                            uclass: response.uclass,
                            uphone: response.uphone,
                        })
                    } else {
                        setHasUser(true);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }



    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const updateUser = () => {

        axios.post(`http://localhost:5000/users/update/${uid}`, values)
            .then(res => {
                console.log("User Update !!");
                if (res) { history.push("/") }
            })
            .catch(err => {
                const errors = err.response.data.errors;
                const { uname, uaddress, uclass, uphone } = errors;
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
            {!hasuser ? <div className="loader"><Loader
                type="Audio"
                color="#c71165"
                height={50}
                width={50}
            /></div> : <>
                    <h2>Update User</h2>
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
                        <button className="submit" onClick={updateUser}>Save</button>
                    </div>
                </>}
        </div>
    );
}

export default EditUser;