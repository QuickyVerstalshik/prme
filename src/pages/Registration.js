import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStores } from '../hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'next-i18next';
import { Dropdown } from 'semantic-ui-react';
import { IMaskInput } from 'react-imask';

function PersonAdd(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confpassword, setConfPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [phone, setPhone] = useState(null);
  const [company, setCompany] = useState(null);
  const [niche, setNiche] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [errorText, setErrorText] = useState([]);

  const [errorEmail, setEmailError] = useState(false);
  const [errorFullName, setFullNameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);
  const [errorCompany, setCompanyError] = useState(false);
  const [errorNiche, setNicheError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorConfPassword, setConfPasswordError] = useState(false);

  const PhoneMask = '+000000000000000';

  const { userStore } = useStores();
  const { t, i18n, ready } = useTranslation();

  const optionsCompany = [
    { key: 'Y1', value: 'Business owner', text: t('posts') },
    { key: 'Y2', value: 'Blogger', text: t('posts_text_title') },
    { key: 'Y3', value: 'PR-agent', text: t('posts_text_subtitle') },
    { key: 'Y4', value: 'Assistant', text: t('posts_text_content') },
    { key: 'Y5', value: 'Expert', text: t('posts_button_text') },
    { key: 'Y6', value: 'Other', text: t('posts_media') },
  ];

  const onCompanyChange = (e, data) => {
    const id = data.id;
    const value = data.value;
    setCompany(value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confpassword') {
      setConfPassword(value);
    }
    if (id === 'username') {
      setUsername(value);
    }
    if (id === 'phone') {
      setPhone(value);
    }
    if (id === 'company') {
    }
    if (id === 'niche') {
      setNiche(value);
    }
    if (id === 'fullName') {
      setFullName(value);
    }
    if (id === 'fullName' && value.trim().split(' ').length < 2) {
      console.log(value);
      setErrorText('Valid Name');
    } else {
      console.log(value);
      setErrorText('');
    }
    if (password !== confpassword) {
      setConfPasswordError('Password mismatch. Try again.');
    }
    if (password == confpassword) {
      setConfPasswordError(false);
    }
  };
  const handleSubmit = (event) => {
    if (typeof fullName === 'string' && fullName.split(' ').length == 2) {
      console.log('ok');
    } else if (typeof fullName === 'string' && fullName.split(' ').length == 3) {
      console.log('ok');
    } else {
      console.log('ok');
    }
    event.preventDefault();
    console.log(phone);
    const user = {
      fullName: fullName,
      email: email,
      password: password,
      confpassword: confpassword,
      username: email ? email.split('@')[0] : null,
      phone: phone,
      company: company,
      niche: niche,
      firstName: fullName ? fullName.trim().split(' ', 1)[0] : null,
      lastName: fullName ? fullName.slice(fullName.indexOf(' ') + 1) : null,
    };

    if (password == confpassword) {
      axios
        .post(`https://api.pay2pitch.app/customers/`, { ...user })
        .then((res) => {
          setEmailError(false);
          setFullNameError(false);
          setPhoneError(false);
          setCompanyError(false);
          setNicheError(false);
          setPasswordError(false);
          props.updateStateRegister();
          props.falseAllModals();
          props.updateStateThxForRegistration();
          console.log('регистрация прошла успешно');
          userStore.setUser(res.data);
          userStore.setIsLogged(true);
        })
        .catch(function (error) {
          // setErrorText(error.response.data[0]);
          console.log(error);
          let obj = error.response.data;
          setEmailError(false);
          setFullNameError(false);
          setPhoneError(false);
          setCompanyError(false);
          setNicheError(false);
          setPasswordError(false);
          for (let key in obj) {
            console.log(key, obj);
            if (key === 'email') {
              setEmailError(obj[key][0]);
            }
            if (key === 'phone') {
              setPhoneError(obj[key][0]);
            }
            if (key === 'company') {
              setCompanyError(obj[key][0]);
            }
            if (key === 'niche') {
              setNicheError(obj[key][0]);
            }
            if (key === 'password') {
              setPasswordError(obj[key][0]);
            }
            if (key === 'lastName') {
              setFullNameError(obj[key][0]);
            }
          }
        });
    }
  };

  return (
    <>
      <h1>{t('signup-field.member_text_subtitle')}</h1>
      <div className="input-container">
        <input
          type="text"
          name=""
          id="fullName"
          value={fullName}
          className={errorFullName !== false ? 'form__input error' : 'form__input'}
          onChange={(e) => handleInputChange(e)}
          placeholder={t('signup-field.firstname')}
        />
        {errorFullName !== false ? <p className="error-p">{errorFullName}</p> : ''}
      </div>
      <div className="input-container">
        <input
          type="email"
          id="email"
          className={errorEmail !== false ? 'form__input error' : 'form__input'}
          value={email}
          onChange={(e) => handleInputChange(e)}
          placeholder={t('signup-field.email')}
        />
        {errorEmail !== false ? <p className="error-p">{errorEmail}</p> : ''}
      </div>
      <div className="input-container">
        <IMaskInput
          className={errorPhone !== false ? 'form__input error' : 'form__input'}
          mask={PhoneMask}
          value={phone}
          id="phone"
          onAccept={(value, mask) => {
            setPhone(value);
          }}
          placeholder={t('signup-field.phone')}
        />
        {/* <input
          

          
          
          
          
        /> */}
        {errorPhone !== false ? <p className="error-p">{errorPhone}</p> : ''}
      </div>
      <div className="radio-container">
        <Dropdown
          onChange={(e, data) => {
            onCompanyChange(e, data);
          }}
          className={errorCompany !== false ? 'form__input error' : ''}
          options={optionsCompany}
          placeholder={t('signup-field.company')}
          selection
        />
        {errorCompany !== false ? <p className="error-p radio">{errorCompany}</p> : ''}
      </div>

      <div className="input-container">
        <input
          className={errorNiche !== false ? 'form__input error' : 'form__input'}
          type="text"
          id="niche"
          value={niche}
          onChange={(e) => handleInputChange(e)}
          placeholder={t('signup-field.typeofactivity')}
        />
        {errorNiche !== false ? <p className="error-p">{errorNiche}</p> : ''}
      </div>
      <div className="input-container">
        <input
          className={errorPassword !== false ? 'form__input error' : 'form__input'}
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(e)}
          placeholder={t('signup-field.password')}
        />
        {errorPassword !== false ? <p className="error-p">{errorPassword}</p> : ''}
      </div>
      <div className="input-container">
        <input
          className={password !== confpassword ? 'form__input error' : 'form__input'}
          type="password"
          id="confpassword"
          onChange={(e) => {
            handleInputChange(e);
          }}
          placeholder={t('signup-field.confirmpassword')}
        />
        {password !== confpassword ? <p className="error-p">{errorConfPassword}</p> : ''}
      </div>

      <button className="btn btn-primary modal-btn" onClick={(e) => handleSubmit(e)} type="submit">
        <span>{t('signup-field.button')}</span>
        <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
      </button>
      <p>
        {t('signup-field.member')}{' '}
        <a onClick={props.switch}>{t('signup-field.member_text_title')}</a>
      </p>
      <p className="modal-error-p">{errorText}</p>
    </>
  );
}

export default observer(PersonAdd);
