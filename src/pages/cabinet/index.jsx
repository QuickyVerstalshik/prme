'use client';
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Helmet } from 'react-helmet';
import { useStores } from '../../hooks/useStore';
import axios from 'axios';
import Link from 'next/link';
import { appContext } from '../../components/Layout';
import { IMaskInput } from 'react-imask';

export default function Cabinet() {
  const PhoneMask = '+000000000000000';

  const { t, i18n, ready } = useTranslation();
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();
  const token = localStorage.getItem('token');
  const appCtx = useContext(appContext);

  const [nonTouch, setNonTouch] = useState(null);

  const [email, setEmail] = useState(null);

  const [phone, setPhone] = useState(null);
  const [company, setCompany] = useState(null);
  const [niche, setNiche] = useState(null);

  const [password, setPassword] = useState(null);
  const [confpassword, setConfPassword] = useState(null);

  const [fullName, setFullName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setFastName] = useState(null);

  const [errorEmail, setEmailError] = useState(false);
  const [errorFirstName, setFirstNameError] = useState(false);
  const [errorLastName, setLastNameError] = useState(false);
  const [errorPhone, setPhoneError] = useState(false);
  const [errorCompany, setCompanyError] = useState(false);
  const [errorNiche, setNicheError] = useState(false);
  const [errorPassword, setPasswordError] = useState(false);
  const [errorConfPassword, setConfPasswordError] = useState(false);
  const [succesPut, setSuccesPut] = useState(false);

  const [buttonSubmit, setButtonSubmit] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [orders, setOrders] = useState([{ price: '', status: { name: '' } }]);

  const [showFavorites, setShowFavorites] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setButtonSubmit(true);
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confpassword') {
      setConfPassword(value);
    }
    if (id === 'phone') {
      setPhone(value);
    }
    if (id === 'company') {
      setCompany(value);
    }
    if (id === 'niche') {
      setNiche(value);
    }
    if (id === 'firstName') {
      setFirstName(value);
    }
    if (id === 'lastName') {
      setFastName(value);
    }
    if (password !== confpassword) {
      setConfPasswordError('Password mismatch. Try again.');
    }
    if (password == confpassword) {
      setConfPasswordError(false);
    }
    setButtonSubmit(true);
  };
  const handleFavouriteRemove = (e) => {
    const currentID = e.target.id;
    axios
      .delete(`https://api.pay2pitch.app/favorites/${currentID}/remove`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        axios
          .get('https://api.pay2pitch.app/customers/me/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            setFavorites(res.data.favorite);
          })
          .catch(function (error) {
            console.log(error?.response?.data);
          });
        console.log('yes');
      })
      .catch(function (error) {
        let obj = error?.response?.data;
        for (let key in obj) {
          console.log(key, obj);
        }
      });
  };

  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
      username: email ? email.split('@')[0] : null,
      phone: phone,
      company: company,
      niche: niche,
      firstName: firstName,
      lastName: lastName,
    };
    let filterUser = filterBySubField(user);
    function filterBySubField(obj) {
      let result = {};
      for (let k in obj) {
        if (obj[k] == null) {
          continue;
        } else {
          result[k] = obj[k];
        }
      }
      return result;
    }

    const lear = {
      email: nonTouch.email,
      password: nonTouch.password,
      username: nonTouch.email ? nonTouch.email.split('@')[0] : null,
      phone: nonTouch.phone,
      company: nonTouch.company,
      niche: nonTouch.niche,
      firstName: nonTouch.firstName,
      lastName: nonTouch.lastName,
    };

    function filterNon(obj1, obj2) {
      let result = {};
      for (let i in obj1) {
        if (obj1[i] === obj2[i]) {
          continue;
        } else {
          result[i] = obj1[i];
        }
      }
      return result;
    }
    let finishUser = filterNon(user, lear);
    if (password == confpassword) {
      axios
        .put('https://api.pay2pitch.app/customers/me/', finishUser, {
          headers: {
            Authorization: `token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          setEmailError(false);
          setPhoneError(false);
          setCompanyError(false);
          setNicheError(false);
          setPasswordError(false);
          setSuccesPut(true);
        })
        .catch(function (error) {
          // setErrorText(error.response.data[0]);
          console.log(error);
          let obj = error?.response?.data;
          setEmailError(false);
          setPhoneError(false);
          setCompanyError(false);
          setNicheError(false);
          setPasswordError(false);
          setFirstNameError(false);
          setLastNameError(false);
          for (let key in obj) {
            if (key === 'email') {
              setEmailError(obj[key][0]);
            }
            if (key === 'phone') {
              setPhoneError(obj[key][0]);
            }
            if (key === 'company') {
              setCompanyError(obj[key][0]);
            }
            if (key === 'niche') {
              setNicheError(obj[key][0]);
            }
            if (key === 'password') {
              setPasswordError(obj[key][0]);
            }
            if (key === 'firstName') {
              setFirstNameError(obj[key][0]);
            }
            if (key === 'lastName') {
              setLastNameError(obj[key][0]);
            }
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(`https://api.pay2pitch.app/favorites/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        let arr = res.data.results;
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    axios
      .get(`https://api.pay2pitch.app/orders/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setOrders(res.data.results);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    axios
      .get('https://api.pay2pitch.app/customers/me/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setCompany(res.data.company);
        setNiche(res.data.niche);
        setPassword(res.data.password);
        setConfPassword(res.data.confpassword);
        setFullName(res.data.fullName);
        setFirstName(res.data.firstName);
        setFastName(res.data.lastName);

        setFavorites(res.data.favorite);
        setNonTouch(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  }, []);

  return (
    <>
      {isLogged ? (
        <main className="main main-page-ai cabinet">
          <div className="container cabinet">
            <h1 className="cabinet-h1">
              {t('profile.welcome')} {username}
            </h1>
            <Tabs>
              <TabList>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/user.svg" alt="industries" />
                    {t('profile-menu.profile')}
                  </button>
                </Tab>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/paper.svg" alt="industries" />
                    {t('profile-menu.orders')}
                  </button>
                </Tab>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/book.svg" alt="industries" />
                    {t('profile-menu.wishlist')}
                  </button>
                </Tab>
              </TabList>
              <div className="tab-container">
                <TabPanel>
                  <h1 className="cabinet-panel-h1">{t('profile.description')}</h1>
                  <div className="first-tab-container">
                    <div className="tab-inner-container">
                      <div className="inputs-container">
                        <div className="cabinet-input-container">
                          <h1>{t('profile.firstname')}</h1>
                          <input
                            type="text"
                            placeholder={firstName}
                            onChange={(e) => handleInputChange(e)}
                            value={firstName}
                            id="firstName"
                          />
                          {errorFirstName !== false ? (
                            <p className="error-cabinet">{errorFirstName}</p>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="cabinet-input-container">
                          <h1>{t('profile.secondname')}</h1>
                          <input
                            type="text"
                            placeholder={lastName}
                            onChange={(e) => handleInputChange(e)}
                            value={lastName}
                            id="lastName"
                          />
                          {errorLastName !== false ? (
                            <p className="error-cabinet">{errorLastName}</p>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="inputs-container">
                        <div className="cabinet-input-container">
                          <h1>{t('profile.company')}</h1>
                          <input
                            type="text"
                            placeholder={company}
                            onChange={(e) => handleInputChange(e)}
                            value={company}
                            id="company"
                          />
                          {errorCompany !== false ? (
                            <p className="error-cabinet">{errorCompany}</p>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="cabinet-input-container">
                          <h1>{t('profile.activity')}</h1>
                          <input
                            type="text"
                            placeholder={niche}
                            onChange={(e) => handleInputChange(e)}
                            value={niche}
                            id="niche"
                          />
                          {errorNiche !== false ? (
                            <p className="error-cabinet">{errorNiche}</p>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="inputs-container">
                        <div className="cabinet-input-container">
                          <h1>{t('profile.phone')}</h1>
                          <IMaskInput
                            mask={PhoneMask}
                            value={phone}
                            id="phone"
                            onAccept={(value, mask) => {
                              setPhone(value);
                            }}
                            placeholder={phone}
                          />
                          {errorPhone !== false ? (
                            <p className="error-cabinet">{errorPhone}</p>
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="cabinet-input-container">
                          <h1>Email</h1>
                          <input
                            type="email"
                            placeholder="email"
                            onChange={(e) => handleInputChange(e)}
                            value={email}
                            id="email"
                          />
                          {errorEmail !== false ? (
                            <p className="error-cabinet">{errorEmail}</p>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                      <div className="inputs-container">
                        <div className="cabinet-input-container">
                          <h1>{t('passwords')}</h1>
                          <input
                            className="form__input"
                            type="text"
                            id="password"
                            value={password}
                            onChange={(e) => handleInputChange(e)}
                            placeholder={t('signup-field.password')}
                          />
                          {password !== confpassword ? (
                            <p className="error-cabinet">{errorConfPassword}</p>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="cabinet-input-container">
                          <h1>{t('passwords_text_title')}</h1>
                          <input
                            className="form__input"
                            type="text"
                            id="confpassword"
                            value={confpassword}
                            onChange={(e) => {
                              handleInputChange(e);
                            }}
                            placeholder={t('signup-field.confirmpassword')}
                          />
                        </div>
                      </div>
                      <div>
                        {buttonSubmit ? (
                          <button className="cabinet-button" onClick={(e) => handleSubmit(e)}>
                            {t('profile.save-button')}
                          </button>
                        ) : (
                          ''
                        )}
                        {succesPut ? <p className="error-cabinet succes">{t('changes')}</p> : ''}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="table-tab">
                  <h1 className="cabinet-panel-h1">{t('orders.description')}</h1>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>{t('orders.table')}</th>
                        <th>{t('orders.table_text_content')}</th>
                        <th className="border-mobile-status">{t('orders.table_text_title')}</th>
                        <th className="cabinet-none-mobile">{t('orders.table_text_subtitle')}</th>
                        <th className="cabinet-none-mobile">{t('orders.table_button_text')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((el, i) => (
                        <Link
                          key={i}
                          href={{
                            pathname: '/order',
                            query: {
                              id: el.id,
                            },
                          }}>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{el.name}</td>
                            <td>${el.price}</td>
                            <td className="border-mobile-status-bottom">
                              {el.status ? el.status.name : ''}
                            </td>
                            <td className="cabinet-none-mobile">{el.paymentDate}</td>
                            <td className="cabinet-none-mobile">{el.sendingDate}</td>
                          </tr>
                        </Link>
                      ))}
                    </tbody>
                  </table>
                </TabPanel>
                <TabPanel>
                  <h1 className="cabinet-panel-h1">{t('wishlist.description')}</h1>
                  <div className="row store-wishlist__row cabinet">
                    {favorites.map((el, i) => (
                      <div key={i} className="col-6 col-sm-3 col-md-4">
                        <div className="store-catalog__card">
                          <div className="store-catalog__card_header">
                            <img
                              src="./assets/img/product/favourite-full.svg"
                              alt="favourite"
                              className="cabinet-favorite-heart"
                              id={el.id}
                              onClick={(e) => {
                                handleFavouriteRemove(e);
                              }}
                            />
                            <div className="store-catalog__card_image-wrap">
                              <Link href={{ pathname: '/product', query: { id: el.id } }}>
                                <img
                                  src={el.mainImage}
                                  className="store-catalog__card_image"
                                  alt="forbes"
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="store-catalog__card_body">
                            <h3 className="store-catalog__card_title">{el.name}</h3>
                            <a href={el.site} target="_blank" className="store-catalog__card_link">
                              {el.site}
                            </a>
                            <Link
                              className="product-card-link"
                              href={{ pathname: '/product', query: { id: el.id } }}>
                              <div className="store-catalog__card_info-item">
                                <p className="store-catalog__card_plain-text">
                                  {t('product.region')}
                                </p>
                                <p className="store-catalog__card_bold-text">
                                  <span>{el.region.name}</span>
                                  {/* <img
                                src="./assets/img/icons/flag-usa.png"
                                width="20px"
                                className="store-catalog__card_flag-country"
                                alt=""
                              /> */}
                                </p>
                              </div>
                              <div className="store-catalog__card_info-item">
                                <p className="store-catalog__card_plain-text">
                                  {t('product.engagment')}
                                </p>
                                <p className="store-catalog__card_bold-text">
                                  {nFormatter(el.engagement)}
                                </p>
                              </div>
                              <div className="store-catalog__card_info-item">
                                <p className="store-catalog__card_plain-text">
                                  {t('product.category')}
                                </p>
                                <p className="store-catalog__card_bold-text">{el.category.name}</p>
                              </div>
                            </Link>
                          </div>

                          <div className="store-catalog__card_footer">
                            <Link
                              className="btn store-catalog__card_btn-publication"
                              href={{ pathname: '/product', query: { id: el.id } }}>
                              <img
                                src="./assets/img/icons/approved-report.svg"
                                className="d-block"
                                alt=""
                              />
                              <div>
                                {t('product.price')}
                                <span className="store-home__card_btn-publication-price">
                                  ${el.price}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* 
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 wishlist-card">
                    <div className="store-wishlist__card">
                      <div className="store-wishlist__card_header">
                        <div className="store-wishlist__card_image-wrap">
                          <img
                            src="./assets/img/icons/forbes.svg"
                            className="store-wishlist__card_image"
                            alt="log"
                          />
                          <img
                            src="./assets/img/product/favourite.svg"
                            className="wishlist-favourite"
                            alt="favourite"
                          />
                        </div>
                      </div>
                      <div className="store-wishlist__card_body">
                        <h3 className="store-wishlist__card_title">Fobes</h3>
                        <a className="store-wishlist__card_link">foobes.com</a>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Region</p>
                          <p className="store-wishlist__card_bold-text">
                            <span>USA</span>
                            <img
                              src="./assets/img/icons/flag-usa.png"
                              width="20px"
                              className="store-wishlist__card_flag-country"
                              alt="flag"
                            />
                          </p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Engagement:</p>
                          <p className="store-wishlist__card_bold-text">253</p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Category:</p>
                          <p className="store-wishlist__card_bold-text">Business</p>
                        </div>
                      </div>

                      <div className="store-wishlist__card_footer">
                        <a className="btn store-wishlist__card_btn-publication">
                          <img
                            src="./assets/img/icons/approved-report-wishlist.svg"
                            alt="approved-report"
                          />
                          <div>
                            <p className="store-wishlist__card_btn-publication-p">
                              Publication from
                            </p>
                            <span className="store-wishlist__card_btn-publication-price">
                              $2566
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 wishlist-card">
                    <div className="store-wishlist__card">
                      <div className="store-wishlist__card_header">
                        <div className="store-wishlist__card_image-wrap">
                          <img
                            src="./assets/img/icons/forbes.svg"
                            className="store-wishlist__card_image"
                            alt="log"
                          />
                          <img
                            src="./assets/img/product/favourite.svg"
                            className="wishlist-favourite"
                            alt="favourite"
                          />
                        </div>
                      </div>
                      <div className="store-wishlist__card_body">
                        <h3 className="store-wishlist__card_title">Fobes</h3>
                        <a className="store-wishlist__card_link">foobes.com</a>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Region</p>
                          <p className="store-wishlist__card_bold-text">
                            <span>USA</span>
                            <img
                              src="./assets/img/icons/flag-usa.png"
                              width="20px"
                              className="store-wishlist__card_flag-country"
                              alt="flag"
                            />
                          </p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Engagement:</p>
                          <p className="store-wishlist__card_bold-text">253</p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Category:</p>
                          <p className="store-wishlist__card_bold-text">Business</p>
                        </div>
                      </div>

                      <div className="store-wishlist__card_footer">
                        <a className="btn store-wishlist__card_btn-publication">
                          <img
                            src="./assets/img/icons/approved-report-wishlist.svg"
                            alt="approved-report"
                          />
                          <div>
                            <p className="store-wishlist__card_btn-publication-p">
                              Publication from
                            </p>
                            <span className="store-wishlist__card_btn-publication-price">
                              $2566
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 wishlist-card">
                    <div className="store-wishlist__card">
                      <div className="store-wishlist__card_header">
                        <div className="store-wishlist__card_image-wrap">
                          <img
                            src="./assets/img/icons/forbes.svg"
                            className="store-wishlist__card_image"
                            alt="log"
                          />
                          <img
                            src="./assets/img/product/favourite.svg"
                            className="wishlist-favourite"
                            alt="favourite"
                          />
                        </div>
                      </div>
                      <div className="store-wishlist__card_body">
                        <h3 className="store-wishlist__card_title">Fobes</h3>
                        <a className="store-wishlist__card_link">foobes.com</a>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Region</p>
                          <p className="store-wishlist__card_bold-text">
                            <span>USA</span>
                            <img
                              src="./assets/img/icons/flag-usa.png"
                              width="20px"
                              className="store-wishlist__card_flag-country"
                              alt="flag"
                            />
                          </p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Engagement:</p>
                          <p className="store-wishlist__card_bold-text">253</p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Category:</p>
                          <p className="store-wishlist__card_bold-text">Business</p>
                        </div>
                      </div>

                      <div className="store-wishlist__card_footer">
                        <a className="btn store-wishlist__card_btn-publication">
                          <img
                            src="./assets/img/icons/approved-report-wishlist.svg"
                            alt="approved-report"
                          />
                          <div>
                            <p className="store-wishlist__card_btn-publication-p">
                              Publication from
                            </p>
                            <span className="store-wishlist__card_btn-publication-price">
                              $2566
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4 wishlist-card">
                    <div className="store-wishlist__card">
                      <div className="store-wishlist__card_header">
                        <div className="store-wishlist__card_image-wrap">
                          <img
                            src="./assets/img/icons/forbes.svg"
                            className="store-wishlist__card_image"
                            alt="log"
                          />
                          <img
                            src="./assets/img/product/favourite.svg"
                            className="wishlist-favourite"
                            alt="favourite"
                          />
                        </div>
                      </div>
                      <div className="store-wishlist__card_body">
                        <h3 className="store-wishlist__card_title">Fobes</h3>
                        <a className="store-wishlist__card_link">foobes.com</a>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Region</p>
                          <p className="store-wishlist__card_bold-text">
                            <span>USA</span>
                            <img
                              src="./assets/img/icons/flag-usa.png"
                              width="20px"
                              className="store-wishlist__card_flag-country"
                              alt="flag"
                            />
                          </p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Engagement:</p>
                          <p className="store-wishlist__card_bold-text">253</p>
                        </div>
                        <div className="store-wishlist__card_info-item">
                          <p className="store-wishlist__card_plain-text">Category:</p>
                          <p className="store-wishlist__card_bold-text">Business</p>
                        </div>
                      </div>

                      <div className="store-wishlist__card_footer">
                        <a className="btn store-wishlist__card_btn-publication">
                          <img
                            src="./assets/img/icons/approved-report-wishlist.svg"
                            alt="approved-report"
                          />
                          <div>
                            <p className="store-wishlist__card_btn-publication-p">
                              Publication from
                            </p>
                            <span className="store-wishlist__card_btn-publication-price">
                              $2566
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </TabPanel>
              </div>
            </Tabs>
          </div>
          <Helmet>
            <title>{t('pages_button_text')}</title>
          </Helmet>
        </main>
      ) : (
        <main className="main main-page-ai">
          <div className="container cabinet">
            <h1 className="cabinet-h1">Welcome User</h1>
            <Tabs>
              <TabList>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/user.svg" alt="industries" />
                    {t('profile-menu.profile')}
                  </button>
                </Tab>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/paper.svg" alt="industries" />
                    {t('profile-menu.orders')}
                  </button>
                </Tab>
                <Tab>
                  <button className="cabinet-tab-button">
                    <img src="./assets/img/cabinet/book.svg" alt="industries" />
                    {t('profile-menu.wishlist')}
                  </button>
                </Tab>
              </TabList>
              <div className="tab-container cabinet-unlogged">
                <div className="store-registration-container">
                  <p>
                    Для того чтобы войти в кабинет{' '}
                    <span
                      onClick={() => {
                        appCtx.updateStateLogin();
                      }}>
                      войдите
                    </span>
                    , или{' '}
                    <span
                      onClick={() => {
                        appCtx.updateStateRegister();
                      }}>
                      зарегистрируйтесь
                    </span>
                    .
                  </p>
                </div>
              </div>
            </Tabs>
          </div>
          <Helmet>
            <title>{t('pages_button_text')}</title>
          </Helmet>
        </main>
      )}
    </>
  );
}
