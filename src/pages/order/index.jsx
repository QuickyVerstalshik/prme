'use client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/router';
import $ from 'jquery';
import { useStores } from '../../hooks/useStore';
import axios from 'axios';

export default function Order() {
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();
  const router = useRouter();
  const token = localStorage.getItem('token');
  const { t, i18n, ready } = useTranslation();
  const [succesPut, setSuccesPut] = useState(false);
  const [filesButton, setFilesButton] = useState(false);
  let uuid = '';

  const [data, setData] = useState({
    item: router.query.id,
    additionalFiles: [],
    additionalImages: [],
    description: '',
    status: { name: '' },
  });

  const [dialog, setDialog] = useState([]);

  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://api.pay2pitch.app/api/chat/`,
        { uuid: data.chatId, message: message },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      )
      .then((res) => {
        axios
          .post(
            `https://api.pay2pitch.app/api/chat/`,
            { uuid: data.chatId },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            },
          )
          .then((res) => {
            setDialog(res.data.data);
          })
          .catch(function (error) {
            console.log(error?.response?.data);
          });
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    setMessage('');
  };
  const handleChangeSendMessage = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setMessage(value);
  };

  const handleChangeFiles = (e) => {
    const value = e.target.files;
    setData({
      ...data,
      [e.target.name]: value,
    });
    if (e.target.name == 'additionalFiles') {
      setFilesButton(true);
    }
  };

  const handleSubmit = (e) => {
    setData({
      ...data,
      additionalFiles: [...data.additionalFiles, ...data.additionalImages],
    });
    e.preventDefault();

    let formdataFiles = [...data.additionalFiles, ...data.additionalImages];
    var formdata = new FormData();
    for (let i in formdataFiles) {
      formdata.append('additionalFiles', formdataFiles[i]);
    }
    const userData = {
      additionalFiles: formdata,
      item: data.item,
    };
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${token}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`https://api.pay2pitch.app/orders/${router.query.id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => setSuccesPut(true))
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    axios
      .get(`https://api.pay2pitch.app/orders/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        res.data.results.map((res) => {
          if (res.id == router.query.id) {
            uuid = res.chatId;
            setData({ ...res });

            axios
              .post(
                `https://api.pay2pitch.app/api/chat/`,
                { uuid: res.chatId },
                {
                  headers: {
                    Authorization: `Token ${token}`,
                  },
                },
              )
              .then((res) => {
                setDialog(res.data.data);
              })
              .catch(function (error) {
                console.log(error?.response?.data);
              });
          }
        });
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    (function (document, window, index) {
      var inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
          labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
          var fileName = '';
          if (this.files && this.files.length > 1)
            fileName = (this.getAttribute('data-multiple-caption') || '').replace(
              '{count}',
              this.files.length,
            );
          else fileName = e.target.value.split('\\').pop();

          if (fileName) label.querySelector('span').innerHTML = fileName;
          else label.innerHTML = labelVal;
        });

        // Firefox bug fix
        input.addEventListener('focus', function () {
          input.classList.add('has-focus');
        });
        input.addEventListener('blur', function () {
          input.classList.remove('has-focus');
        });
      });
    })(document, window, 0);
    const dt = new DataTransfer();
    $('#attachment').on('change', function (e) {
      for (var i = 0; i < this.files.length; i++) {
        let fileBloc = $('<span/>', { class: 'file-block' }),
          fileName = $('<span/>', { class: 'name', text: this.files.item(i).name });
        fileBloc.append('<span class="file-delete"><span>+</span></span>').append(fileName);
        $('#filesList > #files-names').append(fileBloc);
      }
      for (let file of this.files) {
        dt.items.add(file);
      }
      this.files = dt.files;

      $('span.file-delete').click(function () {
        let name = $(this).next('span.name').text();
        $(this).parent().remove();
        for (let i = 0; i < dt.items.length; i++) {
          if (name === dt.items[i].getAsFile().name) {
            dt.items.remove(i);
            continue;
          }
        }
        document.getElementById('attachment').files = dt.files;
      });
    });
    setTimeout(
      setInterval(() => {
        axios
          .post(
            `https://api.pay2pitch.app/api/chat/`,
            { uuid: uuid },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            },
          )
          .then((res) => {
            setDialog(res.data.data);
          })
          .catch(function (error) {
            console.log(error?.response?.data);
          });
      }, 10000),
      5000,
    );
  }, []);

  return (
    <>
      <main className="main main-page-ai order-page">
        <div className="container cabinet">
          <h1 className="cabinet-h1">
            {t('order.title_text_subtitle')}
            {data.id}
          </h1>
          <div className="order-container">
            <h1 className="order-h1">{data.name}</h1>
            <p className="order-p">{data.status ? data.status.name : ''}</p>
            <div className="info-order-container">
              <div className="order-container-first">
                <div className="info-order">
                  <p>{t('order.arttype')}</p>
                  <span>
                    {data.articleType == 'A'
                      ? t('ordering_text_subtitle')
                      : t('ordering_text_title')}
                  </span>
                </div>
                <div className="info-order">
                  <p>{t('order.price')}</p>
                  <span>${data.price}</span>
                </div>
                <div className="info-order">
                  <p>{t('order.paid')}:</p>
                  <span>{data.isPaid ? t('yes.no_text_subtitle') : t('yes.no_text_title')}</span>
                </div>
                <div className="info-order">
                  <div className="info-order-container">
                    <p>{t('order.subdate')}</p>
                  </div>
                  <span>{data.sendingDate}</span>
                </div>
              </div>
              <div className="order-line"></div>
              <div className="order-container-second">
                <div className="info-order">
                  <div className="info-order-container">
                    <p>{t('order.writing')}</p>
                  </div>

                  <span>
                    {data.needWriting
                      ? t('order.writing_text_title')
                      : t('order.writing_text_subtitle')}
                  </span>
                </div>
                <div className="info-order">
                  <div className="info-order-container">
                    <p>{t('order.subdate_text_title')}</p>
                  </div>
                  <span>{data.paymentDate}</span>
                </div>
                <div className="info-ordering">
                  <p>{t('ordering.addfile')}:</p>
                  <div class="box">
                    <input
                      type="file"
                      name="additionalFiles"
                      id="file-4"
                      onChange={(e) => {
                        handleChangeFiles(e);
                      }}
                      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      class="inputfile inputfile-3"
                      data-multiple-caption="{count} files selected"
                      multiple
                    />
                    <label for="file-4">
                      <span>{t('ordering.addfile_text_title')}</span>
                    </label>
                  </div>
                </div>

                <div className="info-ordering photos">
                  <p>{t('ordering.addphotos')}:</p>
                  <label for="attachment">
                    <span role="button" aria-disabled="false">
                      {t('ordering.addphotos_text_title')}
                    </span>
                  </label>
                  <p id="files-area">
                    <span id="filesList">
                      <span id="files-names"></span>
                    </span>
                  </p>
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
            </div>
            {filesButton ? (
              <a
                className="ordering-check btn btn-primary order"
                onClick={(e) => {
                  handleSubmit(e);
                }}>
                {t('order.title_text_title')}
              </a>
            ) : (
              ''
            )}

            {succesPut !== false ? <p className="error-cabinet succes order">Succes</p> : ''}
          </div>
          <div className="order-chat-container">
            <div class="chat">
              <div class="chat__wrapper">
                {dialog.map((el, i) => (
                  <div
                    key={i}
                    class={
                      el.name == username ? 'chat__message chat__message-own' : 'chat__message'
                    }>
                    <div class="date"></div>
                    <div>{el.message}</div>
                  </div>
                ))}
                {/* <div class="chat__message">
                  <div class="date"></div>
                  <div>Message #1</div>
                </div>
                <div class="chat__message chat__message-own">
                  <div class="date"></div>
                  <div>Message #2</div>
                </div> */}
              </div>
            </div>
            <div class="chat__form">
              <form id="chat__form">
                <input
                  id="text-message"
                  type="text"
                  value={message}
                  onChange={(e) => {
                    handleChangeSendMessage(e);
                  }}
                  placeholder={t('chat')}
                />
                <button
                  onClick={(e) => {
                    handleSendMessage(e);
                  }}>
                  {t('chat_text_title')}
                  <img src="/assets/img/order/send-button-icon.svg" alt="send" />
                </button>
              </form>
              <p>{t('chat_text_subtitle')}</p>
            </div>
            <div id="result"></div>
          </div>
        </div>
      </main>
    </>
  );
}
