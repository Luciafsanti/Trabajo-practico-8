const path = require('path');
const dataPath = path.join(__dirname, "../model/users.json");
const CRUD = require('./CRUD');
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Middlewares

const userExists = (req, res, next) => {
    let userId = req.params.userId;
    if (![...CRUD.read(dataPath)].some(u => u.id === userId)) {
        return res.status(404).json({ message: `User "${userId}" does not exist` });
    };
    next();
}

const validateUser = [
    body('username').custom(value => {
    const users = CRUD.read(dataPath);
      if (users.some(user => user.username === value)) {
        return Promise.reject('El nombre de usuario ya existe.');
      }
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

const getUsers = (req, res) => {
    res.json(CRUD.read(dataPath));
}

const getUserById = (req, res) => {
    let userId = req.params.userId;
    let user = CRUD.read(dataPath).find(u => u.id === userId);
    res.json(user);
}

const setUserId = () => {
    const users = CRUD.read(dataPath);
    let maxId = Math.max(...users.map(u => (u.id.split("U"))[1]));
    if (maxId === -Infinity) {
        maxId = 0;
    }
    let newUserId = maxId + 1;
    newUserId = "U" + newUserId;
    return newUserId;
}

const createUser = (req, res) => {
    let newUser =
    {
        id: setUserId(),
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    CRUD.create(newUser, dataPath);
    res.status(201).json({ message: "User created successfully" });
}
const updateUser = (req, res) => {
    let userId = req.params.userId;
    let user = CRUD.read(dataPath).find(u => u.id === userId);
    user.username = req.body.newUsername;
    user.password = bcrypt.hashSync(req.body.newPassword, 10)
    CRUD.update(user, dataPath);
    res.status(200).json({ message: `User "${userId}" updated successfully` });
}

const deleteUser = (req, res) => {
    let userId = req.params.userId;
    CRUD.deleteObject(userId, dataPath);
    res.status(200).json({ message: `User "${userId}" deleted successfully` });
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    userExists,
    validateUser,
    userValidationRules
}