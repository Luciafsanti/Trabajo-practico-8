const path = require('path');
const dataPath = path.join(__dirname, "../model/users.json");
const CRUD = require('./CRUD');
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
    res.json(CRUD.read(dataPath));
}

const userExists = (userId) => {
    return ([...CRUD.read(dataPath)].some(u => u.id === userId));
}

const getUserById = (req, res) => {
    let userId = req.params.userId;
    if (userExists(userId)){
        let user = CRUD.read(dataPath).find(u => u.id === userId);
        res.json(user);
    }
    else {
        res.status(404).json({ message: `Cannot find user "${userId}"` });
    }
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
    if (userExists(newUser.id)) {
        res.status(201).json({ message: "User created successfully" });
    }
    else {
        res.status(404).json({ message: `Could not create user "${newUser.userId}"` });
    }
}
const updateUser = (req, res) => {
    let userId = req.params.userId;
    if (userExists(userId)) {
        let user = CRUD.read(dataPath).find(u => u.id === userId);
        user.username = req.body.newUsername;
        user.password =  bcrypt.hashSync(req.body.newPassword, 10)
        CRUD.update(user, dataPath);
        res.status(200).json({ message: `User "${userId}" updated successfully` });
    }
    else {
        res.status(404).json({ message: `Cannot update, user "${userId}" not found` });
    }
}

const deleteUser = (req, res) => {
    let userId = req.params.userId;
    if (userExists(userId)) {
        CRUD.deleteObject(userId, dataPath);
        res.status(200).json({ message: `User "${userId}" deleted successfully` });
    }
    else {
        res.status(404).json({ message: `Cannot delete, user "${userId}" not found` });
    }
}

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}