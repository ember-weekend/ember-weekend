import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  title: faker.lorem.sentence,
  body() {
    return faker.lorem.paragraph(3);
  }
});
