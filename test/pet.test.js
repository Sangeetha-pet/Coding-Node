const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);


describe('functional - pet', () => {
 
it('should fail to create a pet without name', async () => {
const res = await request(app).post('/pets').send({

age:'1',
colour:'white',
    });
expect(res.status).to.equal(400);
expect(res.body.message).to.equal('"name" is required');
  });
 
it('should create a pet', async () => {
 const pet = {
      name:  'John',
      age: 16,
      colour: 'gamer',
    };

const res = await request(app).post('/pets').send(pet);
expect(res.status).to.equal(201);
expect(res.body.name).to.equal(pet.name);
expect(res.body.age).to.equal(pet.age);
expect(res.body.colour).to.equal(pet.colour);
  });
    
it('should list ALL Pets on GET', async()=> {
	const res = await request(app).get('/pets')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
 
    });
});
	
it('Should delete a pet ',async()=>{
    request(app).del('/pets').expect(200);

});
	
it('should delete a Pet Color on DELETE', async()=> {
	const res = await request(app).get('/pets')
    .end(function(err, res){
        request(app).delete('/pets/'+res.body[0]._name)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('name');
          response.body.REMOVED.should.have.property('age');
          response.body.REMOVED.should.have.equal('colour');
      });
    });
});
	
it('should fail to delete a pet without equired input', async () => {
const res = await request(app).post('/pets').send({
age:'1',
colour:'white',
    });
expect(res.status).to.equal(400);
expect(res.body.message).to.equal('"name" is required');
  });
 

