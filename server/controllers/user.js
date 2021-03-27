const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    const foundUser = await db.get_user([email]);
    if (foundUser[0]) return res.status(409).send('Sorry, email already exists.');
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.register_user([email, hash]);
    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;
    const foundUser = await db.get_user([email]);
    if (!foundUser[0]) return res.status(409).send('Sorry, email already exists.');
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (authenticated) {
      delete foundUser[0].password;
      req.session.user = foundUser[0];
      res.status(200).send(req.session.user);
    } else {
      return res.status(401).send('Incorrect username or password');
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};