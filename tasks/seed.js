const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const garages = data.garages;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    // garages
    const Meineke = await garages.create("Meineke Car Care Center", "Jersey City, New Jersey", "201-299-6390", "https://www.meineke.com/locations/nj/north-arlington-456/", 4, {pickuppart: true, maintainance: true, delivercar: false});
    const Firestone = await garages.create("Firestone Complete Auto Care", "Jersey City, New Jersey", "201-918-3214", "https://local.firestonecompleteautocare.com/new-jersey/jersey-city/70-nj-139/?utm_source=google&utm_medium=organic&utm_campaign=localmaps&lw_cmp=oloc_google_localmaps_maps", 3, {pickuppart: true, maintainance: true, delivercar: true});
    const Broadway = await garages.create('Broadway Sunoco Service', "Jersey City, New Jersey", "201-641-7243", "https://www.broadwaysunocoservice.com/", 4, {pickuppart: true, maintainance: true, delivercar: true});
    
    console.log('Done seeding database');
    await db.serverConfig.close();
}

main();
