const User = require('../models/user');

exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
        console.log(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
};

exports.createUser = (req, res) => {
  const { name, email, password, balance } = req.body;

  if (!name || !email || !password || !balance) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    balance: balance
  });

  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create user' });
    });
};
