import { createContext, useState, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import NextI18nextConfig from '../../next-i18next.config';
import Helmet from 'react-helmet';
import { SessionProvider } from 'next-auth/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'semantic-ui-css/semantic.min.css';
import '../assets/style/bootstrap.min.css';
import '../assets/style/style.css';
import 'react-range-slider-input/dist/style.css';
import { Auth } from './Login';
import Layout from '../components/Layout';
import { StoreProvider } from '../store/store';
import Developing from '../pages/developing';

const ThemeContext = createContext(null);
async function userLogin() {
  let token = localStorage.getItem('token');
  if (token) {
    let user = await Auth(token);
    if (user) {
    }
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ThemeContext.Provider value="dark">
      <StoreProvider>
        <Layout>
          {loading ? (
            <div className="loader-container">
              <img
                className="loader-container-gif"
                src="./assets/img/preloader.gif"
                alt="asdsadasdasd"
              />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>

        <Helmet>
          <link rel="icon" type="image/png" href="/assets/img/logo.svg" sizes="16x16" />
        </Helmet>
      </StoreProvider>
    </ThemeContext.Provider>,
  );
}

export default appWithTranslation(MyApp, NextI18nextConfig);
