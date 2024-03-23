import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Succes() {
  const { t, i18n, ready } = useTranslation();

  return (
    <main className="main main-page-ai">
      <div className="first-screen">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="first-screen__content-col-1">
                <h1 className="first-screen__content-col-1_title">{t('success.all_text_title')}</h1>
                <p className="first-screen__content-col-1_subtitlecontact">{t('success.all')}</p>
                <Link className="btn btn-primary first-screen__content-col-1_btn" href="/cabinet">
                  <span>{t('success.all_button_text')}</span>
                  <img src="./assets/img/icons/arrow-white-right.svg" alt="arrow-white" />
                </Link>
              </div>
            </div>
            <div className="col-12 col-md-6 position-relative">
              <div className="first-screen__content-col-2">
                <div className="first-screen__content-col-2_content">
                  <img
                    src="./assets/img/succes/main.png"
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
