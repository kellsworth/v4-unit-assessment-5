const bcrypt = require('bcryptjs');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const profile_pic = `https://robohash.org/${username}.png`;
    const foundUser = await db.user.find_user_by_username({ username });
    if (foundUser[0]) return res.status(409).send('Sorry, username already exists.');
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.user.create_user({ username, hash, profile_pic });
    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },

  login: async (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    const foundUser = await db.user.find_user_by_username({ username });
    if (!foundUser[0]) return res.status(409).send(`Sorry, username doesn't exists.`);
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (authenticated) {
      delete foundUser[0].password;
      req.session.user = foundUser[0];
      res.status(200).send(req.session.user);
    } else {
      return res.status(401).send('Incorrect username or password');
    }
  },

  getUser: async (req, res) => {
    if (!req.session.user) {
      return res.sendStatus(404)
    }
    res.status(200).send(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};