import React from 'react';
import { useTranslation } from 'next-i18next';
import ContactUs from '../../components/contactus/index';

export default function Contacts() {
  const { t, i18n, ready } = useTranslation();
  const iframe =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3302.1534714827035!2d-118.40703712447065!3d34.142415512963865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s104A%2012444%20Ventura%20Blvd%2C%20Studio%20City%2C%20CA%2C%2091604%2C%20United%20States!5e0!3m2!1sen!2skz!4v1688990068648!5m2!1sen!2skz" style="border:0; border-radius: 22px; box-shadow: 0px 100px 80px 0px rgba(0, 0, 0, 0.10); width:100%; height:370px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
  function Iframe(props) {
    return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
  }
  return (
    <main className="main main-page-ai">
      <div className="first-screen">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="first-screen__content-col-1">
                <h1 className="first-screen__content-col-1_title">
                  {t('contacts.title_text_title')}
                </h1>
                <p className="first-screen__content-col-1_subtitlecontact">
                  {t('contacts.title_text_subtitle')}
                </p>
                <a className="btn btn-primary first-screen__content-col-1_btn">
                  <span>{t('contacts.title_button_text')}</span>
                  <img src="./assets/img/icons/arrow-white-right.svg" alt="arrow-white" />
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6 position-relative">
              <div className="first-screen__content-col-2">
                <div className="first-screen__content-col-2_content">
                  <img
                    src="./assets/img/contacts/main.png"
                    alt="main"
                    className="first-screen__content-col-2_blob-laptopcontact"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container contacts-info-container">
        <div className="contacts-info-blocks">
          <div className="contacts-info-block">
            <img src="./assets/img/contacts/mail.svg" alt="contacts-img" className="contacts-img" />
            <h3>Email</h3>
            <p>Prmeusa@gmail.com</p>
          </div>
          <div className="contacts-info-block">
            <img
              src="./assets/img/contacts/phone.svg"
              alt="contacts-img"
              className="contacts-img"
            />
            <h3>Phone</h3>
            <p>+1 424 844 7320</p>
          </div>
          <div className="contacts-info-block">
            <img
              src="./assets/img/contacts/location.svg"
              alt="contacts-img"
              className="contacts-img"
            />
            <h3>Address</h3>
            <p>104A 12444 Ventura Blvd, Studio City, CA, 91604, United States</p>
          </div>
        </div>
        <Iframe iframe={iframe} className="google-maps-contacts" />
      </div>
      <div className="contact-us" id="contact-us">
        <ContactUs />
      </div>
    </main>
  );
}
