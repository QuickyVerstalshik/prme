import React, { Component, useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { appContext } from '../Layout';

export default function ContactUs(props) {
  const appCtx = useContext(appContext);

  const { t, i18n, ready } = useTranslation();
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [webSite, setWebSite] = useState(null);
  const [question, setQuestion] = useState(null);

  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPhone, setPhoneError] = useState(null);
  const [errorEmail, setEmailError] = useState(null);
  const [errorWebSite, setWebSiteError] = useState(null);
  const [errorQuestion, setQuestionError] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
      console.log(username);
    }
    if (id === 'phone') {
      setPhone(value);
      console.log(phone);
    }
    if (id === 'email') {
      setEmail(value);
      console.log(email);
    }
    if (id === 'website') {
      setWebSite(value);
      console.log(webSite);
    }
    if (id === 'description') {
      setQuestion(value);
      console.log(setQuestion);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      phone: phone,
      email: email,
      website: webSite,
      description: question,
    };
    axios
      .post(`https://api.pay2pitch.app/contacts/`, { ...user })
      .then((res) => {
        appCtx.falseAllModals();
        appCtx.updateStateThxToSendContact();
        setEmailError(false);
        setPhoneError(false);
        setWebSiteError(false);
        setQuestionError(false);
      })
      .catch(function (error) {
        // setErrorText(error.response.data[0]);
        let obj = error.response.data;
        setEmailError(false);
        setPhoneError(false);
        setWebSiteError(false);
        setQuestionError(false);
        for (let key in obj) {
          if (key === 'email') {
            setEmailError(obj[key][0]);
          }
          if (key === 'phone') {
            setPhoneError(obj[key][0]);
          }
          if (key === 'website') {
            setWebSiteError(obj[key][0]);
          }
          if (key === 'description') {
            setQuestionError(obj[key][0]);
          }
        }
      });
  };
  return (
    <div className="container">
      <div className="contact-us__content">
        <h2 className="contact-us__title">{t('main-form.title_text_title')}</h2>
        <div className="contact-us__form">
          <div className="contact-us__form_item">
            <input
              type="text"
              className="contact-us__form_input contact-us__form_input-name"
              placeholder={t('field.name')}
              id="username"
              value={username}
              onChange={(e) => handleInputChange(e)}
            />
            {errorUsername !== false ? <p className="error-p contacts">{errorUsername}</p> : ''}
          </div>
          <div className="contact-us__form_item">
            <input
              type="text"
              className="contact-us__form_input contact-us__form_input-phone"
              placeholder={t('field.phone')}
              id="phone"
              value={phone}
              onChange={(e) => handleInputChange(e)}
            />
            {errorPhone !== false ? <p className="error-p contacts">{errorPhone}</p> : ''}
          </div>
          <div className="contact-us__form_item">
            <input
              type="text"
              className="contact-us__form_input contact-us__form_input-email"
              placeholder={t('field.email')}
              id="email"
              value={email}
              onChange={(e) => handleInputChange(e)}
            />
            {errorEmail !== false ? <p className="error-p contacts">{errorEmail}</p> : ''}
          </div>
          <div className="contact-us__form_item">
            <input
              type="text"
              className="contact-us__form_input contact-us__form_input-website"
              placeholder={t('field.website')}
              id="website"
              value={webSite}
              onChange={(e) => handleInputChange(e)}
            />
            {errorWebSite !== false ? <p className="error-p contacts">{errorWebSite}</p> : ''}
          </div>
          <div className="contact-us__form_item contact-us__form_item-last-child">
            <textarea
              className="contact-us__form_input contact-us__form_input-textaret"
              placeholder={t('field.help')}
              id="description"
              value={question}
              onChange={(e) => handleInputChange(e)}
              rows="3"></textarea>
            {errorQuestion !== false ? <p className="error-p contacts">{errorQuestion}</p> : ''}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
              <span>{t('main-form.title_button_text')}</span>
              <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
