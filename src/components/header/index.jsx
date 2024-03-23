import React, { useEffect, useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { getSession } from '../../lib/get-session.js';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStore';

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  return {
    props: {
      userData: session.user,
    },
  };
};

const friendOptions = [
  {
    key: 'en',
    text: 'en',
    value: 'en',
    image: { avatar: true, src: './assets/img/product/UK.svg' },
  },
  {
    key: 'ru',
    text: 'ru',
    value: 'ru',
    image: { avatar: true, src: './assets/img/product/RU.svg' },
  },
  {
    key: 'ua',
    text: 'ua',
    value: 'ua',
    image: { avatar: true, src: './assets/img/product/UA.svg' },
  },
];

function Header(props) {
  const { t, i18n, ready } = useTranslation();
  useEffect(() => {
    const headerNav = document.querySelector('#header');
    let currentScrollPos = window.pageYOffset;

    window.onscroll = function () {
      currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 50) {
        headerNav.classList.add('header-fix');
      } else {
        headerNav.classList.remove('header-fix');
      }
    };
  }, []);
  const onLangChange = (e) => {
    i18n.changeLanguage(e, (err, t) => {
      if (err) return console.log('something went wrong loading', err);
      t('key');
    });
  };
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();

  return (
    <header className="header fixed-top" id="header">
      <nav className="navbar navbar-expand-xl navbar-light">
        <div className="container">
          <Link href="/" className="navbar-brand header__logo">
            <img src="./assets/img/logo.svg" alt="logo-header" />
          </Link>
          <div className="mobile-dropdown-container">
            <Dropdown
              className="dropdown-lng d-xl-none"
              inline
              options={friendOptions}
              defaultValue={friendOptions[0].value}
              onChange={(e, data) => {
                onLangChange(data.value);
              }}
            />
            {true ? (
              <button
                className="d-xl-none header__toggler"
                type="button"
                onClick={props.updateState}
                role="button"
                aria-controls="offcanvasNavMenu">
                <img src="./assets/img/icons/menu.png" alt="" />
              </button>
            ) : (
              <button
                className="d-xl-none header__toggler"
                type="button"
                onClick={props.updateStateGoRegOrLog}
                role="button"
                aria-controls="offcanvasNavMenu">
                <img src="./assets/img/icons/menu.png" alt="" />
              </button>
            )}
          </div>

          <div className="d-none d-xl-flex justify-content-start align-items-center">
            <ul className="navbar-nav flex-shrink-0">
              {/* <li className="nav-item">
                <Link className="nav-link" href="/">
                  {t('header.nav.item1')}
                </Link>
              </li> */}

              {true ? (
                <li className="nav-item">
                  <Link className="nav-link" href="/store">
                    {t('header.nav.item2')}
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" onClick={props.updateStateGoRegOrLog}>
                    {t('header.nav.item2')}
                  </a>
                </li>
              )}
              {/*<li className="nav-item">
                <Link className="nav-link" href="/ai">
                  {t('header.nav.item3')}
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/developing">
                  {t('header.nav.item4')}
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/faq">
                  {t('header.nav.item5')}
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" href="/developing">
                  {t('header.nav.item6')}
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="/membership">
                  {t('membership.menu')}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/contacts">
                  {t('header.nav.item7')}
                </Link>
              </li>
            </ul>

            {/*  */}
          </div>
          {isLogged ? (
            <ul className="header-login-ul">
              <div className="login-container">
                <Link href="/cabinet">
                  <p className="nickname-p">{username}</p>
                </Link>

                <a onClick={clearUser} className="btn btn-log-out">
                  {t('header-footer.log-out-button')}
                </a>
              </div>
              <div className="language-dropdown">
                <Dropdown
                  className="dropdown-lng"
                  inline
                  options={friendOptions}
                  defaultValue={friendOptions[0].value}
                  onChange={(e, data) => {
                    onLangChange(data.value);
                  }}
                />
              </div>
            </ul>
          ) : (
            <ul className="header-login-ul">
              <li className="nav-item">
                <a className="nav-link" onClick={props.updateStateLogin}>
                  {t('login.text.button')}
                </a>
              </li>
              <a className="btn btn-sign-up" onClick={props.updateStateRegister}>
                {t('header-footer.sign-up-button')}
              </a>
              <Dropdown
                className="dropdown-lng"
                inline
                options={friendOptions}
                defaultValue={friendOptions[0].value}
                onChange={(e, data) => {
                  onLangChange(data.value);
                }}
              />
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}

export default observer(Header);
