'use client';
import React, { Component, useState } from 'react';
import { useTranslation } from 'next-i18next';
import ContactUs from '../../components/contactus';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import Link from 'next/link';

export default function Pragency() {
  const { t, i18n, ready } = useTranslation();
  let sliderImagesGet = t('main-our.clients.featured.on_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let sliderImagesGetExamples = t('main-examples_images', {
    returnObjects: true,
    defaultValue: [],
  });
  let serverUrl = 'https://api.pay2pitch.app/';
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
    <main className="main main-page-ai">
      <div className="ai-first-screen">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <h1 className="ai-first-screen__title">PR Agency</h1>
              <p className="ai-first-screen__desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="col-12 col-md-6">
              <div className="ai-first-screen__img-wrap">
                <img
                  src="./assets/img/pragency/first-screen.svg"
                  alt=""
                  className="ai-first-screen__img"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="partners">
          <div className="container">
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
        <div className="container">
          <div className="advantages__content">
            <div className="advantages__header">
              <h2 className="advantages__header_title">
                PR in the media for business companies and personal brand is very important these
                days, it helps:
              </h2>
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
                        src="https://s3-alpha-sig.figma.com/img/8e1e/a732/b31c3ef06920540ae7c4a17f24eab78c?Expires=1699228800&Signature=ftel14MOYbmBItte6u8-GNK3CUnOt3NVB93Ad3lcIDaEi1I5jLavh4Czle6peVoqGhjBMH5Y6I2XG577FcO~5w39TKDVm5t2eoRYGHVQ15HrPRq6YKFsISL9tRr4-UhOkLX~Z0n1PC3S7ieYAgTq7Aieq-RnfeLUstBaFw7cmSVRn8ofcKCEOqdRv~aOgi1HzdCB0-phy8MfzkDQQbzQtFQ-AlOiUzEqWU5lVA3CuFiGxOgdX8BrLZkBCv2kokzGVUq~zsJ6Z2zB6IEVDpcaQe5KrHxwAM1RCMqsoVMQsv7uI~PB2Vxc8gSIWKExCd8M-0WKXTa8j-pAlZHoZkAW2A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="image"
                        className="advantages__card_image"
                      />
                    </div>
                    <h5 className="advantages__card_title">Increase ranking in GOOGLE</h5>
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
                        src="https://s3-alpha-sig.figma.com/img/6150/c0f4/af9ef8917db06713f0a0d2229998bbf5?Expires=1699228800&Signature=FUpWJFz8jykNp50oj0aBlXBWLFdFZ0aut0R4jYEJR2Cuk-qCq2WG24e2QCnEpqkVTUYK-vW0AwW8oqpBNIIIXowX4J6SQg1vPw8ZLDkZytgjwsBEZ8kIvNSXCp~EJwMVt6n699wVIVIJaLAIdTaZGzRD~W862rqeeBYNMTYmSnWLpZhVnTQY6h30Bz2PmzFWNEOXRR~mgeTCFRBChqARszXk5U4uLckCfHSyLZZLGyqMtxV6neTnnpqMgkg4fJMaPRemORz9a-L1PF0Er-JWh--NliXqh0UiCfWtYe6lulKtZsXys-Rqya-jRIPKY3VbPL3r86bVEqn9CFuC58pREw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="image"
                        className="advantages__card_image"
                      />
                    </div>
                    <h5 className="advantages__card_title">Prove expertise and talents</h5>
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
                        src="https://s3-alpha-sig.figma.com/img/4806/f956/976296cd8c0ddd2cb6bbc9adeeb77505?Expires=1699228800&Signature=JYVaTrWbj8lGLXrey7G-MSkpzuh5UQd~t3TanipbileeN80GjXn1BHrOOajAfMG7x5FrZqEAxfNdR3lrHZXrS~au8z-7yxH8gYLMb5jUxLP0UnYCz62fxPYrdm~avtElvg2~L1EyWNDyhZsYvou36CiWGJyKtkC~vqHYe4p95Sr3XFSnjyZSDJo5d8ZQlAI12kudtJzuzqQ030M2aOkStsftTONlM0XrQvSInodOrBXZtKwq2EvEu3rOg8IDhXhGMDxkJCh9t9YubMsXOc0FA2De9LMgSRtDQ-sD54TQVXXgmhgGu2uAWWhDSjcbhM~cjVnYI97CFJOhPgV8h6jNtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="image"
                        className="advantages__card_image"
                      />
                    </div>
                    <h5 className="advantages__card_title">Trust from people</h5>
                    <div className="advantages__card_desc-container">
                      <div className="advantages__card_desc-p-container">
                        <p className="advantages__card_desc">{t('main-building.card5')}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-lg-4">
                  <div className="advantages__card">
                    <div className="advantages__card_image-wrap">
                      <img
                        src="https://s3-alpha-sig.figma.com/img/452d/6c73/bf5751d064569abb716719b95d1e53c4?Expires=1699228800&Signature=oof0ZaKxpazWJ2jaMeydQylQkP8L5g8u8Gi5n5n8-l5UGP2Yi5JjJmUSvimTaRWpO6YGrqY-NBCYZ7-X4RUQF6hQ7HjjdwDTJG5SrXRII2m6je4zL6O~YzGkhcM9sGoOYnvMEgDeKBdIUoGkFxKeKuwdwbK5aU4YjXvPY64Bk1fK-0XSmEmWUaeVuqZVTsP-h~6BUPK6SbNnTYuwovKm6dnwcECRZ-o-KG1PSBD-7VUF2HZOs4BWTfKb3wQCy0F5mr8PhbIEtrK3rIrTI1jlc3q2qlaQgd5GU2c~CVDT9Fj~HyHAdzG3Dxqbe0A7GhfxmH3jSOTJJpGJ4Mnr7GF7pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                        alt="image"
                        className="advantages__card_image"
                      />
                    </div>
                    <h5 className="advantages__card_title">
                      Raise awareness and, as a result, increase sales
                    </h5>
                    <div className="advantages__card_desc-container">
                      <div className="advantages__card_desc-p-container">
                        <p className="advantages__card_desc">{t('main-building.card5')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    <span>See all examples</span>
                    <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                  </Link>
                ) : (
                  <a
                    className="btn btn-primary first-screen__content-col-1_btn"
                    onClick={() => {
                      appCtx.updateStateLogin();
                    }}>
                    <span>See all examples</span>
                    <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                  </a>
                )}
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
