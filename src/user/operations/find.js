const UserSchema = require('../shema/User')
const { v4: uuidv4 } = require('uuid');

 async function findOrCreateUser (user) {
    if(user?.email == null) return;

    const userExists = await UserSchema.findOne({email: user?.email})
    if (userExists) return userExists

    return UserSchema.create({
        _id:uuidv4(), 
        name: user.name, 
        email: user.email,
        imageUrl: user.imageUrl
    })
}

module.exports = {
    findOrCreateUser
}