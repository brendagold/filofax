const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../server.js');

describe('Delete /content/:id', () => {
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

  it('OK, getting all entries', (done) => {
    request(app)
      .delete('/contents/:id')
      .then((res) => {
        const body = res.body;
        console.log(body);

        done();
      });
  });
  //   it('Fail, Title length should be at least 5 characters long', (done) => {
  //     request(app)
  //       .post('/newentry')
  //       .send({
  //         title: 'hel',
  //         description: 'Hello, just want to tell you that you are beautiful',
  //       })
  //       .then((res) => {
  //         const body = res.body;

  //         expect(body).to.contain.property('status').to.equal('failed');
  //         expect(body)
  //           .to.contain.property('message')
  //           .to.equal('Text must be at least 5 characters long');

  //         done();
  //       });
  //   });

  //   it('Fail, Description length should be at least 5 characters long', (done) => {
  //     request(app)
  //       .post('/newentry')
  //       .send({
  //         title: 'hello there',
  //         description: 'bear',
  //       })
  //       .then((res) => {
  //         const body = res.body;

  //         expect(body).to.contain.property('status').to.equal('failed');
  //         expect(body)
  //           .to.contain.property('message')
  //           .to.equal('Text must be at least 5 characters long');

  //         done();
  //       });
  //   });
});
