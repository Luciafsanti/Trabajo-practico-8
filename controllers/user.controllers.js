const User = require('../models/').users;
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Middlewares

//const  getUsers = async () => {
//  const users = await User.findAll();
//  return users;
//}
//
const validateUser = [
  body('username').custom(value => {
  //  if (getUsers().map.some(user => user.username === value)) {
  //    console.log(User.findOne({ where: { username: value}}));
  //    return Promise.reject('El nombre de usuario ya existe.');
  //  }
    return true;
  }),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  body('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
    .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.')
];


const userValidationRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

//funciones de la aplicacion

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
  console.log(users);
};

async function getUserById(req, res) {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
}

const createUser = async (req, res) => {
  let { username, password, email } = req.body;
  password = bcrypt.hashSync(password, 10);
  const user = await User.create({ username, password, email });
  res.json(user);
};

const updateUser = async (req, res) => {
  let userId = req.params.userId;
  let user = User.findByPk(userId);
  if (user) {
    let { newUsername, newPassword, newEmail } = req.body;
    if (!newPassword) {
      newPassword = user.password
    } else {
      newPassword = bcrypt.hashSync(newPassword, 10);
    }
    if (newUsername !== undefined || newPassword !== undefined || newEmail !== undefined) {
      await User.update({ username: newUsername || user.username, password: newPassword || user.password, email: newEmail || user.email }, {
        where: {
          user_id: userId
        }
      });
      res.status(200).json({ message: `User "${userId}" updated successfully` });
    } else {
      res.status(404).json({ message: `Faltan nuevos datos` });
    }
  } else {
    res.status(404).json({ message: `User "${userId}" not found` });
  }
}

const deleteUser = async (req, res) => {
  let userId = req.params.userId;
  if (User.findByPk(userId)) {
    await User.destroy({
      where: {
        user_id: userId
      }
    });
    res.status(200).json({ message: `User "${userId}" deleted successfully` });
  }
}

//console.log(User);

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  validateUser,
  userValidationRules
};