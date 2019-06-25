//During the test the env variable is set to test


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);
describe('Piezas', () => {

    describe('/GET pieza', () => {
        it('it should GET all piezas', (done) => {
            chai.request(server)
                .get('/api/pieza')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('piezas');
                    res.body.piezas.should.be.a('array');
                    done();
                });
        });
    });

    describe('/GET pieza', () => {
        it('it should GET one pieza by id', (done) => {
            chai.request(server)
                .get('/api/piezaId/5aedb69bff0e2719dc268a93')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pieza');
                    res.body.pieza.should.have.property('imagenesPieza');
                    res.body.pieza.imagenesPieza.should.be.a('array')
                    res.body.pieza.should.have.property('_id');
                    res.body.pieza._id.should.be.a('string')
                    res.body.pieza.should.have.property('identificador');
                    res.body.pieza.identificador.should.be.a('string')
                    res.body.pieza.should.have.property('medidasPieza');
                    res.body.pieza.medidasPieza.should.be.a('object')
                    res.body.pieza.should.have.property('fechaIngreso');
                    done();
                });
        });
    });

    describe('/GET pieza by identificador', () => {
        it('it should GET one pieza by identificador', (done) => {
            chai.request(server)
                .get('/api/piezaIdentificador/AM-123-44')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pieza');
                    res.body.pieza.should.have.property('imagenesPieza');
                    res.body.pieza.imagenesPieza.should.be.a('array')
                    res.body.pieza.should.have.property('_id');
                    res.body.pieza._id.should.be.a('string')
                    res.body.pieza.should.have.property('identificador');
                    res.body.pieza.identificador.should.be.a('string')
                    res.body.pieza.should.have.property('medidasPieza');
                    res.body.pieza.medidasPieza.should.be.a('object')
                    res.body.pieza.should.have.property('fechaIngreso');
                    done();
                });
        });
    });

    describe('/GET piezas by idEjemplar(al que pertenece)', () => {
        it('it should NOT GET one pieza by idEjemplar(al que pertenece)', (done) => {
            chai.request(server)
                .get('/api/piezaEjemplar/asdf987jsdasaja')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pieza');
                    res.body.pieza.should.be.a('array')
                    res.body.pieza.should.have.length(0)
                    done();
                });
        });
    });

    describe('/GET piezas by idEjemplar(al que pertenece)', () => {
        it('it should  GET piezas by idEjemplar(al que pertenece)', (done) => {
            chai.request(server)
                .get('/api/piezaEjemplar/5ac96cbd4de457232452aab5')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pieza');
                    res.body.pieza.should.be.a('array')
                    done();
                });
        });
    });

    describe('/POST pieza', () => {
        let pieza = {
            "imagenesPieza": [],
            "identificador": "AC-145-test",
            "medidasPieza": {
                "_id": "5d1280ad13508a5b690cbc0c",
                "ancho": 14.5,
                "largo": 52.68,
                "alto": 0,
                "diametro": 0,
                "circunferencia": 0
            },
            "fechaIngreso": "2001-09-18T03:00:00.000Z",
            "fechaBaja": null,
            "motivoBaja": "",
            "perteneceEjemplar": "5ac96cbd4de457232452aab5",
            "origen": "ExcavaciónPropia",

        };

        it('it should  POST pieza', (done) => {
            chai.request(server)
                .post('/api/pieza')
                .send(pieza)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pieza');
                    res.body.pieza.should.have.property('_id');
                    res.body.pieza._id.should.be.a('string')
                    done();
                });
        });
    });
    // // UNHAPPY test POST pieza
    describe('/POST pieza', () => {
        let pieza = {
            "fruta": "kiwi"
        };

        it('it should  POST pieza', (done) => {
            chai.request(server)
                .post('/api/pieza')
                .send(pieza)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });

});