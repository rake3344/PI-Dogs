/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('Dogs routes', () => {
  describe('GET /dogs/:idRaza', () => {
    it('Responde con status 200', () =>
      agent.get('/dogs/1').expect(200));
  });
    it('Responde con status 404', () => {
      agent.get('/dogs/999').expect(404);
  })
   it('Responde con un objeto con las propiedades id, name, height, weight, life_span, image, temperaments', () => {
      agent.get('/dogs/1').then((res) => {
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('height');
        expect(res.body).to.have.property('weight');
        expect(res.body).to.have.property('life_span');
        expect(res.body).to.have.property('image');
        expect(res.body).to.have.property('temperaments');
      })
    }
  )
    it('Responde con status 200 en la ruta de temperaments', () => {
      agent.get('/temperaments').expect(200);
    })
});

describe('Dogs routes post', () => {
  describe('POST /dogs', () => {
    it('Responde con status 200', () => {
      agent.post('/dogs').send({
        name: 'Pug',
        height: '20 - 30',
        weight: '5 - 7',
        life_span: '12 - 14',
        image: 'https://soyunperro.com/wp-content/uploads/2019/08/perro-pug-en-el-jardin.jpg',
        temperaments: ['Active', 'Playful', 'Loyal', 'Faithful', 'Intelligent']
      }).expect(200);
    })
  })
})


