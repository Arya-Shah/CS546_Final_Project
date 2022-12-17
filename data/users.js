const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 16;


const createUser = async (
    username, password
) => {
    if (!username ||
        !password) throw new Error('All fields need to have valid values');
    if (typeof username != 'string') throw new Error('error');

    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const userCollection = await users();  
    let newUser = {
        username: username,
        password: hash,
    };

    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add User';
    const newId = insertInfo.insertedId.toString();
    const userID = await this.get(newId.toString());
    return userID;
};

const checkUser = async (username, password) => {
    try {
        if (!username ||
            !password) throw new Error('All fields need to have valid values');
        if (typeof username != 'string') throw new Error('error');

        const userCollection = await users();
        const userExist = await userCollection.findOne({ name: username });
        if (!userExist) return { msg: "Either the username or password is invalid" }
        const compare = await bcrypt.compare(password, userExist.password, saltRounds)
        if (compare) {
            return { authenticatedUser: true };
        } else {
            return { msg: "Either the username or password is invalid" }
        }

    } catch (e) {
        console.log(e)
    }
};

const getHistory = async(id) =>{
    try{
        const userCollection = await users();
        const userExist = await userCollection.findOne({ id: id_ });
        if (!userExist) return { msg: "Either the username or password is invalid" }
        return userExist.history;
    

    }catch(e){
        throw(`History Error:${e}`)
    }
}

const favoriteOfUser = async(id,favoriteGarage) => {
    try{
    let favorites_ = await getFavorites(id);
    favorites_ = favorites_.push(favoriteGarage);
    await setFavorite(id,favorites_);
    }catch(e){
        console.log(`Favorite Error:${e}`);
    }
}
const getFavorites = async(id_) =>{
    const userCollection = await users();  
    const userExist = await userCollection.findOne({ id: id_ });
    if (!userExist) return { msg: "Either the username or password is invalid" }
    return userExist.favorite

}

const setFavorite = async(_id,favorite_) =>{
    try{
    const userCollection = await users();  
    const userExist = await userCollection.findOne({ id: id_ });
    if (!userExist) return { msg: "Either the username or password is invalid" }
    const myquery = { id: _id};
    const newFavorite = { $set: {favorite: favorite_} };
    await userCollection.updateOne(myquery,newFavorite)
    }catch(e){
        console.log(`Error favorit:${e}`);
    }
}

const searchGarage = async (searchGarageName) => {
    const garage = await axios.get();
    let res = garage.data.filter(x => `${x.garageName}`.toUpperCase().includes(searchGarageName.toUpperCase())).slice(0,20);
    res = {name:res.map(x => `${x.garageName}`),id: res.map(x =>x.id)}
    return res;
};

const schedule = async(_id,garageName) =>{
    try{
    const userCollection = await users(); 
    const garageCollection = await garage() 
    const userExist = await userCollection.findOne({ id: id_ });
    const garageExist = await garageCollection.findOne({ name: garageName });
    if (!garageExist) return { msg: "Either the username or password is invalid" }
    if (!userExist) return { msg: "Either the userna`me or password is invalid" }
    const time = new Date().toISOString()
    const userName = userExist.name;
        const createAppointment = {
            garage_name: garageName,
            user_name: userName,
            time: time 
        }
    const insertInfo = await appointment.insertOne(createAppointment);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not add User';
    const newId = insertInfo.insertedId.toString();
    const userID = getMovieById(newId);
    return userID;

    
    }catch(e){
        console.log(`Error favorit:${e}`);
    }
}

module.exports = {
    createUser,
    checkUser,
    favoriteOfUser,
    getHistory,
    searchGarage,
    schedule
};