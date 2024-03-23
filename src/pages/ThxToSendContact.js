import { useState } from 'react';
import axios from 'axios';
import { useStores } from '../hooks/useStore';
import { useTranslation } from 'next-i18next';

function ThxToSendContact(props) {
  const { t, i18n, ready } = useTranslation();

  return (
    <>
      <h1 className="modal-log-h1">{t('answer.sent')}</h1>
      <p className="modal-log-p">{t('answer.sent_text_title')}</p>
      <button className="btn btn-primary modal-btn" onClick={props.falseAllModals}>
        <span>{t('answer.sent_button_text')}</span>
        <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
      </button>
    </>
  );
}
export default ThxToSendContact;
