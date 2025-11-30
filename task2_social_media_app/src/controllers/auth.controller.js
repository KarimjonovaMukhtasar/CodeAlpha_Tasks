import { generateToken } from '../helpers/jwt.js';
import { ApiError } from '../helpers/errorMessage.js';
import prisma from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

const getLoginPage = (req, res) => {
  res.render('auth/login', {
    message: null,
    data: null,
    title: 'SIGN IN',
    user: req.user || null,
    errors: null,
  });
};

const getRegisterPage = (req, res) => {
  res.render('auth/register', {
    message: null,
    data: null,
    title: 'SIGN UP',
    user: req.user || null,
    errors: null,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.error(`NOT FOUND SUCH A USER!`);
      return res.status(404).render('errors', {
        message: 'EMAIL CANNOT BE FOUND!',
        errors: null,
        user: req.user || null,
        redirect: 'login',
      });
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(404).render('errors', {
        message: 'INVALID PASSWORD OR EMAIL!',
        errors: null,
        user: req.user || null,
        redirect: 'login',
      });
    }
    const accessToken = generateToken(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.accessSecret,
      '7d',
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const refreshToken = generateToken(
      { id: user.id, email: user.email, role: user.role },
      config.jwt.refreshSecret,
      '30d',
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
      maxAge: 31 * 24 * 60 * 60 * 1000,
    });
    req.user = user;
    return res.render('users/profile', {
      title: 'MY PROFILE',
      message: `SUCCESSFULLY LOGGED IN, CONGRATULATIONS!`,
      data: null,
      profileUser: user,
      currentUser: req.user,
      errors: null,
    });
  } catch (err) {
    if (err.errors) {
      logger.error(err.message);
      return res.status(400).render('errors', {
        message: 'Validation failed',
        errors: err.errors,
        user: req.user || null,
        redirect: 'login',
      });
    }
    logger.error(err.message);
    return res.status(err.status || 500).render('errors', {
      message: err.message || 'Something went wrong',
      errors: null,
      user: req.user || null,
      redirect: 'auth/login',
    });
  }
};

const register = async (req, res) => {
  try {
    const data = req.validatedData;
    console.log(data);
    
    if (!data) {
      throw new ApiError(401, `FIELDS MUST BE FILLED CORRECTLY AND FULLY!`);
    }

    const checkDuplicate = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (checkDuplicate) {
      throw new ApiError(400, `THIS USER ALREADY EXISTS IN DATABASE!`);
    }
    data.password = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({ data });
    return res.render('auth/login', {
      title: 'SIGN ',
      message: `SUCCESSFULLY REGISTERED, CONGRATULATIONS!`,
      data: user,
      user: req.user || null,
      errors: null,
    });
  } catch (err) {
    logger.error(err.message);
    if (err.errors) {
      const formattedErrors = err.errors.map((e) => ({
        field: e.path ? e.path.join('.') : 'field',
        message: e.message,
      }));

      return res.render('auth/register', {
        title: 'SIGN UP',
        message: null,
        data: null,
        user: req.user || null,
        errors: formattedErrors,
      });
    }
    return res.status(err.status || 500).render('errors', {
      message: err.message || 'Something went wrong',
      errors: null,
      user: req.user || null,
      redirect: 'auth/register',
    });
  }
};

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).render('errors', {
        message: 'You must log in first',
        errors: null,
        redirect: 'auth/login',
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        posts: true,
        followers: true,
        following: true,
      },
    });
    if (!user) {
      throw new ApiError(
        401,
        `NOT FOUND A USER PROFILE, PLEASE, REGISTER OR LOG IN FIRST`,
      );
    }
    user.avatar = req.file
    const isFollowing = user.followers.some(
      (follower) => follower.id === req.user.id,
    );
    return res.render('users/profile', {
      title: 'GET ME',
      message: `SUCCESSFULLY RETRIEVED PROFILE DATA!`,
      data: null,
      profileUser: user,
      isFollowing,
      currentUser: req.user,
      errors: null,
    });
  } catch (err) {
    logger.error(err.message);
    return res.status(err.status || 500).render('errors', {
      message: err.message || 'Something went wrong',
      errors: null,
      redirect: 'users/profile',
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
    });
    logger.info('SUCCESSFULLY LOGGED OUT A USER');
    return res.render('auth/login', {
      message: `SUCCESSFULLY LOGGED OUT, YOU MAY WANT TO LOG IN AGAIN?`
    } );
  } catch (error) {
    console.error('Logout error:', error.message);
    return res.status(500).send('Could not log out', error.message);
  }
};
export { getLoginPage, getRegisterPage, login, register, getMe, logout };
