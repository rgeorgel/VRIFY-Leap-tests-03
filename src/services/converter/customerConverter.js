const AddressConverter = require('./addressConverter');

class CustomerConverter {
  constructor() {
    this.addressConverter = new AddressConverter();
  }

  fromDB(dbModel) {
    const model = {};
    model.id = dbModel.id;
    model.name = dbModel.name;

    if (dbModel.addresses) {
      const addresses = this.addressConverter.fromDBBulk(dbModel.addresses);
      model.addresses = addresses;
    }
    
    return model;
  }

  fromDBBulk(dbModels) {
    const models = [];

    for (let i = 0; i < dbModels.length; i++) {
      models.push(this.fromDB(dbModels[i]));
    }
    
    return models;
  }

  toDB(appModel) {
    const model = {};
    model.id = appModel.id;
    model.name = appModel.name;

    return model;
  }
}

module.exports = CustomerConverter;
