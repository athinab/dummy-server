var faker = require('faker');
var bdrCities = require('./bdrCities');
var bdrRegions = require('./bdrRegions');
var photo = require('./bdrPhoto');

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
      donorCardStatuses = [
        'PENDING',
        'SUBMITTED',
        'APPROVED',
        'SENT',
        'READY',
        'DELIVERED',
        'LOST',
        'REJECTED',
        'CANCELLED',
      ],
      donorCards = [],
      oldDonations = [],
      municipalities = [];

  function parseCities(cities) {
    return cities.map(function(city) {
      let regionID = city.prefecture.region.id;
      delete city.prefecture;
      Object.assign(city, {regionID: regionID});
      return city;
    });
  };
  var municipalities = parseCities(bdrCities);
  for (var i = 0; i < 50; i++) {
    var id = i * 100 + 11;


    var donatedAt = faker.date.past(10).toISOString().slice(0, 10),
    // var donatedAt = "lalalallalalala".slice(0,10),
        donationIndex = Math.floor(Math.random() * 4),
        donationType = donationTypes[donationIndex],
        donationID = id * 13,
        oldDonationID = id * 23,
        coverageID = id * 7,
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
    var hospitalID = id,
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

    // I want a lot of zeros
    var countVol = Math.floor(Math.random()*2) ? Math.floor(Math.random()*10) : 0,
        countPat = Math.floor(Math.random()*2) ? Math.floor(Math.random()*10) : 0,
        countCov = Math.floor(Math.random()*2) ? Math.floor(Math.random()*10) : 0,
        countBda = Math.floor(Math.random()*2) ? Math.floor(Math.random()*10) : 0,
        ama = Math.floor(Math.random()*2) ? 1550793035 : undefined,
        association = countBda ? faker.company.companyName() : undefined;
    var oldDonation = {
      "id": oldDonationID,
      "hospitalName": hospitalName,
      "volunteerDonations": countVol,
      "patientDonations": countPat,
      "coverages": countCov,
      "associationDonations": countBda,
      "associationName": association,
      "ama": ama,
    };

    donations.push(donation);
    coverages.push(coverage);
    hospitals.push(hospital);
    oldDonations.push(oldDonation);
  };

  var donorCardID = 127826;
  var tmpNum = 10
  for(var status in donorCardStatuses) {
    var donorCardStatus = donorCardStatuses[status];
    var donorCardRejectionReason = (donorCardStatus == 'REJECTED' ? faker.hacker.phrase() : undefined ),
    aka = faker.finance.account(12),
    id = donorCardID,
    tmpNum = tmpNum + 1,
    submittedAt= '12/12/'+ tmpNum,
    donorCardID = donorCardID + 133,
    donorCardSubmittedAt = (donorCardStatus != 'PENDING' ? submittedAt : undefined),
    distributionCenterData = {
        "id": (id - 100077),
        "title": faker.company.companyName(),
        "email": faker.internet.email(),
        "street": 'ΠΑΡΟΔΟΣ ΕΛ. ΒΕΝΙΖΕΛΟΥ',
        "streetNumber": 4,
        "zipcode": 64200,
        "municipality": bdrCities[11],
        "region": bdrRegions[0],
        "visitingHours": "Δευτέρα,Τετάρτη: 09:00-16:00, Τρίτη,Πέμπτη,Παρασκευή: 09:00-21:00, Σάββατο: 09:00-15:00", // TODO: can we form this str?
        "phoneNumber": "2103217123",
    },
    distributionCenter = (donorCardStatus === 'PENDING') ? undefined : distributionCenterData;

    var donorCard = {
      "id": id,
      "status": donorCardStatuses[status],
      "rejectionReason": donorCardRejectionReason,
      "submittedAt": donorCardSubmittedAt,
      "aka": aka,
      "photo": photo,
      // "email": "john@example.com",
      "cellNumber": "6971231234",
      "motherName": "ΑΝΝΑ",
      "motherNameLatin": "ANNA",
      "fatherName": "ΓΕΩΡΓΙΟΣ",
      "fatherNameLatin": "GEORGIOS",
      "firstName": "ΙΩΑΝΝΗΣ",
      "firstNameLatin": "IOANNIS",
      "lastName": "ΝΤΟΠΟΥΛΟΣ",
      "lastNameLatin": "DOPOULOS",
      "rhesus": "POSITIVE",
      "majorBloodGroup": "A",
      "distributionCenter": distributionCenter

    };
    donorCards.push(donorCard);
  }
    var donorCardExtra = {
      "id": 987899,
      "status": "PENDING",
      "submittedAt": '15/10/02',
      "aka": 12345566666,
      "photo": "photo",
      "email": "john@example.com",
      "motherName": "ΑΝΝΑ",
      "motherNameLatin": "ANNA",
      "fatherName": "ΓΕΩΡΓΙΟΣ",
      "fatherNameLatin": "GEORGIOS",
      "firstName": "ΙΩΑΝΝΗΣ",
      "firstNameLatin": "IOANNIS",
      "lastName": "ΝΤΟΠΟΥΛΟΣ",
      "lastNameLatin": "DOPOULOS",
      "rhesus": "POSITIVE",
      "majorBloodGroup": "A",
      "distributionCenter": {
        "id": 100987,
        "title": faker.company.companyName(),
        "email": faker.internet.email(),
        "street": 'ΠΑΡΟΔΟΣ ΕΛ. ΒΕΝΙΖΕΛΟΥ',
        "streetNumber": 4,
        "zipcode": 64200,
        "municipality": bdrCities[11],
        "region": bdrRegions[0],
        "visitingHours": "Δευτέρα,Τετάρτη: 09:00-16:00, Τρίτη,Πέμπτη,Παρασκευή: 09:00-21:00, Σάββατο: 09:00-15:00", // TODO: can we form this str?
        "phoneNumber": "2103217123",
      }
    };

  donorCards.push(donorCardExtra);

  var config = {
    endpoints: {
      captcha: 'https://service.bdr.gr/blood-donor-registry-web/rest/captcha',
      contact: 'https://service.bdr.gr/blood-donor-registry-web/rest/helpdeskissue',
      donations: 'http://83.212.98.164:3000/donations',
      coverages: 'http://83.212.98.164:3000/donations',
      nextDonation: 'http://83.212.98.164:3000/nextdonation',
      alert: 'http://83.212.98.164:3000/alert',
      donorCards: 'http://83.212.98.164:3000/donorcards',
    }
  };

  var alert = {
    status: "ACTIVE",
    // email: "john@example.org",
    mobile: "6957373291",
  };

  var nextDonation =  {
    donateAfter: "2018-01-04",
  };

  var profile = {
    "aka": "311712793038",
    "akaStatus": "APPROVED",
    "ama": "1550793035",
    "amka": "22012602054",
    "birthCountry": "ΕΛΛΑΔΑ",
    "birthDate": "1986-02-22",
    // "birthRegion": "ΑΝ. ΜΑΚΕΔΟΝΙΑΣ & ΘΡΑΚΗΣ",
    "bloodGroup": "Α2",
    "cellNumber": "6971231234",
    // "education": "LEVEL7",
    "municipality": bdrCities[100],
    "emailValid": true,
    "email": "john@example.com",
    "fatherName": "ΓΕΩΡΓΙΟΣ",
    "firstName": "ΙΩΑΝΝΗΣ",
    "gender": "MALE",
    "id": 12345,
    "identityDocuments": [{
      "type": "ast",
      "number": "ΑΧ 2134",
      "issueCountry": "ΕΛΛΑΔΑ"
    }, {
      "type": "amka",
      "number": "akma for the win",
      "issueCountry": "ΕΛΛΑΔΑ"
    }],
    "lastName": "ΝΤΟΠΟΥΛΟΣ",
    "majorBloodGroup": "A",
    "motherName": "ΑΝΝΑ",
    "phoneNumber": "2103217123",
    "region": bdrRegions[4],
    "rhesus": "POSITIVE",
    "smsValid": true,
    "status": "ACTIVE",
    // "street": "ΜΠΟΥΜΠΟΥΛΙΝΑΣ",
    "streetNumber": "10",
    "type": "BloodDonorUser",
    "username": "johnny",
    "zipcode": "14440"
  };


  return {
    "donations": donations,
    "users": [profile],
    "hospitals": hospitals,
    "coverages": coverages,
    "config": config,
    "regions": bdrRegions,
    "municipalities": municipalities,
    "alert": alert,
    "nextDonation": nextDonation,
    "donorCards": donorCards,
    "oldDonations": oldDonations,
  };
};

module.exports = generateDB;
