const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const garages = data.garages;
const users = data.users;
async function main() {
    console.log("started populating database");
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    

    // users

    const js = await users.createUser("John Smith","johnsmith@gmail.com","Jsmith123!");
    const ek = await users.createUser("Elizabeth Krasu", "elizabeth2631.karus@gmail.com","erW#125dfDs");
    const jb = await users.createUser("Jason Brown", "brown.jason@gmail.com", "sd45ET3!ML");
    const rj = await users.createUser("Robert Jones", "jones.robert@gmail.com", "weASD!AIRIU13fy");
    const jt = await users.createUser("Joseph Taylor", "jose234.taylor@gmail.com", "asdTY#12gh");

    const pm = await users.createUser("Paul Martin", "paul256.martin@gmail.com", "pmarTIn256A!I");
    const rl = await users.createUser("Ryan Lee", "ryan123.lee@gmail.com", "ryAnlee34Fd!a");
    const jw = await users.createUser("John White", "john252.white@gmail.com", "Jwhite123!dfAs");
    const ph = await users.createUser("Peter Hill", "peter612.hill@gmail.com", "peterHill123!sd");
    const jg = await users.createUser("Joe Green", "joe1021.green@gmail.com", "joe10AIG@3grA2sd");

    const fc = await users.createUser("Fred Carter", "fred345.carter@gmail.com", "fc2@78AIGey12f");
    const se = await users.createUser("Steve Evans", "ste249.evans@gmail.com", "zYste3@4RFse10Sd");
    const jm = await users.createUser("Jimmy Morris", "jimmy1208.morris@gmail.com", "jimmy!Morris1208yes");
    const dc = await users.createUser("Danny Cook", "danny1203.cook@gmail.com", "danny1203!Cook3e");
    const mk = await users.createUser("Marvin Kim", "marvin1123.kim@gmail.com", "marMRT@345wer");

    const tb = await users.createUser("Troy Brooks", "troy921.brooks@gmail.com", "troy921T!roy");
    const mg = await users.createUser("Mario Gray", "mario213.gray@gmail.com", "mario123Gray#Agml");
    const jp = await users.createUser("Jay Price", "rtas45.price@gmail.com", "rtas45RTY!Aj");
    const lh = await users.createUser("Leo Hughes", "leo414.hughes@gmail.com", "leo414Hugh#df");
    const th = await users.createUser("Tim Harris", "tim312.harris@gmail.com", "tim345!AUYh2j");


    // garages
    const Meineke = await garages.creategarage("Meineke Car Care Center", "Jersey City, New Jersey", "201-299-6390", "https://www.meineke.com/locations/nj/north-arlington-456/", [], {pickuppart: true, maintainance: true, delivercar: false}, js);
    const Firestone = await garages.creategarage("Firestone Complete Auto Care", "Jersey City, New Jersey", "201-918-3214", "https://local.firestonecompleteautocare.com/new-jersey/jersey-city/70-nj-139/?utm_source=google&utm_medium=organic&utm_campaign=localmaps&lw_cmp=oloc_google_localmaps_maps", [], {pickuppart: true, maintainance: true, delivercar: true}, ek);
    const Broadway = await garages.creategarage('Broadway Sunoco Service', "Jersey City, New Jersey", "201-641-7243", "https://www.broadwaysunocoservice.com/", [], {pickuppart: true, maintainance: true, delivercar: true}, jb);
    
    const Ludlow = await garages.creategarage("Ludlow Garage", "New York City, New York", "212-505-0869", "http://ludlowgarage.com", [], { pickuppart: true, maintainance: true, delivercar: true }, rj);
    const Jack = await garages.creategarage("Jack's Service Garage", "Jersey City, New Jersey", "201-656-3321", "https://jacksservicegarage.wixsite.com/website", [], { pickuppart: true, maintainance: true, delivercar: false }, jt);
    const Cunha = await garages.creategarage("CUNHA'S GARAGE", "Newark, New Jersey", "973-991-3697", "https://cunhas-garage.business.site", [], { pickuppart: false, maintainance: true, delivercar: true }, pm);
    const Door = await garages.creategarage("Garage Door Solutions LLC", "Brooklyn, New York", "718-213-1147", "https://garagedoorsolutionsllc-garagedoorsupplier.business.site/?utm_source=gmb&utm_medium=referral", [], { pickuppart: true, maintainance: true, delivercar: true }, rl);
    const Schermerhorn = await garages.creategarage("200 Schermerhorn St Garage", "Brooklyn, New York", "718-858-8046", "https://www.spotangels.com/map?lng=-73.9847062669309&lat=40.68822255134751&zoom=15#id=2152143", [], { pickuppart: true, maintainance: true, delivercar: false }, jw);

    const Clinton = await garages.creategarage("Clinton Hill Garage", "Brooklyn, New York", "347-602-3636", "https://www.parkme.com/lot/16840/clinton-hill-garage-new-york-ny", [], { pickuppart: true, maintainance: true, delivercar: true }, ph);
    const Sylvan = await garages.creategarage("Sylvan Jefferson Garage LLC", "Hoboken, New Jersey", "201-420-1131", "https://www.sylvanparking.com/sylvan-jefferson-garage.html", [], {pickuppart: true, maintainance: true, delivercar: true }, jg);
    const Sovereign = await garages.creategarage("Sovereign Garage, LLC", "Hoboken, New Jersey", "221-714-3571", "https://littlemanparking.com", [], { pickuppart: true, maintainance: true, delivercar: true }, fc);
    const Paul = await garages.creategarage("Paul's Garage - Union", "Union, New Jersey", "908-687-1449", "http://www.pauls-garage.net", [], { pickuppart: true, maintainance: true, delivercar:false}, se);
    const Newcounty = await garages.creategarage("New County Garage", "Staten Island, New York", "718-448-0350", "https://www.newcountygarage.com", [], { pickuppart: true, maintainance: true, delivercar: false }, jm);

    // const John = await garages.creategarage("John's Garage of Westfield", "Westfield, New Jersey", "908-232-9717", "https://johnsgarageofwestfield.business.site", 3.8, {pickuppart: true, maintainance: true, delivercar: false});
    // const Ozkar = await garages.creategarage("Ozkar Garage LLC", "Linden, New Jersey", "908-967-4091", "https://ozkargarage.com", 4.8, {pickuppart: true, maintainance: true, delivercar: false });
    // const Supercars = await garages.creategarage("Supercars Garage", "Metuchen, New Jersey", "732-231-2822", "https://www.supercarsgarage.com", 4.6, { pickuppart: true, maintainance: true, delivercar: false });
    // const StatenIslandGarage = await garages.creategarage("Staten Island Garage Doors & Repair","Staten Island, New York", "347-951-8868", "https://garagedoorsstatenisland.com", 5, { pickuppart: true, maintainance: true, delivercar: true }); 
    // const Legendary = await garages.creategarage("LEGENDARY CLASSIC CAR GARAGE", "Staten Island, New York", "718-442-7078", "https://legendary-classic-car-garage.business.site", 4.9, { pickuppart: true, maintainance: true, delivercar: false });

    // const Tiger = await garages.creategarage("Tiger Garage", "Princeton, New Jersey", "609-924-0609", "https://tigergarage.mechanicnet.com", 4.6,{pickuppart: true, maintainance: true, delivercar: true});
    // const Kingston = await garages.creategarage("Kingston", "Kingston, New Jersey", "609-921-6134", "https://kingstongarage.com", 4.7,{pickuppart: true, maintainance: true, delivercar: true});


    
    console.log('Done seeding database');
    await dbConnection.closeConnection();
}

main();
