import { Router } from "express";
import User from '../model/user.js';
const router = new Router();

router.post('/api/signup', async (req, res) => {
   console.log(req.body);

   const { username, email, password, height,weight,bloodGroup} = req.body;

   try {
      const newUser = new User({
         username: username,
         email: email,
         password: password,
         height: height,
         weight: weight,
         bloodGroup: bloodGroup
      });

      const response = await newUser.save();
      console.log('User created successfully: ', response)
      return res.status(201).json({ status: 'Created!' });
   } catch (err) {
      if (err.code === 11000) {
         err.message = 'Username or email already exists!';
      }
      return res.status(400).json({ status: 'error', error: err.message });
   }
});

export default router;