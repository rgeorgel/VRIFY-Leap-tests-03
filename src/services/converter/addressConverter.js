class AddressConverter {
  fromDB(dbModel) {
    const model = {};
    model.id = dbModel.id;
    model.streetAddress = dbModel.street_address;
    model.postalCode = dbModel.postal_code;
    model.country = dbModel.country;
    model.customerId = dbModel.customer_id;

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
    model.street_address = appModel.streetAddress;
    model.postal_code = appModel.postalCode;
    model.country = appModel.country;
    model.customer_id = appModel.customerId;

    return model;
  }
}

module.exports = AddressConverter;
