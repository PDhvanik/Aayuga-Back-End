import { Router } from "express";
import User from '../model/user.js';
const router = new Router();

router.post('/api/login', async (req, res) => {
   const { username, password } = req.body
   try {
      const user = await User.findOne({ username: username });
      if (!user) return res.status(400).json({ staus: 'error', error: 'User not found!' });
      if ((!(user.password == password))) {
         return res.status(400).json({ status: 'error', error: 'Invalid password!' });
      }
      else {
         return res.status(200).json({ status: 'ok', message: 'Login successful', user: user });
      }
   }
   catch (err) {
      return res.status(400).json({ status: 'error', error: 'Error occures.' });
   }
});

export default router;