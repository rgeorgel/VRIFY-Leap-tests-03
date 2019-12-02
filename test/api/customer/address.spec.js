const server = require('../../../src/config/server');
const supertest = require('supertest');
const request = supertest(server);

describe('Address Api', () => {
  it('List all address of the customer', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[all.body.length -1];

    const response = await request.get(`/customer/${customer.id}/address`);

    expect(response.status).toEqual(200);
    done();
  });

  it('Get address by id', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    const response = await request.get(`/customer/${customer.id}/address/${address.id}`);
    
    expect(addresses.length).toBeGreaterThan(0);
    expect(response.status).toEqual(200);
    expect(address).toEqual(response.body);
    done();
  });

  it('Get address with invalid id', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    
    const response = await request.get(`/customer/${customer.id}/address/-1`);
    
    expect(response.status).toEqual(404);
    done();
  });

  it('Get address with invalid customer id', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    const response = await request.get(`/customer/-1/address/${address.id}`);
    
    expect(response.status).toEqual(404);
    done();
  });

  it('Create new address', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];

    request
      .post(`/customer/${customer.id}/address`)
      .send({
        "streetAddress": "223 some street",
        "postalCode": "12345",
        "country": "US"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        done();
      });
  });

  it('Update address', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    const newAddress = Math.random().toString();
    const newPostalCode = Math.random().toString();
    const newCountry = 'BR';

    request
      .put(`/customer/${customer.id}/address/${address.id}`)
      .send({
        "streetAddress": newAddress,
        "postalCode": newPostalCode,
        "country": newCountry
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(address).not.toEqual(res.body);
        expect(newAddress).toEqual(res.body.streetAddress);
        expect(newPostalCode).toEqual(res.body.postalCode);
        expect(newCountry).toEqual(res.body.country);
        done();
      });
  });

  it('Update invalid address', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];

    const newAddress = Math.random().toString();
    const newPostalCode = Math.random().toString();
    const newCountry = 'BR';

    request
      .put(`/customer/${customer.id}/address/-1`)
      .send({
        "streetAddress": newAddress,
        "postalCode": newPostalCode,
        "country": newCountry
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('Update address with invalid customer', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    const newAddress = Math.random().toString();
    const newPostalCode = Math.random().toString();
    const newCountry = 'BR';

    request
      .put(`/customer/-1/address/${address.id}`)
      .send({
        "streetAddress": newAddress,
        "postalCode": newPostalCode,
        "country": newCountry
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('Delete address', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    request
      .delete(`/customer/${customer.id}/address/${address.id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('Delete invalid address', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];

    request
      .delete(`/customer/${customer.id}/address/-1`)
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });

  it('Delete address with invalid customer', async (done) => {
    const all = await request.get('/customer');
    const customer = all.body[0];
    const addresses = customer.addresses;
    const address = addresses[addresses.length -1];

    request
      .delete(`/customer/-1/address/${address.id}`)
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        done();
      });
  });
});
