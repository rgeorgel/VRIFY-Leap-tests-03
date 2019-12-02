const CustomerConverter = require('./converter/customerConverter');

class CustomerService {
  constructor (db) {
    this.db = db;
    this.customerConverter = new CustomerConverter();
  }

  listAll () {
    return new Promise(async (resolve, reject) => {
      const dbCustomers = await this.db.Customers.findAll({
        include: [{ model: this.db.Customer_Addresses, as: 'addresses'}]
      })
      .catch((ex) => {
        reject(ex);
      });

      const customers = this.customerConverter.fromDBBulk(dbCustomers);
      resolve(customers);
    });
  }

  getById (id) {
    return new Promise(async (resolve, reject) => {
      const dbCustomer = await this.db.Customers.findOne({
        where: { id },
        include: [{ model: this.db.Customer_Addresses, as: 'addresses'}]
      })
      .catch((ex) => {
        reject(ex);
      });

      if (!dbCustomer) {
        resolve();
        return;
      }

      const customer = this.customerConverter.fromDB(dbCustomer);
      resolve(customer);
    });
  }

  create (customer) {
    const dbCustomer = this.customerConverter.toDB(customer);
    return this.db.Customers.create(dbCustomer);
  }

  update (id, customer) {
    const dbCustomer = this.customerConverter.toDB(customer);
    return this.db.Customers.update(dbCustomer,
    {
      where: { id }
    });
  }

  delete (id) {
    return this.db.Customers.destroy({
      where: { id }
    });
  }
}

module.exports = CustomerService;