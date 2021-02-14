const router = require('express').Router();
let User = require('../models/user.model');


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { uname: '', uaddress: '', uclass: '', uphone: '',};

    // validation errors
    if (err.message.includes('users validation failed')) {
        console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// get all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add todo
router.route('/add').post((req, res) => {
    const { uname, uaddress, uclass, uphone } = req.body;

    const newUser = new User({ uname, uaddress, uclass, uphone });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
        });
});

// delete user by id
router.route('/delete/:id').delete((req, res) => {
    const tId = req.params.id;
    User.findByIdAndDelete(tId)
        .then(() => res.json('User Delete!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// find user by id
router.route('/:id').get((req, res) => {
    const tId = req.params.id;
    User.findById(tId)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

// eidt user by id
router.route('/update/:id').post((req, res) => {

    const tId = req.params.id;

    User.findById(tId)
        .then(user => {

            const {uname, uaddress, uclass, uphone} = req.body;

            user.uname = uname;
            user.uaddress = uaddress;
            user.uclass = uclass;
            user.uphone = uphone;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => {
                    const errors = handleErrors(err);
                    res.status(400).json({ errors });
                });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;