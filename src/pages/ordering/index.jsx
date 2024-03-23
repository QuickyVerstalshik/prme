import React, { useEffect, useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import NiceSelect from '../../components/NiceSelect/NiceSelect';
import { Tooltip } from 'react-tooltip';
import Slider from 'react-slick';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useStores } from '../../hooks/useStore';
import { appContext } from '../../components/Layout';

export default function Ordering() {
  const { t, i18n, ready } = useTranslation();
  const router = useRouter();
  const [menu1, setMenu1] = useState(false);
  const [resultExample, setResultExample] = useState([{ image: '' }, { image: '' }]);
  const show1 = menu1 ? 'show' : '';
  const token = localStorage.getItem('token');
  const [documentPR, setDocumentPR] = useState(false);

  const [data, setData] = useState({
    articleType: 'none',
    item: router.query.id,
    needWriting: null,
    description: '',
  });
  const appCtx = useContext(appContext);
  const [error, setError] = useState(false);

  const toggleMenu1 = () => {
    setMenu1(!menu1);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });

    if (e.target.name == 'needWriting' && JSON.parse(value) === false) {
      setDocumentPR(false);
    }
    if (e.target.name == 'needWriting' && JSON.parse(value) === true) {
      setDocumentPR(true);
    }
  };

  const handleSubmit = (e) => {
    setData({
      ...data,
    });
    console.log(router.query.id);
    e.preventDefault();
    const userData = {
      articleType: data.articleType,
      item: data.item,
      needWriting: router.query.type == 'pragency' ? true : false,
      description: data.description,
    };
    console.log(userData);
    axios
      .post('https://api.pay2pitch.app/orders/', userData, {
        headers: {
          Authorization: `token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setError(false);
        window.location.href = res.data.paymentLink;
      })
      .catch(function (error) {
        let obj = error?.response?.data;
        setError(false);
        for (let key in obj) {
          setError(obj[key]);
        }
      });
  };

  const industriesSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
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
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();
  useEffect(() => {
    const currentID = router.query.id;
    axios
      .get(`https://api.pay2pitch.app/items/${currentID}`)
      .then((res) => {
        setResultExample(res.data.resultExample);
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  }, []);

  return (
    <>
      <main className="main main-page-ai ordering-page">
        <div className="container cabinet">
          <h1 className="cabinet-h1">{t('pages1_text_title')}</h1>
          <div className="order-container">
            <h1 className="order-h1">{router.query.name}</h1>
            <div className="info-order-container">
              <div className="ordering-info-container">
                <div className="info-ordering">
                  <p>{t('ordering.articletype')}</p>
                  <NiceSelect
                    id="order-select1"
                    placeholder={t('ordering_media')}
                    name="articleType"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="ordering-select">
                    <option selected value="I">
                      {t('ordering_text_title')}
                    </option>
                    <option value="A">{t('ordering_text_subtitle')}</option>
                  </NiceSelect>
                </div>

                <div className="info-ordering">
                  <p>{t('ordering.writing')}</p>
                  {router.query.type == 'myself' ? (
                    <p className="ordering-type-p">{t('order.writing_text_subtitle')}</p>
                  ) : (
                    <p className="ordering-type-p">{t('order.writing_text_title')}</p>
                  )}
                </div>
              </div>
            </div>
            <p class="text-center mb-0">
              <input
                type="file"
                name="additionalImages"
                onChange={(e) => {
                  handleChangeFiles(e);
                }}
                accept="image/*"
                id="attachment"
                className="input-ordering"
                multiple
              />
            </p>
            <p id="files-area">
              <span id="filesList">
                <span id="files-names"></span>
              </span>
            </p>
            {error !== false ? <p className="error-p ordering">{t('errors_text_title')}</p> : ''}
            <div className="accordion-item order">
              <h2 className="accordion-header" id="flush-heading-1">
                <button
                  className={`accordion-button order-select-button  ${menu1 ? '' : 'collapsed'} `}
                  type="button"
                  data-bs-toggle="collapse"
                  onClick={() => toggleMenu1()}
                  aria-expanded="false"
                  aria-controls="flush-collapse-1">
                  {t('ordering_text_content')}
                </button>
              </h2>
              <div
                id="flush-collapse-1"
                className={'accordion-collapse collapse' + show1}
                aria-labelledby="flush-heading-1"
                data-bs-parent="#accordionFaq">
                <div className="accordion-body order">
                  <Slider className="industries-slider slider-arrow-blue" {...industriesSettings}>
                    {resultExample.map((el, i) => (
                      <div key={i} className="industries-slider__slide">
                        <div className="industries__card">
                          <div className="industries__card_image-wrap">
                            <img
                              src={el.image}
                              alt="industries"
                              className="industries__card_image"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <h1 className="order-h1 price">$ {router.query.price}</h1>
              {isLogged ? (
                <div className="ordering-button-container">
                  <a
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="btn btn-primary order">
                    <span>{t('ordering.button')}</span>
                  </a>
                  <p>{t('ordering_button_text')}</p>
                </div>
              ) : (
                <div className="ordering-button-container">
                  <a
                    onClick={() => {
                      appCtx.updateStateRegister();
                    }}
                    className="btn btn-primary order">
                    <span>{t('ordering.button')}</span>
                  </a>
                  <p>{t('ordering_button_text')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
