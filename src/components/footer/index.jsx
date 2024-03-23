import React, { Component } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Footer(props) {
  const { t, i18n, ready } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-content__logo">
            <img
              src="./assets/img/logo.svg"
              className="footer-content__logo_image"
              alt="content__logo_image"
            />
          </div>
          <div className="footer-content__links">
            <Link className="footer-content__links_link" href="/store">
              {t('footer.nav.item1')}
            </Link>
            <Link className="footer-content__links_link" href="/faq">
              {t('footer.nav.item2')}
            </Link>
            <Link className="footer-content__links_link" href="/contacts">
              {t('footer.nav.item3')}
            </Link>
          </div>
        </div>
        <div className="footer__copy">
          <div className="footer__copy_year">© 2023</div>
          <div className="footer__copy_links">
            <a className="footer__copy_link"></a>
            <span></span>
            <Link className="footer__copy_link" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
