var mongoose = require('mongoose');
var garage = require('../data/garage')



async function main() {
mongoose.connect('mongodb+srv://arya:arya.123@cluster0.njyy5y4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});
    // garage
    const Meineke = await garage.creategarage("Meineke Car Care Center", "Jersey City, New Jersey", "201-299-6390", "https://www.meineke.com/locations/nj/north-arlington-456/", 4, {pickuppart: true, maintainance: true, delivercar: false});
    const Firestone = await garage.creategarage("Firestone Complete Auto Care", "Jersey City, New Jersey", "201-918-3214", "https://local.firestonecompleteautocare.com/new-jersey/jersey-city/70-nj-139/?utm_source=google&utm_medium=organic&utm_campaign=localmaps&lw_cmp=oloc_google_localmaps_maps", 3, {pickuppart: true, maintainance: true, delivercar: true});
    const Broadway = await garage.creategarage('Broadway Sunoco Service', "Jersey City, New Jersey", "201-641-7243", "https://www.broadwaysunocoservice.com/", 4, {pickuppart: true, maintainance: true, delivercar: true});
    
    const Ludlow = await garage.creategarage("Ludlow Garage", "New York City, New York", "212-505-0869", "http://ludlowgarage.com", 4.3, { pickuppart: true, maintainance: true, delivercar: true });
    const Jack = await garage.creategarage("Jack's Service Garage", "Jersey City, New Jersey", "201-656-3321", "https://jacksservicegarage.wixsite.com/website", 4.6, { pickuppart: true, maintainance: true, delivercar: false });
    const Cunha = await garage.creategarage("CUNHA'S GARAGE", "Newark, New Jersey", "973-991-3697", "https://cunhas-garage.business.site", 5, { pickuppart: false, maintainance: true, delivercar: true });
    const Door = await garage.creategarage("Garage Door Solutions LLC", "Brooklyn, New York", "718-213-1147", "https://garagedoorsolutionsllc-garagedoorsupplier.business.site/?utm_source=gmb&utm_medium=referral", 5, { pickuppart: true, maintainance: true, delivercar: true });
    const Schermerhorn = await garage.creategarage("200 Schermerhorn St Garage", "Brooklyn, New York", "718-858-8046", "https://www.spotangels.com/map?lng=-73.9847062669309&lat=40.68822255134751&zoom=15#id=2152143", 4, { pickuppart: true, maintainance: true, delivercar: false });

    const Clinton = await garage.creategarage("Clinton Hill Garage", "Brooklyn, New York", "347-602-3636", "https://www.parkme.com/lot/16840/clinton-hill-garage-new-york-ny", 4, { pickuppart: true, maintainance: true, delivercar: true });
    const Sylvan = await garage.creategarage("Sylvan Jefferson Garage LLC", "Hoboken, New Jersey", "201-420-1131", "https://www.sylvanparking.com/sylvan-jefferson-garage.html", 3.3, {pickuppart: true, maintainance: true, delivercar: true });
    const Sovereign = await garage.creategarage("Sovereign Garage, LLC", "Hoboken, New Jersey", "221-714-3571", "https://littlemanparking.com", 3.9, { pickuppart: true, maintainance: true, delivercar: true });
    const Paul = await garage.creategarage("Paul's Garage - Union", "Union, New Jersey", "908-687-1449", "http://www.pauls-garage.net", 4.4, { pickuppart: true, maintainance: true, delivercar:false});
    const Newcounty = await garage.creategarage("New County Garage", "Staten Island, New York", "718-448-0350", "https://www.newcountygarage.com", 4.4, { pickuppart: true, maintainance: true, delivercar: false });

    const John = await garage.creategarage("John's Garage of Westfield", "Westfield, New Jersey", "908-232-9717", "https://johnsgarageofwestfield.business.site", 3.8, {pickuppart: true, maintainance: true, delivercar: false});
    const Ozkar = await garage.creategarage("Ozkar Garage LLC", "Linden, New Jersey", "908-967-4091", "https://ozkargarage.com", 4.8, {pickuppart: true, maintainance: true, delivercar: false });
    const Supercars = await garage.creategarage("Supercars Garage", "Metuchen, New Jersey", "732-231-2822", "https://www.supercarsgarage.com", 4.6, { pickuppart: true, maintainance: true, delivercar: false });
    const StatenIslandGarage = await garage.creategarage("Staten Island Garage Doors & Repair","Staten Island, New York", "347-951-8868", "https://garagedoorsstatenisland.com", 5, { pickuppart: true, maintainance: true, delivercar: true }); 
    const Legendary = await garage.creategarage("LEGENDARY CLASSIC CAR GARAGE", "Staten Island, New York", "718-442-7078", "https://legendary-classic-car-garage.business.site", 4.9, { pickuppart: true, maintainance: true, delivercar: false });

    const Tiger = await garage.creategarage("Tiger Garage", "Princeton, New Jersey", "609-924-0609", "https://tigergarage.mechanicnet.com", 4.6,{pickuppart: true, maintainance: true, delivercar: true});
    const Kingston = await garage.creategarage("Kingston", "Kingston, New Jersey", "609-921-6134", "https://kingstongarage.com", 4.7,{pickuppart: true, maintainance: true, delivercar: true});

    
    console.log('Done seeding database');
    // await db.serverConfig.close();
}

main()