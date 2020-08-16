// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('./app');

// //Assertion Style

// chai.should();

// chai.use(chaiHttp);

// describe('Tasks API', () => {
//   describe('GET /contents', () => {
//     it('it should get all the contents', (done) => {
//       chai
//         .request(server)
//         .get('/contents')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eq(3);
//           done();
//         });
//     });
//   });
// });
