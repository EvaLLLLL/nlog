/**
 * @file users api
 */

import { NextApiHandler } from 'next';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { User } from '../../src/entity/User';
import md5 from 'md5';

const users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;

  const errors: {
    username: string[];
    password: string[];
    passwordConfirmation: string[];
  } = {
    username: [],
    password: [],
    passwordConfirmation: [],
  };

  if (username.trim().length === '') {
    errors.username.push('用户名不能为空');
  }

  if (!(/[a-zA-Z-0-9]/.test(username.trim()))) {
    errors.username.push('用户名不合法');
  }

  if (username.trim().length > 42) {
    errors.username.push('用户名过长');
  }
  if (username.trim().length <= 3) {
    errors.username.push('用户名过短');
  }

  if (password === '') {
    errors.password.push('密码不能为空');
  }

  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push('密码不匹配');
  }

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (Object.values(errors).some(val => val.length)) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username.trim();
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }

  res.end();
};

export default users;
