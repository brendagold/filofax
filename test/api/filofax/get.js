const expect = require('chai').expect;
let should = require('chai').should();
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

  it('OK, getting all entries', (done) => {
    request(app)
      .get('/contents')
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

/*
 * Testing GET by ID ROUTE
 */
describe('GET /contents/:id', () => {
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
  it('it should GET a content by ID', (done) => {
    const contentId = '5f417aa037bfb005bc68b14c';
    request(app)
      .get('/contents/' + contentId)
      .then((res) => {
        const body = res.body;
        console.log(body);
        // res.should.have.status(200);
        // res.body.should.be.a('object');
        // res.body.content.should.have.a.property('id');
        // res.body.content.should.have.a.property('title');
        // res.body.content.should.have.a.property('desc');
        // res.body.content.should.have.a.property('id').eq('1');
        done();
      });
  });
});
