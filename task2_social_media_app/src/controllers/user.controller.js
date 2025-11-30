import prisma from '../utils/prisma.js';

export const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: { following: true, followers: true, posts: true },
  });
  const currentUser = req.user;
  const enhancedUsers = users.map((u) => {
    const isFollowing = currentUser
      ? u.followers.some((f) => f.follower_id === currentUser.id)
      : false;

    return { ...u, isFollowing };
  });
  return res.render('users/getAllUsers', {
    message: `SUCCESSFULLY RETRIEVED ALL USERS`,
    currentUser,
    users: enhancedUsers,
  });
};

export const getOneUser = async (req, res) => {
  const { username } = req.params;
  const user = await prisma.user.findUnique({
    where: { username },
    include: { posts: true, following: true, followers: true },
  });
  if (!user) {
    return res.render('users/allUsers', {
      message: `NOT FOUND SUCH A USERNAME IN THE DATABASE, SORRY!`,
      redirect: 'users',
    });
  }
  let isFollowing = false;
  if (req.user) {
    isFollowing = user.followers.some((f) => f.follower_id === req.user.id);
  }
  return res.render('users/getOneUser', {
    message: `SUCCESSFULLY RETRIEVED THE USER FROM THE DATABASE`,
    profileUser: user,
    isFollowing,
    currentUser: req.user,
  });
};

export const followUser = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUser = req.user;
    if (!currentUser) {
      return res.render('partials/messages', {
        message: `UNAUTHORIZED, PLEASE LOG IN OR REGISTER FIRST!`,
        errors: null,
        redirect: 'users'
      });
    }
    const targetUser = await prisma.user.findUnique({
      where: { username },
      include: { following: true, followers: true, posts: true },
    });
    if (!targetUser) {
      return res.render('partials/messages', {
        message: `NOT FOUND SUCH A USERNAME, PLEASE CHECK THE SPELLING!`,
        errors: null,
        redirect: '/users'
      });
    }
    if (targetUser.id === currentUser.id) {
      return res.render('partials/messages', {
        message: `YOU CANNOT FOLLOW YOURSELF!`,
        errors: null,
       redirect: `/profile`
      });
    }
    const existingFollowing = await prisma.follow.findFirst({
      where: {
          follower_id: currentUser.id,
          following_id: targetUser.id,
      },
    });
    if (existingFollowing) {
      return res.render('errors', {
        message: `YOU ARE ALREADY FOLLOWING THIS USER? DO YOU WANT TO UNFOLLOW THIS USER?`,
        redirect: `/users/${username}`,
      });
    }
    await prisma.follow.create({
      data: { follower_id: currentUser.id, following_id: targetUser.id },
    });

    return res.render('partials/messages', {
      message: `SUCCESFFULLY FOLLOWED THIS USER ${username}`,
      redirect: `/users/${username}`
    });
  } catch (err) {
    return res.render('errors', {
      message: err.message,
     redirect: '/users',
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { username } = req.params;
    const currentUser = req.user;
    if (!currentUser) {
      return res.render('partials/messages', {
        message: `UNAUTHORIZED, PLEASE LOG IN OR REGISTER FIRST!`,
        errors: null,
        redirect: 'users'
      });
    }
    const targetUser = await prisma.user.findUnique({
      where: { username },
      include: { following: true, followers: true, posts: true },
    });
    if (!targetUser) {
      return res.render('partials/messages', {
        message: `NOT FOUND SUCH A USERNAME, PLEASE CHECK THE SPELLING!`,
        errors: null,
        redirect: 'users'
      });
    }
    if (targetUser.id === currentUser.id) {
      return res.render('partials/messages', {
        message: `YOU CANNOT UNFOLLOW YOURSELF!`,
        errors: null,
        redirect: `profile`
      });
    }
    const existingFollowing = await prisma.follow.findFirst({
      where: {
          follower_id: currentUser.id,
          following_id: targetUser.id,
      },
    });
    if (!existingFollowing) {
      return res.render('errors', {
        message: `YOU ARE NOT FOLLOWING THIS USER YET? DO YOU WANT TO FOLLOW THIS USER?`,
        redirect: `users/${username}`,
      });
    }
    await prisma.follow.delete({ where: { id: existingFollowing.id } });
    return res.render('partials/messages', {
      message: `SUCCESFFULLY UNFOLLOWED THIS USER ${username}`,
      redirect: `users/${username}`

    });
  } catch (err) {
    return res.render('errors', {
      message: err.message,
      redirect: 'users'
    });
  }
};
