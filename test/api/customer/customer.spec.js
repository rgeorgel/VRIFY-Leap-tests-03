const server = require('../../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Customer Api', () => {
  test('List all of the customers', async (done) => {
     const response = await request.get('/customer');

     expect(response.status).toEqual(200);
     done();
  });

  test('Get customer by id', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[all.body.length -1];

    const response = await request.get(`/customer/${customer.id}`);

    expect(all.body.length).toBeGreaterThan(0);
    expect(response.status).toEqual(200);
    expect(customer).toEqual(response.body);
    done();
  });

  test('Get customer with invalid id', async (done) => {
    const response = await request.get('/customer/-1');

    expect(response.status).toEqual(404);
    done();
  });

  test('Create new customer', async (done) => {
    request
      .post('/customer')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });

  test('Update customer', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[all.body.length -1];

    const newName = Math.random().toString();

    request
      .put(`/customer/${customer.id}`)
      .send({name: newName})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(customer).not.toEqual(res.body);
        expect(newName).toEqual(res.body.name);
        done();
      });
  });

  test('Update invalid customer', async (done) => {
    const newName = Math.random().toString();

    request
      .put(`/customer/-1`)
      .send({name: newName})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });

  test('Delete customer', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[all.body.length -1];

    const newName = Math.random().toString();

    request
      .delete(`/customer/${customer.id}`)
      .send({name: newName})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });

  test('Delete invalid customer', async (done) => {
    const newName = Math.random().toString();

    request
      .delete(`/customer/-1`)
      .send({name: newName})
      .set('Accept', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });
});
