var faker = require('faker');

function generateDB () {
  var donations = [],
      hospitals = [],
      donation_types = [
        'VOLUNTEER',
        'BLOODDONORASSOCIATION',
        'RELATIVE',
        'MILITARY'
      ];

  for (var i = 0; i < 50; i++) {
    var id = i * 100 + 11;

    var donated_at = faker.date.past(10),
        donation_index = Math.floor(Math.random() * 3) + 0;
        donation_type = donation_types[donation_index],
        donation_id = 'donation_' + id,
        donor_url = faker.internet.url();

    var hospital_id = 'hospital_' + id,
        hospital_url = 'http://83.212.98.164:3000/hospitals/' + hospital_id,
        hospital_name = faker.company.companyName();

    donations.push({
      "id": donation_id,
      "donated_at": donated_at,
      "type": donation_type,
      "hospital": hospital_url,
      "donor": donor_url
    });

    hospitals.push({
      "id": hospital_id,
      "name": hospital_name
    });
  };

  var profile = {
    id: 324156,
    username: faker.internet.userName(),
    last_name: faker.name.lastName(),
    first_name: faker.name.firstName()
  };

  return { "donations": donations, "profile": profile, "hospitals": hospitals };
};

module.exports = generateDB;
