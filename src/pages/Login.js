import { useState } from 'react';
import axios from 'axios';
import { useStores } from '../hooks/useStore';
import { useTranslation } from 'next-i18next';

export const Auth = async (accessToken) => {
  return await axios
    .get('https://api.pay2pitch.app/customers/me/', {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res);
      return axios.post('/api/user', res.data).then((res) => {
        return res.data;
      });
    })
    .catch(function (error) {
      console.log(error?.response?.data);
    });
};

function Login(props) {
  const [auth, setAuth] = useState({});
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorText, setErrorText] = useState([]);

  const [errorEmail, setEmailError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);

  const { userStore } = useStores();
  const { t, i18n, ready } = useTranslation();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        'https://api.pay2pitch.app/api/auth/',
        JSON.stringify({ ...user }),

        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const accessToken = await response?.data?.token;
      props.falseModal();
      Auth(accessToken).then((res) => {
        userStore.setUser(res);
        window.location.reload();
      });
      userStore.setIsLogged(true);
      localStorage.setItem('token', accessToken);
    } catch (error) {
      let obj = error?.response?.data;
      setEmailError(false);
      setPasswordError(false);
      for (let key in obj) {
        console.log(key, obj);
        if (key === 'email') {
          setEmailError(obj[key][0]);
        }
        if (key === 'password') {
          setPasswordError(obj[key][0]);
        }
        if (key === 'non_field_errors') {
          setPasswordError(true);
        }
      }
    }
  };
  return (
    <>
      <h1 className="modal-log-h1">{t('login.text_text_title')}</h1>
      <p className="modal-log-p">{t('login.text_text_subtitle')}</p>
      <div className="email">
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
      <div className="password">
        <input
          className={errorPassword !== false ? 'form__input error' : 'form__input'}
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(e)}
          placeholder={t('signup-field.password')}
        />
        {errorPassword !== false ? (
          <p className="error-p">Check the correctness of the entered data</p>
        ) : (
          ''
        )}
      </div>
      <p className="forgot-password-a" onClick={props.updateForgotPassword}>
        {t('login.text_text_content')}
      </p>
      <button className="btn btn-primary modal-btn" onClick={(e) => handleSubmit(e)} type="submit">
        <span>{t('login.text.button')}</span>
        <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
      </button>
      <p>
        {t('dont.have.acc')} <a onClick={props.switch}>{t('dont.have.acc_text_title')}</a>
      </p>
      <p className="modal-error-p">{errorText}</p>
    </>
  );
}
export default Login;
