import { useTranslation } from 'next-i18next';

function GoRegOrLog(props) {
  const { t, i18n, ready } = useTranslation();

  return (
    <>
      <h1 className="modal-log-h1">{t('regorlog_text_title')}</h1>
      <p className="modal-log-p">{t('regorlog_text_subtitle')}</p>
      <div className="regorlog-buttons">
        <button
          className="btn btn-primary modal-btn"
          onClick={() => {
            props.falseAllModals();
            props.updateStateLogin();
          }}>
          <span>{t('login.text.button')}</span>
        </button>
        <button
          className="btn btn-primary modal-btn"
          onClick={() => {
            props.falseAllModals();
            props.updateStateRegister();
          }}>
          <span>{t('header-footer.sign-up-button')}</span>
        </button>
      </div>
    </>
  );
}
export default GoRegOrLog;
