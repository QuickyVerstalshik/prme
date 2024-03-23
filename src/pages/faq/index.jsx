'use client';
import React, { Component, useState } from 'react';
import { useTranslation } from 'next-i18next';
import ContactUs from '../../components/contactus';
import { Helmet } from 'react-helmet';

export default function Faq() {
  const { t, i18n, ready } = useTranslation();
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const [menu3, setMenu3] = useState(false);
  const [menu4, setMenu4] = useState(false);
  const [menu5, setMenu5] = useState(false);
  const [menu6, setMenu6] = useState(false);

  const toggleMenu1 = () => {
    setMenu1(!menu1);
  };
  const toggleMenu2 = () => {
    setMenu2(!menu2);
  };
  const toggleMenu3 = () => {
    setMenu3(!menu3);
  };
  const toggleMenu4 = () => {
    setMenu4(!menu4);
  };
  const toggleMenu5 = () => {
    setMenu5(!menu5);
  };
  const toggleMenu6 = () => {
    setMenu6(!menu6);
  };

  const show1 = menu1 ? 'show' : '';
  const show2 = menu2 ? 'show' : '';
  const show3 = menu3 ? 'show' : '';
  const show4 = menu4 ? 'show' : '';
  const show5 = menu5 ? 'show' : '';
  const show6 = menu6 ? 'show' : '';
  return (
    <>
      <main className="main main-page-faq">
        <img src="./assets/img/ellipse-576.png" alt="" className="main-page-faq__ellipse" />
        <div className="faq-first-screen">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <h1 className="faq-first-screen__title">{t('faq.title_text_title')}</h1>
              </div>
              <div className="col-12 col-md-6">
                <div className="faq-first-screen__img-wrap">
                  <img
                    src="./assets/img/faq/image-first-screen.png"
                    alt=""
                    className="faq-first-screen__img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-accordion">
          <div className="container">
            <div className="accordion accordion-flush" id="accordionFaq">
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-1">
                  <button
                    className={`accordion-button  ${menu1 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu1()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-1">
                    {t('faq.1_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-1"
                  className={'accordion-collapse collapse' + show1}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.1_text_content')}</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-2">
                  <button
                    className={`accordion-button  ${menu2 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu2()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-2">
                    {t('faq.2_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-2"
                  className={'accordion-collapse collapse' + show2}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.2_text_content')}</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-3">
                  <button
                    className={`accordion-button  ${menu3 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu3()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-3">
                    {t('faq.3_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-3"
                  className={'accordion-collapse collapse' + show3}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.3_text_content')}</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-4">
                  <button
                    className={`accordion-button  ${menu4 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu4()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-4">
                    {t('faq.4_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-4"
                  className={'accordion-collapse collapse' + show4}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.4_text_content')}</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-5">
                  <button
                    className={`accordion-button  ${menu5 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu5()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-5">
                    {t('faq.5_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-5"
                  className={'accordion-collapse collapse' + show5}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.5_text_content')}</div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-heading-6">
                  <button
                    className={`accordion-button  ${menu6 ? '' : 'collapsed'} `}
                    type="button"
                    data-bs-toggle="collapse"
                    onClick={() => toggleMenu6()}
                    aria-expanded="false"
                    aria-controls="flush-collapse-6">
                    {t('faq.6_text_title')}
                  </button>
                </h2>
                <div
                  id="flush-collapse-6"
                  className={'accordion-collapse collapse' + show6}
                  aria-labelledby="flush-heading-1"
                  data-bs-parent="#accordionFaq">
                  <div className="accordion-body">{t('faq.6_text_content')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-us">
          <ContactUs />
        </div>
        <Helmet>
          <title>{t('pages_text_content')}</title>
        </Helmet>
      </main>
    </>
  );
}
