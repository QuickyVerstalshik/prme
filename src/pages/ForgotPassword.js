import { useState, useContext } from 'react';
import axios from 'axios';
import { useStores } from '../hooks/useStore';
import { useTranslation } from 'next-i18next';
import { appContext } from '../components/Layout';

function ForgotPassword(props) {
  const appCtx = useContext(appContext);
  const [email, setEmail] = useState(null);
  const [errorText, setErrorText] = useState([]);

  const [errorEmail, setEmailError] = useState(false);

  const { userStore } = useStores();
  const { t, i18n, ready } = useTranslation();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
      console.log(email);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
    };
    console.log(user);
    axios
      .post('https://api.pay2pitch.app/api/auth/password_reset/', { ...user })
      .then((res) => {
        props.falseAllModals();
        props.updateStateSendEmailPassword();
        setEmailError(false);
      })
      .catch(function (error) {
        let obj = error?.response?.data;
        setEmailError(false);
        for (let key in obj) {
          console.log(key, obj);
          if (key === 'email') {
            setEmailError(obj[key][0]);
          }
        }
      });
  };
  return (
    <>
      <h1 className="modal-log-h1">{t('forgotpassword.title.button_text_title')}</h1>
      <p className="modal-log-p">{t('forgotpassword.title.button_text_subtitle')}</p>
      <div className="email">
        <input
          type="email"
          id="email"
          className={errorEmail !== false ? 'form__input error' : 'form__input'}
          value={email}
          onChange={(e) => handleInputChange(e)}
          placeholder="Email"
        />
        {errorEmail !== false ? <p className="error-p">{errorEmail}</p> : ''}
      </div>
      <button className="btn btn-primary modal-btn" onClick={(e) => handleSubmit(e)} type="submit">
        <span>{t('forgotpassword.title.button_button_text')}</span>
        <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
      </button>
      <p className="modal-error-p">{errorText}</p>
    </>
  );
}
export default ForgotPassword;
