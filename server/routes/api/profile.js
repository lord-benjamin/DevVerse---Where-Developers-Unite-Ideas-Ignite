const express = require('express');
// const request = require('request');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Your professional status is required.').not().isEmpty(),
      check('skills', 'Skills is a required field.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      linkedin,
      linktree,
      twitter,
      facebook,
      instagram,
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    profileFields.company = company ? company : '';
    profileFields.website = website ? website : '';
    profileFields.location = location ? location : '';
    profileFields.bio = bio ? bio : '';
    profileFields.status = status ? status : '';
    profileFields.githubusername = githubusername ? githubusername : '';
    profileFields.skills = skills
      ? skills.split(',').map((skill) => skill.trim())
      : [];

    //Build social object
    profileFields.social = {};

    profileFields.social.youtube = youtube ? youtube : '';
    profileFields.social.linkedin = linkedin ? linkedin : '';
    profileFields.social.linktree = linktree ? linktree : '';
    profileFields.social.twitter = twitter ? twitter : '';
    profileFields.social.facebook = facebook ? facebook : '';
    profileFields.social.instagram = instagram ? instagram : '';

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          {
            $set: profileFields,
          },
          {
            new: true,
          }
        );
        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile does not exist!' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile does not exist!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Please add your job title.').not().isEmpty(),
      check('company', 'Please add your company name.').not().isEmpty(),
      check('from', 'The starting date of your job is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let { title, company, location, from, to, current, description } = req.body;
    if (current) {
      to = null;
    }
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/profile/experience/:exp_id
// @desc     View profile experience
// @access   Private
router.get('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const exp = profile.experience.find((obj) => obj.id === req.params.exp_id);

    if (!exp) {
      return res.status(400).send({ msg: 'No experience found.' });
    }

    res.json(exp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/experience/:exp_id
// @desc     Update profile experience
// @access   Private
router.put(
  '/experience/:exp_id',
  [
    auth,
    [
      check('title', 'Please add your job title.').not().isEmpty(),
      check('company', 'Please add your company name.').not().isEmpty(),
      check('from', 'The starting date of your job is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let { title, company, location, from, to, current, description } = req.body;
    if (current) {
      to = null;
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const exp = profile.experience.find(
        (obj) => obj.id === req.params.exp_id
      );

      if (!exp) {
        return res.status(400).send({ msg: 'No experience found.' });
      }

      exp.title = title ? title : '';
      exp.company = company ? company : '';
      exp.location = location ? location : '';
      exp.from = from ? from : '';
      exp.to = to ? to : '';
      exp.current = current ? current : false;
      exp.description = description ? description : '';

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete profile experience
// @access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.findIndex(
      (exp) => exp.id === req.params.exp_id
    );
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'Please add your school/university name.')
        .not()
        .isEmpty(),
      check('degree', 'Please specify the degree you got.').not().isEmpty(),
      check('fieldofstudy', 'Please enter the field in which you studied.')
        .not()
        .isEmpty(),
      check('from', 'The starting date of your eduction is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    if (current) {
      to = null;
    }
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/profile/education/:edu_id
// @desc     View profile education
// @access   Private
router.get('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const edu = profile.education.find((obj) => obj.id === req.params.edu_id);

    if (!edu) {
      return res.status(400).send({ msg: 'No education found.' });
    }

    res.json(edu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/education/:edu_id
// @desc     Update profile education
// @access   Private
router.put(
  '/education/:edu_id',
  [
    auth,
    [
      check('school', 'Please add your school/university name.')
        .not()
        .isEmpty(),
      check('degree', 'Please specify the degree you got.').not().isEmpty(),
      check('fieldofstudy', 'Please enter the field in which you studied.')
        .not()
        .isEmpty(),
      check('from', 'The starting date of your eduction is required.')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    if (current) {
      to = null;
    }
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      const edu = profile.education.find((obj) => obj.id === req.params.edu_id);

      if (!edu) {
        return res.status(400).send({ msg: 'No education found.' });
      }

      edu.school = school ? school : '';
      edu.degree = degree ? degree : '';
      edu.fieldofstudy = fieldofstudy ? fieldofstudy : '';
      edu.from = from ? from : '';
      edu.to = to ? to : '';
      edu.current = current ? current : false;
      edu.description = description ? description : '';

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete profile education
// @access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.experience.findIndex(
      (edu) => edu.id === req.params.edu_id
    );
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/profile/user/:user_id/posts
// @desc     View specific person posts
// @access   Private
router.get('/user/:user_id/posts', auth, async (req, res) => {
  try {
    //Check user
    const user = await User.findById(req.params.user_id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User does not exist!' });
    }

    // const allPosts = await Post.aggregate([
    //     {
    //         $match: {
    //             user: req.params.user_id
    //         }
    //     },
    //     {
    //         $sort: {
    //             date: -1
    //         }
    //     }
    // ])

    const posts = await Post.find({ user: req.params.user_id }).sort({
      date: -1,
    });

    if (!posts) {
      return res.status(404).json({ msg: 'No posts found.' });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User does not exist!' });
    }

    return res.status(500).send('Server error');
  }
});

// @route    GET api/profile/user/:user_id/followers
// @desc     View followers of a person
// @access   Private
router.get('/user/:user_id/followers', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: 'There is no profile for this user.' });
    }

    if (profile.followers.length === 0) {
      return res.json({ msg: 'The person has no followers.' });
    }

    res.json(profile.followers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    GET api/profile/user/:user_id/following
// @desc     View followings of a person
// @access   Private
router.get('/user/:user_id/following', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id });
    if (!profile) {
      return res
        .status(404)
        .json({ msg: 'There is no profile for this user.' });
    }

    if (profile.following.length === 0) {
      return res.json({ msg: 'The person is not following anyone.' });
    }

    res.json(profile.following);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/user/:user_id/follow
// @desc     Follow a person
// @access   Private
router.put('/user/:user_id/follow', auth, async (req, res) => {
  try {
    const userOfTarget = await User.findById(req.params.user_id).select(
      '-password'
    );
    const profileOfTarget = await Profile.findOne({ user: req.params.user_id });

    if (!profileOfTarget) {
      return res
        .status(404)
        .json({ msg: 'There is no profile for this user.' });
    }

    //User cannot follow itself
    if (req.user.id === req.params.user_id) {
      return res.status(400).json({ msg: 'You cannot follow yourself!' });
    }

    //Check if the user has already followed
    if (
      profileOfTarget.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You have already followed this user.' });
    }

    const userOfUser = await User.findById(req.user.id).select('-password');
    const profileOfUser = await Profile.findOne({ user: req.user.id });

    const newFollower = {
      user: req.user.id,
      name: userOfUser.name,
      avatar: userOfUser.avatar,
    };
    const newFollowing = {
      user: req.params.user_id,
      name: userOfTarget.name,
      avatar: userOfTarget.avatar,
    };

    profileOfTarget.followers.unshift(newFollower);
    profileOfUser.following.unshift(newFollowing);

    await profileOfTarget.save();
    await profileOfUser.save();

    res.json({
      data: { userFollowing: profileOfUser.following, targetFollowers: profileOfTarget.followers },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    PUT api/profile/user/:user_id/unfollow
// @desc     Unfollow a person
// @access   Private
router.put('/user/:user_id/unfollow', auth, async (req, res) => {
  try {
    const profileOfTarget = await Profile.findOne({ user: req.params.user_id });

    if (!profileOfTarget) {
      return res
        .status(404)
        .json({ msg: 'There is no profile for this user.' });
    }

    //User cannot unfollow itself
    if (req.user.id === req.params.user_id) {
      return res.status(400).json({ msg: 'You cannot unfollow yourself!' });
    }

    //Check if the user has already followed
    if (
      profileOfTarget.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: 'You are not following the person yet.' });
    }

    const profileOfUser = await Profile.findOne({ user: req.user.id });

    const removeIndexInFollower = profileOfTarget.followers.findIndex(
      (follower) => follower.user.toString() === req.user.id
    );
    profileOfTarget.followers.splice(removeIndexInFollower, 1);
    const removeIndexInFollowing = profileOfUser.following.findIndex(
      (following) => following.user.toString() === req.params.user_id
    );
    profileOfUser.following.splice(removeIndexInFollowing, 1);

    await profileOfTarget.save();
    await profileOfUser.save();

    res.json({
      data: { userFollowing: profileOfUser.following, targetFollowers: profileOfTarget.followers },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
});

// @route    GET api/profile/github/:username
// @desc     Get user repos from github
// @access   Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );
    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${process.env.GITHUBTOKEN}`,
    };

    const githubResponse = await axios.get(uri, { headers });
    return res.json(githubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(404).send('No Github profile found.');
  }
});

module.exports = router;
