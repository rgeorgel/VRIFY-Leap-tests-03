const CustomerConverter = require('../../../src/services/converter/customerConverter');

beforeAll(async () => {
  customerConverter = new CustomerConverter();
});

describe('CustomerConverter test', () => {
  it('Convert a `customer database` to `customer applicarion`', () => {
    const dbModel = {
      id: 1,
      name: 'Ricardo'
    };

    const expectedModel = {
      id: 1,
      name: 'Ricardo'
    }

    const appModel = customerConverter.fromDB(dbModel);

    expect(expectedModel).toEqual(appModel);
  });

  it('Convert a `customer database` to `customer applicarion` with address', () => {
    const dbModel = {
      id: 1,
      name: 'Ricardo',
      addresses: [{
        id: 1,
        street_address: 'some street',
        postal_code: '4321',
        country: 'US',
        customer_id: 1
      }]
    };

    const expectedModel = {
      id: 1,
      name: 'Ricardo',
      addresses: [
        {
          id: 1,
          streetAddress: 'some street',
          postalCode: '4321',
          country: 'US',
          customerId: 1
        }
      ]
    }

    const appModel = customerConverter.fromDB(dbModel);

    expect(expectedModel).toEqual(appModel);
  });

  it('Convert a list of `customer database` to list of `customer applicarion`', () => {
    const dbModels = [{
      id: 1,
      name: 'Ricardo'
    },
    {
      id: 2,
      name: 'German'
    }];

    const expectedModels = [{
      id: 1,
      name: 'Ricardo'
    },
    {
      id: 2,
      name: 'German'
    }]

    const appModels = customerConverter.fromDBBulk(dbModels);

    expect(expectedModels).toEqual(appModels);
  });

  it('Convert a `customer applicarion` to `customer database`', () => {
    const appModels = [{
      id: 1,
      name: 'Ricardo'
    },
    {
      id: 2,
      name: 'German'
    }];

    const expectedBds = [{
      id: 1,
      name: 'Ricardo'
    },
    {
      id: 2,
      name: 'German'
    }]

    const dbModels = customerConverter.fromDBBulk(appModels);

    expect(expectedBds).toEqual(dbModels);
  });
});
