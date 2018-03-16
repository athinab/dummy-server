var faker = require('faker');

function generateDB () {
  var donations = [],
      hospitals = [],
      coverages = [],
      donationTypes = [
        'VOLUNTEER',
        'BLOODDONORASSOCIATION',
        'RELATIVE',
        'MILITARY'
      ],
      collectedComponents = [
        'Blood',
        'Platelets'
      ],
      municipalities = [];

  for (var i = 0; i < 50; i++) {
    var id = i * 100 + 11;

    var municipalityName = faker.address.city(),
        municipalityID = id,
        regionID = Math.floor(Math.random() * 13) + 1;
    var municipality = {
        name: municipalityName,
        id: municipalityID,
        region_id: regionID
    };

    var donatedAt = faker.date.past(10).toISOString().slice(0, 10),
    // var donatedAt = "lalalallalalala".slice(0,10),
        donationIndex = Math.floor(Math.random() * 4),
        donationType = donationTypes[donationIndex],
        donationID = 'donation_' + id,
        coverageID = 'kalipsi_' + id,
        collectedComponent = collectedComponents[Math.floor(Math.random() * 2)];
        // collectedComponent = collectedComponents[0];

    var date = new Date(donatedAt);
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }

    donatedAt = dd+'/'+mm+'/'+yyyy;
    var hospitalID = 'hospital_' + id,
        hospitalURL = 'http://83.212.98.164:3000/hospitals/' + hospitalID,
        hospitalName = faker.company.companyName();

    var hospital = {
      "id": hospitalID,
      "name": hospitalName
    };

    var donation = {
      "id": donationID,
      "donatedAt": donatedAt,
      "occasion": donationType,
      "hospitalName": hospitalName,
      "collectedComponent": collectedComponent
    };

    var coverage = {
      "id": coverageID,
      "reservedAt": donatedAt,
      "numOfBags": donationIndex + 1,
      "hospitalName": hospitalName,
    };

    donations.push(donation);
    coverages.push(coverage);
    hospitals.push(hospital);
    municipalities.push(municipality);
  };


  var config = {
    endpoints: {
      captcha: 'https://service.bdr.gr/blood-donor-registry-web/rest/captcha',
      contact: 'https://service.bdr.gr/blood-donor-registry-web/rest/helpdeskissue',
      donations: 'http://83.212.98.164:3000/donations',
      coverages: 'http://83.212.98.164:3000/donations'
    }
  };

  var profile = {
    id: 324156,
    username: faker.internet.userName(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName()
  };

  var regions = [
    {
      "id":1,
      "name":"AN. MAKEDONIAS & THRAKIS"
    },
    {
      "id":2,
      "name":"KENTRIKIS MAKEDONIAS"
    },
    {
      "id":3,
      "name":"DYTIKIS MAKEDONIAS"
    },
    {
      "id":4,
      "name":"IPEIROU"
    },
    {
      "id":5,
      "name":"THESSALIAS"
    },
    {
      "id":6,
      "name":"IONION NISON"
    },
    {
      "id":7,
      "name":"DYTIKIS ELLADAS"
    },
    {
      "id":8,
      "name":"STEREAS ELLADAS"
    },
    {
      "id":9,
      "name":"ATTIKIS"
    },
    {
      "id":10,
      "name":"PELOPONNISOU"
    },
    {
      "id":11,
      "name":"VOREIOU AIGAIOU"
    },
    {
      "id":12,
      "name":"NOTIOU AIGAIOU"
    },
    {
      "id":13,
      "name":"KRITIS"
    }
  ];

  return {
    "donations": donations,
    "profile": profile,
    "hospitals": hospitals,
    "coverages": coverages,
    "config": config,
    "regions": regions,
    "municipalities": municipalities
  };
};

module.exports = generateDB;
