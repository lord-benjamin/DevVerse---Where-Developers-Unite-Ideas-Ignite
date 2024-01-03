const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is a required field.').not().isEmpty(),
    check('email', 'Please enter a valid email.').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters.'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      //See if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User already exists! Please proceed to login.' }],
        });
      }

      //Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mp',
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/users
// @desc     Delete user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    //Remove all posts and profile associated with user

    //Make comments anonymous
    await Post.updateMany(
      {},
      {
        $set: {
          'comments.$[elem].name': 'DevVerse User',
          'comments.$[elem].avatar': 'http://www.gravatar.com/avatar/?d=mp',
        },
      },
      { arrayFilters: [{ 'elem.user': req.user.id }] }
    );

    //Make followers anonymous
    await Profile.updateMany(
      {},
      {
        $set: {
          'followers.$[elem].name': 'DevVerse User',
          'followers.$[elem].avatar': 'http://www.gravatar.com/avatar/?d=mp',
        },
      },
      { arrayFilters: [{ 'elem.user': req.user.id }] }
    );

    //Make followings anonymous
    await Profile.updateMany(
      {},
      {
        $set: {
          'following.$[elem].name': 'DevVerse User',
          'following.$[elem].avatar': 'http://www.gravatar.com/avatar/?d=mp',
        },
      },
      { arrayFilters: [{ 'elem.user': req.user.id }] }
    );

    //Remove posts
    const { deletePosts } = req.body;
    if (deletePosts) {
      await Post.deleteMany({ user: req.user.id });
    } else {
      await Post.updateMany(
        { user: req.user.id },
        {
          $set: {
            name: 'DevVerse User',
            avatar: 'http://www.gravatar.com/avatar/?d=mp',
          },
        }
      );
    }
    //Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });
    //Remove user
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: 'Deleted User, Profile & Posts' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
