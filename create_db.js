var faker = require('faker');
var bdrCities = require('./bdrCities');
var bdrRegions = require('./bdrRegions');

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
        coverageID = id * 7,
        collectedComponent = collectedComponents[Math.floor(Math.random() * 2)],
        // collectedComponent = collectedComponents[0];
        donorCardIndex = Math.floor(Math.random() * 9),
        donorCardStatus = donorCardStatuses[donorCardIndex],
        donorCardID = id *3,
        donorCardRejectionReason = (donorCardStatus == 'REJECTED' ? faker.hacker.phrase() : undefined ),
        aka = faker.finance.account(12),
        donorCardSubmittedAt;

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
    donorCardSubmittedAt = (donorCardStatus != 'PENDING' ? donatedAt : undefined);
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

    var donorCard = {
      "id": donorCardID,
      "status": donorCardStatus,
      "rejectionReason": donorCardRejectionReason,
      "submittedAt": donorCardSubmittedAt,
      "aka": aka,
    };

    donations.push(donation);
    coverages.push(coverage);
    hospitals.push(hospital);
    donorCards.push(donorCard);
  };


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
    email: "john@example.org",
    // mobile: "6957373291",
  };

  var nextDonation =  {
    donateAfter: "2018-01-04T22:00:00.000+0000",
  };

  var profile = {
    "aka": "311712793038",
    "akaStatus": "APPROVED",
    "ama": "1550793035",
    "amka": "22012602054",
    "birthCountry": "ΕΛΛΑΔΑ",
    "birthDate": "1986-02-22",
    "birthRegion": "ΑΝ. ΜΑΚΕΔΟΝΙΑΣ & ΘΡΑΚΗΣ",
    "bloodGroup": "Α2",
    "cellNumber": "6971231234",
    "education": "LEVEL7",
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
    "street": "ΜΠΟΥΜΠΟΥΛΙΝΑΣ",
    "streetNumber": "10",
    "type": "BloodDonorUser",
    "username": "johnny",
    "zipcode": "14440"
  }

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
  };
};

module.exports = generateDB;
