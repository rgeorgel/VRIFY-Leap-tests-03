const AddressConverter = require('../../../src/services/converter/addressConverter');

beforeAll(async () => {
  addressConverter = new AddressConverter();
});

describe('AddressConverter test', () => {
  it('Convert a `address database` to `addess applicarion`', () => {
    const dbAddress = {
      id: 1,
      street_address: 'some street',
      postal_code: '4321',
      country: 'US',
      customer_id: 3
    };

    const expectedAddress = {
      id: 1,
      streetAddress: 'some street',
      postalCode: '4321',
      country: 'US',
      customerId: 3
    }

    const appAddress = addressConverter.fromDB(dbAddress);

    expect(expectedAddress).toEqual(appAddress);
  });

  it('Convert a list of `address database` to list of `addess applicarion`', () => {
    const dbAddress = [{
      id: 1,
      street_address: 'some street',
      postal_code: '4321',
      country: 'US',
      customer_id: 3
    },
    {
      id: 2,
      street_address: 'some street 3',
      postal_code: '6789',
      country: 'BR',
      customer_id: 2
    }];

    const expectedAddresses = [{
      id: 1,
      streetAddress: 'some street',
      postalCode: '4321',
      country: 'US',
      customerId: 3
    },
    {
      id: 2,
      streetAddress: 'some street 3',
      postalCode: '6789',
      country: 'BR',
      customerId: 2
    }]

    const appAddress = addressConverter.fromDBBulk(dbAddress);

    expect(expectedAddresses).toEqual(appAddress);
  });

  it('Convert a `addess applicarion` to `address database`', () => {
    const appAddress = {
      id: 1,
      street_address: 'some street',
      postal_code: '4321',
      country: 'US',
      customer_id: 3
    };

    const expectedAddress = {
      id: 1,
      streetAddress: 'some street',
      postalCode: '4321',
      country: 'US',
      customerId: 3
    }

    const dbAddress = addressConverter.fromDB(appAddress);

    expect(expectedAddress).toEqual(dbAddress);
  });
});
