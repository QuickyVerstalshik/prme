import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import axios from 'axios';
import { useStores } from '../../hooks/useStore';
import { appContext } from '../../components/Layout';

export default function Succes() {
  const { t, i18n, ready } = useTranslation();

  const token = localStorage.getItem('token');

  let [array, setArray] = useState([]);
  const {
    userStore: { isLogged, setIsLogged },
  } = useStores();
  const appCtx = useContext(appContext);

  const [data, setData] = useState({
    articleType: 'none',
  });
  const handleSubmit = (e, el) => {
    e.preventDefault();
    setData({
      ...data,
    });
    e.preventDefault();
    const userData = {
      item: el.id,
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
        window.location.href = res.data.paymentLink;
      })
      .catch(function (error) {
        let obj = error?.response?.data;
        console.log(obj);
      });
  };
  useEffect(() => {
    axios
      .get(
        'https://api.pay2pitch.app/items/?city=&isPack=true&language=&engagement_min=&engagement_max=&category=&price_min=&price_max=&isMain=&sponsored=&doFollow=&indexed=&image=',
      )
      .then((res) => {
        setArray(res.data.results);
        console.log(res.data.results);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  }, []);

  return (
    <main className="main main-page-ai">
      <div className="first-screen membership">
        <div className="container">
          <div className="advantages__body">
            <div className="row gx-5 justify-content-center advantages__row">
              {array.map((el, i) => (
                <div key={i} className="col-12 col-sm-6 col-lg-4">
                  <div className="advantages__card membership">
                    <div className="advantages__card_image-wrap membership">
                      <img
                        src={
                          i + 1 == 1
                            ? './assets/img/membership/gold.svg'
                            : i + 1 == 2
                            ? './assets/img/membership/platinum.svg'
                            : i + 1 == 3
                            ? './assets/img/membership/premium.svg'
                            : ''
                        }
                        alt="image"
                        className="advantages__card_image membership"
                      />
                    </div>
                    <h5 className="advantages__card_title">{el.name}</h5>
                    <div className="advantages__card_desc-container membership">
                      <div className="advantages__card_desc-p-container membership">
                        <p className="advantages__card_desc">
                          {i + 1 == 1
                            ? `${t('membership1')}`
                            : i + 1 == 2
                            ? `${t('membership1_text_title')}`
                            : i + 1 == 3
                            ? `${t('membership1_text_subtitle')}`
                            : ''}
                        </p>
                      </div>
                      <p className="membership-p">
                        {i + 1 == 1
                          ? `15  ${t('membership1_text_content')}`
                          : i + 1 == 2
                          ? `10 ${t('membership1_text_content')}`
                          : i + 1 == 3
                          ? `5 ${t('membership1_text_content')}`
                          : ''}
                      </p>

                      {isLogged ? (
                        <button
                          className="btn btn-primary membership"
                          value={el.price}
                          onClick={(e) => {
                            handleSubmit(e, el);
                          }}>
                          <span>$ {el.price}</span>
                          <img src="./assets/img/icons/arrow-white-right.svg" alt="" />
                        </button>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
