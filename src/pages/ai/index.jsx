'use client';
import React, { Component, useState } from 'react';
import { useTranslation } from 'next-i18next';
import ContactUs from '../../components/contactus';
import { Helmet } from 'react-helmet';

export default function Ai() {
  const { t, i18n, ready } = useTranslation();
  return (
    <main className="main main-page-ai">
      <div className="ai-first-screen">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <h1 className="ai-first-screen__title">{t('helpfrom.ai.title_text_title')}</h1>
              <p className="ai-first-screen__desc">{t('helpfrom.ai.title')}</p>
            </div>
            <div className="col-12 col-md-6">
              <div className="ai-first-screen__img-wrap">
                <img
                  src="./assets/img/ai/image-first-screen.png"
                  alt=""
                  className="ai-first-screen__img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ai-help">
        <img src="./assets/img/ellipse-576.png" alt="" className="ai-help__ellipse" />
        <div className="container">
          <div className="ai-help__header">
            <h3 className="ai-help__header_title">{t('helpfrom.ai.title_text_title')}</h3>
            <p className="ai-help__header_desc ai-help__desc">
              {t('helpfrom-ai.subtitle_text_title')}
            </p>
          </div>
          <div className="ai-help__list">
            <div className="ai-help__item">
              <div className="ai-help__item_number">1</div>
              <h1>{t('helpfrom-ai.intro_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom-ai.intro_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">2</div>
              <h1>{t('helpfrom.ai.purpose_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.purpose_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">3</div>
              <h1>{t('helpfrom.ai.brainstorm_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.brainstorm_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">4</div>
              <h1>{t('helpfrom.ai.outline_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.outline_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">5</div>
              <h1>{t('helpfrom.ai.credits_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.credits_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">6</div>
              <h1>{t('helpfrom.ai.expansion_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.expansion_text_content')}
              </p>
            </div>
            <div className="ai-help__item">
              <div className="ai-help__item_number">7</div>
              <h1>{t('helpfrom.ai.revision_text_title')}</h1>
              <p className="ai-help__item_desc ai-help__desc">
                {t('helpfrom.ai.revision_text_content')}
              </p>
            </div>
          </div>
          <div className="ai-help__bottom">
            <div className="ai-help__bottom_desc ai-help__desc">
              {t('helpfrom.ai.title_text_content')}
            </div>
          </div>
        </div>
      </div>

      <div className="gpt-chat">
        <img src="./assets/img/ellipse-576.png" alt="" className="gpt-chat__ellipse" />
        <div className="container">
          <div className="gpt-chat__body">
            <h2 className="gpt-chat__title">GPT Chat</h2>
            <div className="gpt-chat__form">
              <div className="gpt-chat__form_input-wrap">
                <input type="text" className="gpt-chat__form_inlet gpt-chat__form_input" />
                <button className="btn btn-primary gpt-chat__form_submit">
                  <span>{t('chat_text_title')}</span>
                  <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                </button>
              </div>
              <div className="gpt-chat__form_textarea-wrap">
                <textarea className="gpt-chat__form_inlet gpt-chat__form_textarea"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us" id="contact-us">
        <ContactUs />
      </div>
      <Helmet>
        <title>{t('pages_text_subtitle')}</title>
      </Helmet>
    </main>
  );
}
