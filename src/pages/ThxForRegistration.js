import { useState } from 'react';
import axios from 'axios';
import { useStores } from '../hooks/useStore';
import { useTranslation } from 'next-i18next';

function ThxForRegistration(props) {
  const { t, i18n, ready } = useTranslation();

  return (
    <>
      <h1 className="modal-log-h1">{t('thx.for.reg')}</h1>
      <p className="modal-log-p">{t('thx.for.reg_text_title')}</p>
      <button className="btn btn-primary modal-btn" onClick={props.falseAllModals}>
        <span>{t('thx.for.reg_button_text')}</span>
        <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
      </button>
    </>
  );
}
export default ThxForRegistration;
