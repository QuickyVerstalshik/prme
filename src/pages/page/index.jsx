import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { appContext } from '../../components/Layout';
import { useStores } from '../../hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import ContactUs from '../../components/contactus/index';

function Home(props) {
  const router = useRouter();
  const { t, i18n, ready } = useTranslation();
  const appCtx = useContext(appContext);

  let [array, setArray] = useState([]);
  let [instructionsProp, setInstructionsProp] = useState([]);
  let serverUrl = 'https://api.pay2pitch.app/';
  let instructionsText = t('main-video');

  const {
    userStore: { isLogged, setIsLogged },
  } = useStores();

  let sliderImagesGet = t('main-our.clients.featured.on_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let sliderImagesGetExamples = t('main-examples_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let sliderImagesGetGoogle = t('main-our.customers_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let sliderImagesGetLogos = t('main-media.logos_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let sliderImage1 = t('main-reviews.card1_image', {
    defaultValue: 'images/2023/06/22/KIISFM.png',
  });
  let sliderImage2 = t('main-reviews.card2_image', {
    defaultValue: 'images/2023/06/22/KIISFM.png',
  });
  let sliderImage3 = t('main-reviews.card3_image', {
    defaultValue: 'images/2023/06/22/KIISFM.png',
  });

  let reviewsVideo = t('main-reviews.video1_media', {
    defaultValue: 'https://www.youtube.com/embed/1cFh6gzxINM',
  });
  let reviewsVideo2 = t('main-reviews.video2_media', {
    defaultValue: 'https://www.youtube.com/embed/1cFh6gzxINM',
  });
  let reviewsVideo3 = t('main-reviews.video3_media', {
    defaultValue: 'https://www.youtube.com/embed/1cFh6gzxINM',
  });
  let reviewsVideo4 = t('main-reviews.video4_media', {
    defaultValue: 'https://www.youtube.com/embed/1cFh6gzxINM',
  });
  let reviewsVideo5 = t('main-reviews.video5_media', {
    defaultValue: 'https://www.youtube.com/embed/1cFh6gzxINM',
  });
  const handleClickScroll = () => {
    const element = document.getElementById('contact-us');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
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
  // region=&
  useEffect(() => {
    axios
      .get(
        'https://api.pay2pitch.app/items/?language=&price_min=&price_max=&isMain=true&sponsored=&doFollow=&indexed=&image=',
      )
      .then((res) => {
        setArray(res.data.results);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  }, []);
  // if (!ready) return 'loading translations...';
  const quoteSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 6000,
  };
  const differenceSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const differenceSettings2 = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
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
  const reviewsSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: false,
    centerMode: true,
    centerPadding: '30px',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 2561,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        centerPadding: '5px',
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <>
      <main className="main main-page-home">
        <div className="first-screen">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="first-screen__content-col-1">
                  <h1 className="first-screen__content-col-1_title">
                    {t('main-pr.and.more_text_title')}
                  </h1>
                  <p className="first-screen__content-col-1_subtitle">
                    {t('main-pr.and.more_text_subtitle')}
                  </p>
                  <Link className="btn btn-primary first-screen__content-col-1_btn" href="/store">
                    <span>{t('main-store_button_text')}</span>
                    <img src="./assets/img/icons/arrow-white-right.svg" alt="arrow" />
                  </Link>
                  <p className="first-screen__content-col-1_desc">{t('main-pr.and.more')}</p>
                </div>
              </div>
              <div className="col-12 col-md-6 position-relative">
                <div className="first-screen__content-col-2">
                  <div className="first-screen__content-col-2_content">
                    <img
                      src="./assets/img/home/first-screen/blob-laptop.png"
                      alt=""
                      className="first-screen__content-col-2_blob-laptop"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="partners">
          <div className="container">
            <h2 className="store-home__title partners">{t('main-our.clients.featured.on')}</h2>
            <Slider {...settings}>
              {sliderImagesGet.map((el, i) => (
                <div key={i} className="partners-slider__slide">
                  <a className="partners-slider__link">
                    <img
                      src={serverUrl + el}
                      alt="slider__logo"
                      className="partners-slider__logo"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="store-home">
          <img
            src="./assets/img/store/ellipse-left.png"
            alt=""
            className="store-home__ellipse store-home__ellipse-left"
          />
          <img
            src="./assets/img/store/ellipse-right.png"
            alt=""
            className="store-home__ellipse store-home__ellipse-right"
          />
          <div className="container">
            <div className="store-home__content">
              <h2 className="store-home__title">{t('main-store_text_title')}</h2>
              <p className="store-home__header_desc">{t('main-store')}</p>
              <div className="row store-home__row">
                {array.map((el, i) => (
                  <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 main-card">
                    <div className="store-home__card">
                      <div className="store-home__card_header">
                        <div className="store-home__card_image-wrap">
                          <img src={el.mainImage} className="store-home__card_image" alt="logo" />
                        </div>
                      </div>
                      <div className="store-home__card_body">
                        <h3 className="store-home__card_title">{el.name}</h3>
                        <a
                          className={
                            true ? 'store-home__card_link' : 'store-home__card_link disabled'
                          }
                          href={el.site}>
                          {el.site}
                        </a>
                        <div className="store-home__card_info-item">
                          <p className="store-home__card_plain-text">{t('product.region')}</p>
                          <p className="store-home__card_bold-text">
                            <span>{el.region.name}</span>
                            <img
                              src="./assets/img/icons/flag-usa.png"
                              width="20px"
                              className="store-home__card_flag-country"
                              alt="flag"
                            />
                          </p>
                        </div>
                        <div className="store-home__card_info-item">
                          <p className="store-home__card_plain-text">{t('product.engagment')}</p>
                          <p className="store-home__card_bold-text">
                            {nFormatter(el.engagement, 1)}
                          </p>
                        </div>
                      </div>

                      {true ? (
                        <div
                          className={
                            true ? 'store-home__card_footer logged' : 'store-home__card_footer'
                          }>
                          <Link
                            className={
                              true
                                ? 'btn store-home__card_btn-publication logged'
                                : 'btn store-home__card_btn-publication'
                            }
                            href={{ pathname: '/product', query: { id: el.id } }}>
                            {t('product.price')}
                            <span
                              className={
                                true
                                  ? 'store-home__card_btn-publication-price'
                                  : 'store-home__card_btn-publication-price blur'
                              }>
                              ${el.price}
                            </span>
                          </Link>
                          {true ? (
                            ''
                          ) : (
                            <div className="store-home__card_sing-up-wrap">
                              <a className="btn btn-primary store-home__card_sing-up">
                                {t('product.sign.up')}
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="store-home__card_footer">
                          <a
                            className="btn store-home__card_btn-publication"
                            onClick={() => {
                              appCtx.updateStateGoRegOrLog();
                            }}>
                            {t('product.price')}
                            <span className="store-home__card_btn-publication-price blur">
                              ${el.price}
                            </span>
                          </a>
                          <div className="store-home__card_sing-up-wrap">
                            <a
                              className="btn btn-primary store-home__card_sing-up"
                              onClick={() => {
                                appCtx.updateStateGoRegOrLog();
                              }}>
                              {t('product.sign.up')}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="store-home__go-store">
                <Link className="btn btn-primary" href="/store">
                  <span>{t('main-store_button_text')}</span>
                  <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <div className="container">
            <div className="instructions__header">
              <iframe
                src={t('main-video_media')}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${t(
                  'main-video_media',
                )}><img src=https://img.youtube.com/vi/${t('main-video_media')
                  .split('/')
                  .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
              <h2 className="instructions__header_title">{t('main-video_text_title')}</h2>
              <p className="instructions__header_desc">{t('main-video')}</p>
              <a
                className="btn btn-primary"
                onClick={() => {
                  handleClickScroll();
                }}>
                <span>{t('main-video_button_text')}</span>
                <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

        <div className="advantages">
          <img
            src="./assets/img/home/advantages/ellipse.png"
            className="advantages__ellipse advantages__ellipse-left"
            alt=""
          />
          <img
            src="./assets/img/home/advantages/ellipse.png"
            className="advantages__ellipse advantages__ellipse-right"
            alt=""
          />
          <div className="container">
            <div className="advantages__content">
              <div className="advantages__header">
                <h2 className="advantages__header_title">{t('Main-Bulding_text_title')}</h2>
                <p className="advantages__header_desc">{t('Main-Bulding')}</p>
              </div>
              <div className="advantages__body">
                <div className="row gx-5 justify-content-center advantages__row">
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="advantages__card">
                      <div className="advantages__card_image-wrap">
                        <img
                          src={serverUrl + 'uploads/' + t('main-building.card1_image')}
                          alt="image"
                          className="advantages__card_image"
                        />
                      </div>
                      <h5 className="advantages__card_title">
                        {t('main-building.card1_text_title')}
                      </h5>
                      <div className="advantages__card_desc-container">
                        <div className="advantages__card_desc-p-container">
                          <p className="advantages__card_desc">{t('main-building.card1')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="advantages__card">
                      <div className="advantages__card_image-wrap">
                        <img
                          src={serverUrl + 'uploads/' + t('main-building.card2_image')}
                          alt="image"
                          className="advantages__card_image"
                        />
                      </div>
                      <h5 className="advantages__card_title">
                        {t('main-building.card2_text_title')}
                      </h5>
                      <div className="advantages__card_desc-container">
                        <div className="advantages__card_desc-p-container">
                          <p className="advantages__card_desc">{t('main-building.card2')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="advantages__card">
                      <div className="advantages__card_image-wrap">
                        <img
                          src={serverUrl + 'uploads/' + t('main-building.card3_image')}
                          alt="image"
                          className="advantages__card_image"
                        />
                      </div>
                      <h5 className="advantages__card_title">
                        {t('main-building.card3_text_title')}
                      </h5>
                      <div className="advantages__card_desc-container">
                        <div className="advantages__card_desc-p-container">
                          <p className="advantages__card_desc">{t('main-building.card3')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="advantages__card">
                      <div className="advantages__card_image-wrap">
                        <img
                          src={serverUrl + 'uploads/' + t('main-building.card4_image')}
                          alt="image"
                          className="advantages__card_image"
                        />
                      </div>
                      <h5 className="advantages__card_title">
                        {t('main-building.card4_text_title')}
                      </h5>
                      <div className="advantages__card_desc-container">
                        <div className="advantages__card_desc-p-container">
                          <p className="advantages__card_desc">{t('main-building.card4')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-4">
                    <div className="advantages__card">
                      <div className="advantages__card_image-wrap">
                        <img
                          src={serverUrl + 'uploads/' + t('main-building.card5_image')}
                          alt="image"
                          className="advantages__card_image"
                        />
                      </div>
                      <h5 className="advantages__card_title">
                        {t('main-building.card5_text_title')}
                      </h5>
                      <div className="advantages__card_desc-container">
                        <div className="advantages__card_desc-p-container">
                          <p className="advantages__card_desc">{t('main-building.card5')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="advantages__btn-wrap">
                  {true ? (
                    <Link className="btn btn-primary first-screen__content-col-1_btn" href="/store">
                      <span>{t('main-store_button_text')}</span>
                      <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                    </Link>
                  ) : (
                    <a
                      className="btn btn-primary"
                      onClick={() => {
                        appCtx.updateStateRegister();
                      }}>
                      <span>{t('Main-Bulding_button_text')}</span>
                      <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quote">
          <div className="container">
            <div className="quote__content">
              <img
                src="./assets/img/icons/icon-quote.svg"
                className="quote-slider__icon-quote"
                alt=""
              />
              <Slider className="quote-slider" {...quoteSettings}>
                <div className="quote-slider__slide">
                  <div className="quote-slider__slide_content">
                    <p className="quote-slider__text">{t('main-quote')}</p>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>

        <div className="industries">
          <div className="container">
            <div className="industries__content">
              <h2 className="industries__title">{t('main-examples_text_title')}</h2>
              <Slider className="industries-slider slider-arrow-blue" {...industriesSettings}>
                {sliderImagesGetExamples.map((el, i) => (
                  <div key={i} className="industries-slider__slide">
                    <div className="industries__card">
                      <div className="industries__card_image-wrap">
                        <img src={serverUrl + el} alt="" className="industries__card_image" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
              <div className="industries__btn-wrap">
                {true ? (
                  <Link className="btn btn-primary first-screen__content-col-1_btn" href="/store">
                    <span>{t('main-store_button_text')}</span>
                    <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                  </Link>
                ) : (
                  <a
                    className="btn btn-primary first-screen__content-col-1_btn"
                    onClick={() => {
                      appCtx.updateStateLogin();
                    }}>
                    <span>{t('main-examples_button_text')}</span>
                    <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="reviews">
          <div className="reviews__title">
            <img src="./assets/img/icons/icon-quote.svg" alt="" className="reviews__title_icon" />
            <h2 className="reviews__title_text">{t('main-reviews_text_title')}</h2>
          </div>
          <Slider className="reviews-slider" {...reviewsSettings}>
            <div className="reviews-slider__slide">
              <div className="reviews-slider__card">
                <div className="reviews-slider__card_row">
                  <iframe
                    className="reviewVideo"
                    src={reviewsVideo}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${reviewsVideo}><img src=https://img.youtube.com/vi/${reviewsVideo
                      .split('/')
                      .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
                </div>
              </div>
            </div>
            <div className="reviews-slider__slide">
              <div className="reviews-slider__card">
                <div className="reviews-slider__card_row">
                  <iframe
                    className="reviewVideo"
                    src={reviewsVideo2}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${reviewsVideo2}><img src=https://img.youtube.com/vi/${reviewsVideo2
                      .split('/')
                      .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
                </div>
              </div>
            </div>
            <div className="reviews-slider__slide">
              <div className="reviews-slider__card">
                <div className="reviews-slider__card_row">
                  <iframe
                    className="reviewVideo"
                    src={reviewsVideo3}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${reviewsVideo3}><img src=https://img.youtube.com/vi/${reviewsVideo3
                      .split('/')
                      .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
                </div>
              </div>
            </div>
            <div className="reviews-slider__slide">
              <div className="reviews-slider__card">
                <div className="reviews-slider__card_row">
                  <iframe
                    className="reviewVideo"
                    src={reviewsVideo4}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${reviewsVideo4}><img src=https://img.youtube.com/vi/${reviewsVideo4
                      .split('/')
                      .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
                </div>
              </div>
            </div>
            <div className="reviews-slider__slide">
              <div className="reviews-slider__card">
                <div className="reviews-slider__card_row">
                  <iframe
                    className="reviewVideo"
                    src={reviewsVideo5}
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${reviewsVideo5}><img src=https://img.youtube.com/vi/${reviewsVideo5
                      .split('/')
                      .pop()}/hqdefault.jpg alt='Video The Dark Knight Rises: What Went Wrong? – Wisecrack Edition'><span>▶</span></a>`}></iframe>
                </div>
              </div>
            </div>
          </Slider>
        </div>

        <div className="difference">
          <div className="container">
            <div className="difference__header">
              <h3 className="difference__header_title">{t('main-our.customers_text_title')}</h3>
              <p className="difference__header_desc">{t('main-our.customers')}</p>
            </div>
            <div className="difference__body">
              <Slider className="difference-slider slider-arrow-blue" {...differenceSettings}>
                {sliderImagesGetGoogle.map((el, i) => (
                  <div key={i} className="difference-slider__slide">
                    <div className="difference-slider__slide_content">
                      <img src={serverUrl + el} alt="" className="difference-slider__slide_image" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="difference">
          <div className="container">
            <div className="difference__header">
              <h3 className="difference__header_title">{t('main-media.logos_text_title')}</h3>
              <p className="difference__header_desc">{t('main-media.logos')}</p>
            </div>
            <div className="difference__body">
              <Slider className="difference-slider slider-arrow-blue" {...differenceSettings2}>
                {sliderImagesGetLogos.map((el, i) => (
                  <div key={i} className="difference-slider__slide">
                    <div className="difference-slider__slide_content">
                      <img
                        src={serverUrl + el}
                        alt=""
                        className="difference-slider__slide_image2"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="contact-us" id="contact-us">
          <ContactUs />
        </div>
      </main>
      <Helmet>
        <title>{t('pages')}</title>
      </Helmet>
    </>
  );
}

export default observer(Home);
