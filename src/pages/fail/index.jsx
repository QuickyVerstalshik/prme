import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Fail() {
  const { t, i18n, ready } = useTranslation();

  return (
    <main className="main main-page-ai">
      <div className="first-screen">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="first-screen__content-col-1">
                <h1 className="first-screen__content-col-1_title">{t('fail.all_text_title')}</h1>
                <p className="first-screen__content-col-1_subtitlecontact">{t('fail.all')}</p>
              </div>
            </div>
            <div className="col-12 col-md-6 position-relative">
              <div className="first-screen__content-col-2">
                <div className="first-screen__content-col-2_content">
                  <img
                    src="./assets/img/fail/main.png"
                    alt="main"
                    className="first-screen__content-col-2_blob-laptopcontact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
