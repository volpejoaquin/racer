require('ts-node').register();
const path = require('path');
const { Seeder } = require('mongo-seeding');

const config = {
  database: {
    name: 'racer',
  },
  dropDatabase: true,
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(
  path.resolve('./src/data'),
  {
    extensions: ['js', 'json', 'ts'],
    transformers: [] // Seeder.Transformers.replaceDocumentIdWithUnderscoreId
  }
);

seeder
  .import(collections)
  .then(() => {
    console.log('Success');
  })
  .catch(err => {
    console.log('Error', err);
  });
