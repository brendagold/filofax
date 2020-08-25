process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../server.js');

describe('POST /content', () => {
  before((done) => {
    conn
      .connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    conn
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('OK, creating a new entry', (done) => {
    request(app)
      .post('/newentry')
      .send({
        title: 'hello there',
        description: 'Hello, just want to tell you that you are beautiful',
      })
      .then((res) => {
        const body = res.body;

        expect(body.newTask).to.contain.property('_id');
        expect(body.newTask).to.contain.property('title');
        expect(body.newTask).to.contain.property('description');
        expect(body.newTask).to.contain.property('createdAt');
        expect(body.newTask).to.contain.property('updatedAt');
        done();
      });
  });
  it('Fail, Title length should be at least 5 characters long', (done) => {
    request(app)
      .post('/newentry')
      .send({
        title: 'hel',
        description: 'Hello, just want to tell you that you are beautiful',
      })
      .then((res) => {
        const body = res.body;

        expect(body).to.contain.property('status').to.equal('failed');
        expect(body)
          .to.contain.property('message')
          .to.equal('Text must be at least 5 characters long');

        done();
      });
  });

  it('Fail, Description length should be at least 5 characters long', (done) => {
    request(app)
      .post('/newentry')
      .send({
        title: 'hello there',
        description: 'bear',
      })
      .then((res) => {
        const body = res.body;

        expect(body).to.contain.property('status').to.equal('failed');
        expect(body)
          .to.contain.property('message')
          .to.equal('Text must be at least 5 characters long');

        done();
      });
  });
});
