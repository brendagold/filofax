let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../config');

//Assertion Style

let should = require('chai').should();

chai.use(chaiHttp);

describe('Tasks API', () => {
  /*
   * Testing GET ROUTE
   */
  describe('GET', () => {
    it('it should GET all the contents', (done) => {
      chai
        .request(server)
        .get('/contents')
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.contents.length.should.be.eql(3);
          done();
        });
    });

    it('it should NOT GET all the contents', (done) => {
      chai
        .request(server)
        .get('/content')
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(404);
          done();
        });
    });
  });

  /*
   * Testing GET by ID ROUTE
   */
  describe('GET /contents/:id', () => {
    it('it should GET a content by ID', (done) => {
      const contentId = 1;
      chai
        .request(server)
        .get('/contents/' + contentId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.content.should.have.a.property('id');
          res.body.content.should.have.a.property('title');
          res.body.content.should.have.a.property('desc');
          res.body.content.should.have.a.property('id').eq('1');
          done();
        });
    });

    it('it should NOT GET a content by ID', (done) => {
      const contentId = 123;
      chai
        .request(server)
        .get('/contents/' + contentId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq('The Id does not exist.');
          done();
        });
    });
  });

  /*
   * Testing POST ROUTE
   */
  describe('POST /addEntry/', () => {
    it('it should POST a new content', (done) => {
      const content = {
        title: 'A New Day',
        desc: 'Today is Sunday, I am so grateful',
        createdOn: '11:37:13 AM, Mon Aug 17 2020',
      };
      chai
        .request(server)
        .post('/addentry')
        .send(content)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);

          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.contents[3].should.have.a.property('id').eq(4);
          res.body.contents[3].should.have.a.property('title').eq('A New Day');
          res.body.contents[3].should.have.a
            .property('desc')
            .eq('Today is Sunday, I am so grateful');
          res.body.contents[3].should.have.a.property('createdOn');
          done();
        });
    });
  });

  /*
   * Testing PUT ROUTE
   */
  describe('PUT /contents/:id', () => {
    it('it should PUT an existing content', (done) => {
      const contentId = 1;
      const content = {
        title: 'Food Network',
        desc: 'My favorite show on food network is Guy grocery games',
      };
      chai
        .request(server)
        .put('/contents/' + contentId)
        .send(content)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.content.should.have.a.property('id').eq('1');
          res.body.content.should.have.a.property('title').eq('Food Network');
          res.body.content.should.have.a
            .property('desc')
            .eq('My favorite show on food network is Guy grocery games');

          done();
        });
    });
  });

  /*
   * Testing PATCH ROUTE
   */
  describe('PATCH /contents/:id', () => {
    it('it should PATCH an existing content', (done) => {
      const contentId = 1;
      const content = {
        title: 'Foodie Things',
      };
      chai
        .request(server)
        .patch('/contents/' + contentId)
        .send(content)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.content.should.have.a.property('id').eq('1');
          res.body.content.should.have.a.property('title').eq('Foodie Things');
          res.body.content.should.have.a
            .property('desc')
            .eq('My favorite show on food network is Guy grocery games');

          done();
        });
    });
  });

  /*
   * Testing MISC ROUTE
   */
  describe('DELETE /contents/:id', () => {
    it('it should DELETE an existing content', (done) => {
      const contentId = 1;

      chai
        .request(server)
        .delete('/contents/' + contentId)
        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });

    it('it should DELETE an existing content', (done) => {
      const contentId = 145;
      chai
        .request(server)
        .delete('/contents/' + contentId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq('The Id does not exist.');
          done();
        });
    });
  });
});
