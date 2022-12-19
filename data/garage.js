const garages = require('../models/garage')

module.exports = {
  async getgarage(id) {
    if (!id) 
      throw 'You must provide an id to search for';

    if (typeof id !== 'string' || !id.trim().replace(/\s/g, "").length)
      throw 'Please provide a valid ID for the garage'

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID';

    const garageCollection = garages;
    const garage = await garageCollection.findOne({ _id: ObjectId(id) });

    if (garage === null)
      throw 'No garage with that id';

    garage._id = garage._id.toString();
    return garage;
  },

  async getAllgarages() {
    if(arguments.length > 0)
      throw 'Arguements are given to the fuction which is not allowed'

    const garageCollection = garages;

    const garageList = await garageCollection.find({});

    garageList.forEach(element => {
      element._id = element._id.toString();
    });

    return garageList;
  },

  async creategarage(name, location, phoneNumber, website, overallRating, serviceOptions, owner_id) {
    if (!name || !location || !phoneNumber || !website || !overallRating || !serviceOptions || !owner_id)
      throw 'You must provide all valid inputs for your garage';

    let phoneNo = /^\d{3}?(-)\d{3}(-)\d{4}$/;

    if (typeof name != 'string' || typeof location != 'string' || typeof phoneNumber != 'string' || typeof website != 'string' )
      throw 'please enter a valid string for your inputs';

    if(!name.trim().replace(/\s/g, "").length || !location.trim().replace(/\s/g, "").length || !phoneNumber.trim().replace(/\s/g, "").length || !website.trim().replace(/\s/g, "").length)
      throw 'Only empty spaces in the strings are not allowed'

    if(!phoneNo.test(phoneNumber))
      throw 'Phone number does not follow proper format'


    if(typeof overallRating !== 'number' || overallRating < 0 || overallRating > 5)
      throw 'Overall rating is not valid. Please provide a valid rating'
      
    if (typeof serviceOptions !== 'object') 
      throw 'Service options should be an object';

    const garageCollection = garages;

    const samegarage = await garageCollection.findOne({ name: name, location: location, phoneNumber: phoneNumber });
    
    if (samegarage !== null)
      throw 'garage you are trying to add already exists. Please change Name, Location or Phone number of the garage';

    let newgarage = new garageCollection({
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      owner_id: owner_id,
      website: website,
      overallRating: overallRating,
      serviceOptions: serviceOptions
    });

    const insertInfo = await newgarage.save(newgarage);
    if (insertInfo.insertedCount === 0) 
      throw 'Could not add new garage';

    const newId = insertInfo.insertedId;

    // const garage = await this.get(newId.toString());
    return newId;
  },

  async removegarage(id) {
    if (!id)
      throw 'You must provide an id to search for';

    if(typeof id !== 'string' || !id.replace(/\s/g, "").length)
      throw 'Please provide a valid ID for removal of garage';

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID';

    const garageCollection = garages;
    const garage = await garageCollection.findOne({ _id: ObjectId(id) });

    if (garage === null)
      throw 'No garage present with that id to delete';

    const deletionInfo = await garageCollection.deleteOne({ _id: ObjectId(id) });

    if(deletionInfo.deletedCount === 0) { 
      throw `Could not delete garage with id of ${id}`;
    }
    return `${garage.name} has been successfully deleted!`;
  },

  async renamegarage(id, newWebsite) {
    if (!id) 
      throw 'You must provide an id to search for';

    if (!newWebsite) 
      throw 'You must provide a name for your website';

    if (typeof id != 'string' || !id.trim().replace(/\s/g, "").length)
      throw 'Please provide a valid ID for the garage'

    if(!ObjectId.isValid(id))
      throw 'The ID is not a valid Object ID'

    let pattern = /^(http(s?):\/\/www\.)(.){5,}(\.com)$/i;

    if (typeof newWebsite !== 'string' || !pattern.test(newWebsite.trim()))
      throw 'please enter a valid input for your new website';

    let tempUrl = newWebsite.toLowerCase();

    const garageCollection = garages;

    const garage = await garageCollection.findOne({ _id: ObjectId(id) });

    if (garage === null)
      throw 'No garage present with that id to update';

    if(garage.website.toLowerCase() === tempUrl)
      throw 'The new URL provided is same as the old one';

    const updatedgarage = {
      website: newWebsite
    };

    const updatedInfo = await garageCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedgarage }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw 'could not update garage successfully';
    }
    return await this.get(id);
  }
};