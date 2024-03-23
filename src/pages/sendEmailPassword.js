import { useTranslation } from 'next-i18next';

function SendEmailPassword(props) {
  const { t, i18n, ready } = useTranslation();

  return (
    <>
      <h1 className="modal-log-h1">{t('forgotpassword.emailsent.title_text_title')}</h1>
      <p className="modal-log-p">{t('forgotpassword.emailsent.title_text_content')}</p>
    </>
  );
}
export default SendEmailPassword;
