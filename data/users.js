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
    const userID = getMovieById(newId);
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

const getuser = async(id) => {
    if (!id) 
      throw 'You must provide an id to search for';

    if (typeof id !== 'string' || !id.trim().replace(/\s/g, "").length)
      throw 'Please provide a valid ID for the user'

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID';

    const userCollection = await users();
    const user = await userCollection.findOne({ _id: ObjectId(id) });

    if (user === null)
      throw 'No user with that id';

    user._id = user._id.toString();
    return user;
}

const searchGarage = async (searchGarageName) => {
    const garage = await axios.get();
    let res = garage.data.filter(x => `${x.garageName}`.toUpperCase().includes(searchGarageName.toUpperCase())).slice(0,20);
    res = {name:res.map(x => `${x.garageName}`),id: res.map(x =>x.id)}
    return res;
};

module.exports = {
    createUser,
    checkUser,
    favoriteOfUser,
    getHistory,
    getuser,
    searchGarage
};