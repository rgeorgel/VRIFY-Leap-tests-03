const AddressConverter = require('./converter/addressConverter');

class AddressService {
  constructor (db) {
    this.db = db;
    this.addressConverter = new AddressConverter();
  }

  listAll (customerId) {
    return new Promise(async (resolve, reject) => {
      const dbAddresses = await this.db.Customer_Addresses.findAll({
        where: {
          customer_id: customerId
        }
      })
      .catch((ex) => {
        reject(ex);
      });

      const addresses = this.addressConverter.fromDBBulk(dbAddresses);
      resolve(addresses);
    });
  }

  getById (customerId, addressId) {
    return new Promise(async (resolve, reject) => {
      const dbAddress = await this.db.Customer_Addresses.findOne({
        where: {
          customer_id: customerId,
          id: addressId
        }
      })
      .catch((ex) => {
        reject(ex);
      });

      if (!dbAddress) {
        resolve();
        return;
      }

      const address = this.addressConverter.fromDB(dbAddress.dataValues);
      resolve(address);
    });
  }

  create (customerId, address) {
    const dbAddress = this.addressConverter.toDB({
      ...address,
      customerId
    });

    return this.db.Customer_Addresses.create(dbAddress);
  }

  update (customerId, addressId, address) {
    const dbAddress = this.addressConverter.toDB(address);

    return this.db.Customer_Addresses.update(dbAddress,
    {
      where: {
        customer_id: customerId,
        id: addressId
      }
    });
  }

  delete (customerId, addressId) {
    return this.db.Customer_Addresses.destroy({
      where: {
        customer_id: customerId,
        id: addressId
      }
    });
  }
}

module.exports = AddressService;
 