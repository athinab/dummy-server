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
      ];

  for (var i = 0; i < 50; i++) {
    var id = i * 100 + 11;

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

  return {
    "donations": donations,
    "profile": profile,
    "hospitals": hospitals,
    "coverages": coverages,
    "config": config
  };
};

module.exports = generateDB;
