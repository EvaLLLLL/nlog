/**
 * @file 注册页面
 */

import { NextPage } from 'next';
import React from 'react';
import axios, { AxiosError } from 'axios';
import styled from 'styled-components';

export const SignUp: NextPage = () => {
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    passwordConfirmation: '',
  });

  const [errors, setErrors] = React.useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  });

  const onSubmit = React.useCallback(
    async e => {
      e.preventDefault();
      axios.post('/api/users', formData).then(
        () => {},
        error => {
          if (error.response) {
            const { response } = error as AxiosError;
            if (response.status === 422) {
              setErrors({ ...error, ...response.data });
            }
          }
        }
      );
    },
    [formData]
  );

  return (
    <>
      <h1>注册</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            用户名{' '}
            <input
              type="text"
              value={formData.username}
              onChange={e =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>
          {errors.username?.length ? (
            <Error>{errors.username.join(',')}</Error>
          ) : null}
        </div>

        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={e =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
          {errors.password?.length ? (
            <Error>{errors.password.join(',')}</Error>
          ) : null}
        </div>

        <div>
          <label>
            确认密码
            <input
              type="password"
              value={formData.passwordConfirmation}
              onChange={e =>
                setFormData({
                  ...formData,
                  passwordConfirmation: e.target.value,
                })
              }
            />
          </label>
          {errors.passwordConfirmation?.length ? (
            <Error>{errors.passwordConfirmation.join(',')}</Error>
          ) : null}
        </div>

        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;

const Error = styled.div`
  color: red;
`;
