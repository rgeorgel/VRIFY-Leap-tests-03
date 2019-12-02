const AddressService = require('../../services/addressService');

module.exports = (app, db) => {
  const routeName = '/customer/:customerId/address';
  const addressService = new AddressService(db);

  app.get( `${routeName}`, (req, res) => {
    addressService.listAll(req.params.customerId)
      .then((result) => res.json(result))
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.get( `${routeName}/:id`, (req, res) => {
    addressService.getById(req.params.customerId, req.params.id)
      .then((result) => {
        if (!result) {
          res.status(404).json({ error: 'address not found'});
          return;
        }

        res.json(result);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.post(`${routeName}`, (req, res) => {
    addressService.create(req.params.customerId, req.body)
      .then((result) => res.json(result))
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.put( `${routeName}/:id`, (req, res) => {
    addressService.update(req.params.customerId, req.params.id, req.body)
      .then(async (result) => {
        if (!result[0]) {
          res.status(400).json({ error: 'failed to update'});
          return;
        }
        
        const address = await addressService.getById(req.params.customerId, req.params.id);
        res.json(address);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.delete( `${routeName}/:id`, (req, res) => {
    addressService.delete(req.params.customerId, req.params.id)
      .then((result) => {
        if (!result) {
          res.status(400).json({ error: 'failed to delete'});
          return;
        }
  
        res.send(200);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });
}