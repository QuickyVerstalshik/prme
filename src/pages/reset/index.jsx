'use client';
import React, { Component, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ResetPassword() {
  const { t, i18n, ready } = useTranslation();
  const router = useRouter();
  const [password, setPassword] = useState(null);
  const [confpassword, setConfPassword] = useState(null);

  const [errorConfPassword, setConfPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [succesPut, setSuccesPut] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confpassword') {
      setConfPassword(value);
    }
    if (password !== confpassword) {
      setConfPasswordError('Password mismatch. Try again.');
    }
    if (password == confpassword) {
      setConfPasswordError(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = router.query.token;
    const user = {
      password: password,
      token: token,
    };

    if (password == confpassword) {
      axios
        .post(`https://api.pay2pitch.app/api/auth/password_reset/confirm/`, { ...user })
        .then((res) => {
          setSuccesPut(true);
        })
        .catch(function (error) {
          let obj = error?.response?.data;
          setPasswordError(false);
          for (let key in obj) {
            console.log(key, obj);
            if (key === 'password') {
              setPasswordError(obj[key][0]);
            }
          }
        });
    }
  };

  return (
    <>
      <main className="main main-page-faq">
        <div className="container resetting">
          <div className="modal-reg resetting">
            <h1 className="modal-log-h1 resetting">{t('password.reset')} </h1>
            <div className="input-container">
              <input
                className="form__input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
                placeholder={t('signup-field.password')}
              />
              {passwordError !== false ? <p className="error-p">{passwordError}</p> : ''}
            </div>
            <div className="input-container">
              <input
                className="form__input"
                type="password"
                id="confpassword"
                onChange={(e) => {
                  handleInputChange(e);
                }}
                placeholder={t('signup-field.confirmpassword')}
              />
              {password !== confpassword ? <p className="error-p">{errorConfPassword}</p> : ''}
            </div>
            {succesPut !== true ? (
              <button
                className="btn btn-primary modal-btn"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}>
                <span>Login</span>
                <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
              </button>
            ) : (
              ''
            )}

            {succesPut !== false ? (
              <>
                <p className="error-cabinet succes reset">{t('success.all_text_title')}</p>
                <button
                  className="btn btn-primary modal-btn"
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}>
                  <span>{t('thx.for.reg_button_text')}</span>
                  <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                </button>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </>
  );
}
