const CustomerService = require('../../services/customerService');

module.exports = (app, db) => {
  const routeName = '/customer';
  const customerService = new CustomerService(db);

  app.get( `${routeName}`, async (req, res) => {
    customerService.listAll()
      .then((result) => {
        res.json(result);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.get( `${routeName}/:id`, (req, res) => {
    customerService.getById(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(404).json({ error: 'customer not found'});
          return;
        }

        res.json(result);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.post(`${routeName}`, (req, res) => {
    customerService.create(req.body)
      .then((result) => res.json(result))
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.put( `${routeName}/:id`, (req, res) => {
    customerService.update(req.params.id, req.body)
      .then(async (result) => {
        if (!result[0]) {
          res.status(400).json({ error: 'failed to update'});
          return;
        }

        const customer = await customerService.getById(req.params.id);
        res.json(customer);
      })
      .catch((ex) => {
        res.status(400).json(ex);
      });
  });

  app.delete( `${routeName}/:id`, (req, res) => {
    customerService.delete(req.params.id)
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