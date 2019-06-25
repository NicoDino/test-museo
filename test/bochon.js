//During the test the env variable is set to test


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Bochon', () => {

    describe('/GET bochones', () => {
        it('it should GET all bochones', (done) => {
            chai.request(server)
                .get('/api/bochon')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('bochones');
                    res.body.bochones.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET bochon by id', () => {
        it('it should GET one bochon by id', (done) => {
            chai.request(server)
                .get('/api/bochonId/5ac951bfd1611c181c72a8d3')
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('it should FAIL TO GET one bochon by id', (done) => {
            chai.request(server)
                .get('/api/bochonId/notanid')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});