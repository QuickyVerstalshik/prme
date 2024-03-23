'use client';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Slider from 'react-slick';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Product({ id }) {
  const { t, i18n, ready } = useTranslation();
  const router = useRouter();
  const currentID = router.query.id;
  let [favourited, setFavourited] = useState(false);
  let [element, setElement] = useState({
    name: '',
    region: { name: '' },
    categories: [{ name: '' }],
    resultExample: [{ image: '' }],
  });
  const industriesSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const token = localStorage.getItem('token');
  const handleFavouriteRemove = () => {
    const user = {
      id: parseInt(currentID),
    };
    console.log(user);
    axios
      .delete(`https://api.pay2pitch.app/favorites/${currentID}/remove`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setFavourited(false);
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
  const handleFavouriteSubmit = () => {
    const user = {
      ...element,
    };
    console.log(user);
    axios
      .put(
        'https://api.pay2pitch.app/favorites/add/',
        {
          ...user,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        setFavourited(true);
      })
      .catch(function (error) {
        let obj = error?.response?.data;
        setFavourited(false);
        for (let key in obj) {
          console.log(key, obj);
        }
      });
  };
  useEffect(() => {
    axios
      .get(`https://api.pay2pitch.app/favorites/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.results);
        res.data.results.map((res) => {
          if (res.id == parseInt(currentID)) {
            setFavourited(true);
          }
        });
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });

    axios
      .get(`https://api.pay2pitch.app/items/${currentID}`)
      .then((res) => {
        setElement(res.data);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  }, []);
  return (
    <>
      <main className="main main-page-ai">
        <div className="product-first-screen">
          <div className="container">
            <div
              className="back-to-store"
              onClick={() => {
                window.history.back();
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="17"
                viewBox="0 0 9 17"
                fill="none">
                <path
                  d="M8 16L2 8.5L8 1"
                  stroke="#8B8B8B"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <p>Back to store</p>
            </div>
            <div className="product-info-container">
              <div className="name-mobile">
                <div className="name-container">
                  <h1 className="product-first-screen__title">{element.name} </h1>
                  <a className="name-link mobile" href={element.site} target="_blank">
                    {element.site}
                  </a>
                </div>
                <p className="product-first-screen__desc">
                  {element.comment
                    ? element.comment
                    : 'Your PR platform connect you with the world'}
                </p>
              </div>

              <div className="product-image-container">
                <img
                  src={
                    element.mainImage == null ? './assets/img/store/default.png' : element.mainImage
                  }
                  alt="product"
                />
              </div>
              <div className="product-info">
                <div className="name-container pc">
                  <h1 className="product-first-screen__title">
                    {element.name}
                    {favourited ? (
                      <img
                        src="./assets/img/product/favourite-full.svg"
                        alt="favourite"
                        onClick={() => {
                          handleFavouriteRemove();
                        }}
                      />
                    ) : (
                      <img
                        src="./assets/img/product/favourite.svg"
                        alt="favourite"
                        onClick={() => {
                          handleFavouriteSubmit();
                        }}
                      />
                    )}
                  </h1>
                  <a className="name-link mobile" href={element.site} target="_blank">
                    {element.site}
                  </a>
                </div>

                <p className="product-first-screen__desc pc">
                  {element.comment
                    ? element.comment
                    : 'Your PR platform connect you with the world'}
                </p>
                <a className="name-link pc" href={element.site} target="_blank">
                  {element.site}
                </a>
                <div className="main-info-container">
                  <div className="main-container-first">
                    <div className="info">
                      <p>{t('product.region')}</p>
                      <span>{element.region.name}</span>
                    </div>
                    <div className="info">
                      <p>{t('product.engagment')}</p>
                      <span>{nFormatter(element.engagement, 1)}</span>
                    </div>
                    <div className="info">
                      <p>{t('product.category')}:</p>
                      <div className="info-genres">
                        <span>
                          {element.categories.length <= 2 ? (
                            element.categories.map((x, j) => {
                              return <b key={j}>{x.name} </b>;
                            })
                          ) : (
                            <b>{`${element.categories.length} genres`}</b>
                          )}
                        </span>
                        {element.categories.length >= 2 ? (
                          <div className="question-product" id="item">
                            <img src="./assets/img/product/question-icon.svg" alt="question" />
                          </div>
                        ) : (
                          ''
                        )}
                        <Tooltip anchorSelect={`#item`} place="top">
                          {element.categories.length >= 2
                            ? element.categories.map((x, j) => {
                                return (
                                  <>
                                    {x.name} <br />
                                  </>
                                );
                              })
                            : ''}
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="product-line"></div>
                  <div className="main-container-second">
                    <div className="info">
                      <div className="info-container">
                        <div className="question-product" id="question1">
                          <img src="./assets/img/product/question-icon.svg" alt="question" />
                        </div>
                        <p
                          onClick={() => {
                            console.log(element);
                          }}>
                          {t('product.sponsored')}
                        </p>
                        <Tooltip anchorSelect="#question1" place="top">
                          {t('product.sponsored-quest')}
                        </Tooltip>
                      </div>

                      <span>
                        {element.sponsored == 'N' ? t('yes.no_text_title') : ''}
                        {element.sponsored == 'Y' ? t('yes.no') : ''}{' '}
                        {element.sponsored == 'D' ? 'Discrete' : ''}
                      </span>
                    </div>
                    <div className="info">
                      <div className="info-container">
                        <div className="question-product" id="question2">
                          <img src="./assets/img/product/question-icon.svg" alt="question" />
                        </div>
                        <p>{t('product.indexed')}</p>
                        <Tooltip anchorSelect="#question2" place="top">
                          {t('product.indexed-quest')}
                        </Tooltip>
                      </div>

                      <span>{element.indexed == 'N' ? t('yes.no_text_title') : t('yes.no')}</span>
                    </div>
                    <div className="info">
                      <div className="info-container">
                        <div className="question-product" id="question3">
                          <img src="./assets/img/product/question-icon.svg" alt="question" />
                        </div>
                        <p>{t('product.image')}</p>
                        <Tooltip anchorSelect="#question3" place="top">
                          {t('product.image-quest')}
                        </Tooltip>
                      </div>
                      <span>{element.image == 'N' ? t('yes.no_text_title') : t('yes.no')}</span>
                    </div>
                  </div>
                  <div className="product-line second"></div>
                  <div className="main-container-third">
                    <div className="info">
                      <div className="info-container">
                        <div className="question-product" id="question4">
                          <img src="./assets/img/product/question-icon.svg" alt="question" />
                        </div>
                        <p>{t('product.follow')}</p>
                        <Tooltip anchorSelect="#question4" place="top">
                          {t('product.follow-quest')}
                        </Tooltip>
                      </div>
                      <span>{element.doFollow == 'N' ? t('yes.no_text_title') : t('yes.no')}</span>
                    </div>
                  </div>
                </div>
                <Tabs className="product-tabs">
                  <p className="product-tabs-p">
                    {t('writing.product')}
                    <div className="question-product" id="question5">
                      <img src="./assets/img/product/question-icon.svg" alt="question" />
                    </div>
                  </p>
                  <Tooltip anchorSelect="#question5" place="top">
                    {t('writing.product_text_title')}
                  </Tooltip>
                  <TabList className="product-tablist">
                    <Tab>
                      <button className="product-tab-button">
                        {t('order.writing_text_title')} = $ {element.priceWriting}
                      </button>
                    </Tab>
                    <Tab>
                      <button className="product-tab-button">
                        {t('order.writing_text_subtitle')} = $ {element.price}
                      </button>
                    </Tab>
                  </TabList>
                  <TabPanel>
                    <div className="button-container">
                      <p>$ {element.priceWriting}</p>
                      <Link
                        href={{
                          pathname: '/ordering',
                          query: {
                            id: element.id,
                            name: element.name,
                            price: element.priceWriting,
                            type: 'pragency',
                          },
                        }}>
                        <button>{t('product.button')}</button>
                      </Link>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="button-container">
                      <p>$ {element.price}</p>
                      <Link
                        href={{
                          pathname: '/ordering',
                          query: {
                            id: element.id,
                            name: element.name,
                            price: element.price,
                            type: 'myself',
                          },
                        }}>
                        <button>{t('product.button')}</button>
                      </Link>
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="container product-text-container">
          <div className="product-text">
            <h1>{element.about ? 'About' : ''}</h1>
            <p>{element.about}</p>
          </div>
          <div className="product-text">
            <h1>{t('product.specconditions_text_title')}</h1>
            <p>{t('product.specconditions_text_content')}</p>
          </div>
        </div>
        <div className="container">
          <div className="industries__content">
            <Slider className="industries-slider slider-arrow-blue" {...industriesSettings}>
              {element.resultExample.map((el, i) => (
                <div key={i} className="industries-slider__slide">
                  <div className="industries__card">
                    <div className="industries__card_image-wrap">
                      <img src={el.image} alt="industries" className="industries__card_image" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </main>
    </>
  );
}
