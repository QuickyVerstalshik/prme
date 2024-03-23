'use client';
import React, { useEffect, createContext, useState } from 'react';
import Header from './header';
import Footer from './footer/index';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PersonAdd from '../pages/Registration';
import Login, { Auth } from '../pages/Login';
import { useStores } from '../hooks/useStore';
import ForgotPassword from '../pages/ForgotPassword';
import ThxToSendContact from '../pages/ThxToSendContact';
import SendEmailPassword from '../pages/sendEmailPassword';
import ThxForRegistration from '../pages/ThxForRegistration';
import GoRegOrLog from '../pages/GoRegOrLog';

export const appContext = createContext(null);

function Layout(props) {
  let [showNavExternal, setShowNavExternal] = useState(false);
  let [showLoginModal, setShowLoginModal] = useState(false);
  let [showRegisterModal, setShowRegisterModal] = useState(false);
  let [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  let [showThxToSendContactModal, setThxToSendContactModal] = useState(false);
  let [showThxForRegistrationModal, setThxForRegistrationModal] = useState(false);
  let [goRegOrLog, setGoRegOrLog] = useState(false);
  let [showSendEmailPasswordModal, setSendEmailPasswordModal] = useState(false);
  const { userStore } = useStores();

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (saved) {
      Auth(saved).then((res) => {
        console.log(res);
        userStore.setIsLogged(true);
        console.log(res);
        userStore.setUser(res);
      });
    }
  }, []);

  const updateState = () => {
    setShowNavExternal(!showNavExternal);
  };
  const updateStateLogin = () => {
    setShowLoginModal(!showLoginModal);
  };
  const updateStateThxToSendContact = () => {
    setThxToSendContactModal(!showThxToSendContactModal);
  };
  const updateStateThxForRegistration = () => {
    setThxForRegistrationModal(!showThxForRegistrationModal);
  };
  const updateStateGoRegOrLog = () => {
    setGoRegOrLog(!goRegOrLog);
  };
  const updateStateSendEmailPassword = () => {
    setSendEmailPasswordModal(!showSendEmailPasswordModal);
  };

  const falseModal = () => {
    setShowLoginModal(false);
  };
  const updateStateRegister = () => {
    setShowRegisterModal(!showRegisterModal);
  };
  const switchStateModal = () => {
    setShowLoginModal(!showLoginModal);
    setShowRegisterModal(!showRegisterModal);
  };
  const falseAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowForgotPasswordModal(false);
    setThxToSendContactModal(false);
    setSendEmailPasswordModal(false);
    setThxForRegistrationModal(false);
    setGoRegOrLog(false);
  };
  const updateForgotPassword = () => {
    falseAllModals();
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };
  const { t, i18n, ready } = useTranslation();
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();
  return (
    <>
      <div className="page-home page">
        <div
          className={`wrapper-all page  ${
            showRegisterModal ||
            showLoginModal ||
            showForgotPasswordModal ||
            showThxToSendContactModal ||
            showSendEmailPasswordModal ||
            showThxForRegistrationModal ||
            goRegOrLog
              ? 'blur'
              : ''
          }`}>
          <Header
            updateState={updateState}
            updateStateLogin={updateStateLogin}
            updateStateRegister={updateStateRegister}
            switchStateModal={switchStateModal}
            updateStateGoRegOrLog={updateStateGoRegOrLog}
          />
          <div
            className={
              showNavExternal
                ? 'offcanvas offcanvas-end d-xl-none show'
                : 'offcanvas offcanvas-end d-xl-none'
            }
            id="offcanvasNavMenu">
            <div className="offcanvas-header pb-0">
              <Link href="/" className="header__logo">
                <img src="./assets/img/logo.svg" alt="" />
              </Link>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={updateState}></button>
            </div>
            <div className="offcanvas-body navbar-light">
              <ul className="navbar-nav mb-3">
                {/* <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('header.nav.item1')}
                  </Link>
                </li> */}

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/store"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('header.nav.item2')}
                  </Link>
                </li>
                {/*<li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/ai"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('header.nav.item3')}
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/developing"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('header.nav.item4')}
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/faq"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('header.nav.item5')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/cabinet"
                    onClick={() => {
                      updateState();
                    }}>
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/membership"
                    onClick={() => {
                      updateState();
                    }}>
                    {t('membership.menu')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    href="/contacts"
                    onClick={() => {
                      updateState();
                    }}>
                    Contacts
                  </Link>
                </li>
              </ul>
              {isLogged ? (
                <>
                  <Link
                    className="mobile-username"
                    href="/cabinet"
                    onClick={() => {
                      updateState();
                    }}>
                    {username}
                  </Link>

                  <a
                    className="btn btn-login"
                    onClick={() => {
                      clearUser();
                      updateState();
                    }}>
                    {t('header-footer.log-out-button')}
                  </a>
                </>
              ) : (
                <>
                  <a
                    className="btn btn-login"
                    onClick={() => {
                      updateStateLogin();
                      updateState();
                    }}>
                    {t('login.text.button')}
                  </a>
                  <a className="btn btn-sign-up" onClick={() => updateStateRegister()}>
                    {t('header-footer.sign-up-button')}
                  </a>
                </>
              )}
            </div>
          </div>
          <appContext.Provider
            value={{
              updateState,
              updateStateLogin,
              falseModal,
              updateStateRegister,
              switchStateModal,
              updateStateThxToSendContact,
              falseAllModals,
              updateForgotPassword,
              updateStateGoRegOrLog,
            }}>
            {props.children}
          </appContext.Provider>
          <Footer updateStateLogin={updateStateLogin} updateStateRegister={updateStateRegister} />
        </div>
        {showNavExternal ? (
          <div className="offcanvas-backdrop fade show" onClick={updateState}></div>
        ) : (
          ''
        )}
        {showRegisterModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={updateStateRegister}></div>
            <div className="modal-reg">
              <PersonAdd
                updateStateRegister={updateStateRegister}
                falseAllModals={falseAllModals}
                switch={switchStateModal}
                updateStateThxForRegistration={updateStateThxForRegistration}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {showLoginModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={updateStateLogin}></div>
            <div className="modal-reg">
              <Login
                falseModal={falseModal}
                updateStateLogin={updateStateLogin}
                switch={switchStateModal}
                falseAllModals={falseAllModals}
                updateForgotPassword={updateForgotPassword}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {showForgotPasswordModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={falseAllModals}></div>
            <div className="modal-reg">
              <ForgotPassword
                falseAllModals={falseAllModals}
                updateStateSendEmailPassword={updateStateSendEmailPassword}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {showThxToSendContactModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={falseAllModals}></div>
            <div className="modal-reg full">
              <ThxToSendContact falseAllModals={falseAllModals} />
            </div>
          </div>
        ) : (
          ''
        )}

        {showSendEmailPasswordModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={falseAllModals}></div>
            <div className="modal-reg full">
              <SendEmailPassword />
            </div>
          </div>
        ) : (
          ''
        )}
        {showThxForRegistrationModal ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={falseAllModals}></div>
            <div className="modal-reg full">
              <ThxForRegistration falseAllModals={falseAllModals} />
            </div>
          </div>
        ) : (
          ''
        )}
        {goRegOrLog ? (
          <div className="modal-container">
            <div className="blur-backdrop" onClick={falseAllModals}></div>
            <div className="modal-reg">
              <GoRegOrLog
                falseAllModals={falseAllModals}
                updateStateLogin={updateStateLogin}
                updateStateRegister={updateStateRegister}
              />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
export default Layout;
