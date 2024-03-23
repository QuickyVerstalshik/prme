import React, { useState, useEffect, useContext } from 'react';
import NiceSelect from '../../components/NiceSelect/NiceSelect';
import RangeSlider from 'react-range-slider-input';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useStores } from '../../hooks/useStore';
import { appContext } from '../../components/Layout';
import { Dropdown, Icon } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

export default function Store() {
  const { t, i18n, ready } = useTranslation();
  const apiUrl = 'https://api.pay2pitch.app/items/';
  const filterUrl =
    'https://api.pay2pitch.app/items/?region=&language=&engagement_min=&engagement_max=&categories=&price_min=&price_max=&isMain=&sponsored=&doFollow=&indexed=&image=';

  let [array, setArray] = useState([]);
  let [regions, setRegions] = useState([]);
  let [languages, setLanguages] = useState([]);
  let [cities, setCities] = useState([]);
  let [categories, setCategories] = useState([]);
  let [productCount, setProductCount] = useState('0');

  let [filterMenu, setFilterMenu] = useState(false);

  let [searchValue, setSearchValue] = useState('');

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setcurrentPage] = useState(0);

  let [regionFilters, setRegionFilters] = useState([]);
  let [categoryFilters, setCategoryFilters] = useState([]);

  let [Fregion, setFregion] = useState('?region=');
  let [Fcity, setFcity] = useState('&city=');
  let [Flanguage, setFlanguage] = useState('&language=');
  let [Fengagement_min, setFengagement_min] = useState('&engagement_min=');
  let [Fengagement_max, setFengagement_max] = useState('&engagement_max=');
  let [Fcategory, setFcategory] = useState('&categories=');
  let [Fprice_min, setFprice_min] = useState('&price_min=');
  let [Fprice_max, setFprice_max] = useState('&price_max=');
  let [FisMain, setFisMain] = useState('&isMain=');
  let [Fsponsored, setFsponsored] = useState('&sponsored=');
  let [FdoFollow, setFdoFollow] = useState('&doFollow=');
  let [Findexed, setFindexed] = useState('&indexed=');
  let [Fimage, setFimage] = useState('&image=');

  let [FregionX, setFregionX] = useState(undefined);
  let [FcityX, setFcityX] = useState(undefined);
  let [FlanguageX, setFlanguageX] = useState(undefined);
  let [Fengagement_minX, setFengagement_minX] = useState(undefined);
  let [Fengagement_maxX, setFengagement_maxX] = useState(undefined);
  let [FcategoryX, setFcategoryX] = useState(undefined);
  let [Fprice_minX, setFprice_minX] = useState(undefined);
  let [Fprice_maxX, setFprice_maxX] = useState(undefined);
  let [FisMainX, setFisMainX] = useState(undefined);
  let [FsponsoredX, setFsponsoredX] = useState(undefined);
  let [FdoFollowX, setFdoFollowX] = useState(undefined);
  let [FindexedX, setFindexedX] = useState(undefined);
  let [FimageX, setFimageX] = useState(undefined);

  let [x1, setX1] = useState(false);
  let [x2, setX2] = useState(false);
  let [x3, setX3] = useState(false);
  let [x4, setX4] = useState(false);
  let [x5, setX5] = useState(false);

  let [priceMin, setPriceMin] = useState(null);
  let [priceMax, setPriceMax] = useState(null);

  let [engagmentMin, setEngagmentMin] = useState(null);
  let [engagmentMax, setEngagmentMax] = useState(null);

  const [value, setValue] = useState([null, null]);
  const [engagment, setEngagment] = useState([null, null]);

  const updateFilterState = () => {
    setFilterMenu(!filterMenu);
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

  const onPriceChange = debounce((e) => {
    setFprice_min('&price_min=' + e[0]);
    setFprice_max('&price_max=' + e[1]);
    setValue([e[0], e[1]]);
    let item = '&price_min=' + e[0] + '&price_max=' + e[1];
    handleFilterSubmit(e, item + '&region=1547');
  }, 500);
  const onEngagmentChange = debounce((e) => {
    setFengagement_min('&engagement_min=' + e[0]);
    setFengagement_max('&engagement_max=' + e[1]);
    setEngagment([e[0], e[1]]);
    let item = '&engagement_min=' + e[0] + '&engagement_max=' + e[1];
    handleFilterSubmit(e, item);
  }, 500);

  const onFilterChange = (e, data) => {
    const id = data.id;
    const value = data.value;
    if (id == 'Fregion') {
      let item = '&region=' + value;
      setFregion('?region=' + value);
      setFregionX(null);
      setX1(false);
      setRegionFilters([...regionFilters, { id: item, text: e.target.textContent }]);
    }
    if (id == 'Flanguage') {
      let item = '&language=' + value;
      setFlanguage('&language=' + value);
      setFlanguageX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fengagement_min') {
      let item = '&engagement_min=' + value;
      setFengagement_min(item);
      setFengagement_minX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fengagement_max') {
      let item = '&engagement_max=' + value;
      setFengagement_max(item);
      setFengagement_maxX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fcategory') {
      let item = '&categories=' + value;
      setFcategory(item);
      setFcategoryX(null);
      setX2(false);
      setCategoryFilters([...categoryFilters, { id: item, text: e.target.textContent }]);
    }
    if (id == 'Fprice_min') {
      let item = '&price_min=' + value;
      setFprice_min(item);
      setFprice_minX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fprice_max') {
      let item = '&price_max=' + value;
      setFprice_max(item);
      setFprice_maxX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'FisMain') {
      let item = '&isMain=' + value;
      setFisMain(item);
      setFisMainX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fsponsored') {
      let item = '&sponsored=' + value;
      setFsponsored(item);
      setFsponsoredX(value);
      setX3(true);
      handleFilterSubmit(e, item);
    }
    if (id == 'FdoFollow') {
      let item = '&doFollow=' + value;
      setFdoFollow(item);
      setFdoFollowX(value);
      setX4(true);
      handleFilterSubmit(e, item);
    }
    if (id == 'Findexed') {
      let item = '&indexed=' + value;
      setFindexed(item);
      setFindexedX(value);
      handleFilterSubmit(e, item);
    }
    if (id == 'Fimage') {
      let item = '&image=' + value;
      setFimage(item);
      setFimageX(value);
      setX5(true);
      handleFilterSubmit(e, item);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    e.preventDefault();
    handleFilterSubmit([], value);
  };
  const handlePaginationSubmit = (pageCount) => {
    let result = regionFilters.map((x) => x.id).join('');
    let resultCategory = categoryFilters.map((x) => x.id).join('');
    const allFiltersOne =
      '?' +
      result +
      Fcity +
      Flanguage +
      Fengagement_min +
      Fengagement_max +
      resultCategory +
      Fprice_min +
      Fprice_max +
      FisMain +
      Fsponsored +
      FdoFollow +
      Findexed +
      Fimage +
      '&isPack=false' +
      '&limit=12' +
      '&offset=' +
      pageCount * 12;
    axios
      .get(apiUrl + allFiltersOne + `&search=${searchValue}`)
      .then((res) => {
        window.scrollTo(0, 0);
        setArray(res.data.results);
        setPageCount(res.data.count / 12);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  };
  useEffect(() => {
    handleFilterSubmit([]);
    setFregion('?region=');
    setFcategory('&categories=');
  }, [regionFilters, categoryFilters]);

  const handleFilterSubmit = (e, item, chipsItem) => {
    if (Array.isArray(e)) {
      console.log('');
    } else {
      e.preventDefault();
    }

    let result = regionFilters.map((x) => x.id).join('');
    let resultCategory = categoryFilters
      .filter((el) => el.id !== chipsItem)
      .map((x) => x.id)
      .join('');

    console.log(resultCategory);
    const allFiltersOne =
      '?' +
      result +
      Fcity +
      Flanguage +
      Fengagement_min +
      Fengagement_max +
      resultCategory +
      Fprice_min +
      Fprice_max +
      FisMain +
      Fsponsored +
      FdoFollow +
      Findexed +
      '&isPack=false' +
      '&limit=12' +
      Fimage +
      `&search=${item == undefined ? '' : item}`;
    // (item == '?region=' ? '&region=' : item == '' ? '' : item + '&region=');
    axios
      .get(apiUrl + allFiltersOne)
      .then((res) => {
        setArray(res.data.results);
        setProductCount(res.data.count);
        setPageCount(res.data.count / 12);
        console.log(result);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
  };
  const handlePageChange = (selectedObject) => {
    setcurrentPage(selectedObject.selected + 1);
    let pageCount = selectedObject.selected;
    handlePaginationSubmit(pageCount);
  };
  const appCtx = useContext(appContext);

  const handleClearFilter = (e) => {
    let id = e.target.id;

    if (id == 'FregionX') {
      setFregion('?');
      setFregionX(null);
      setX1(false);
      handleFilterSubmit(e, '');
    }
    if (id == 'FlanguageX') {
      setFlanguage('&language=');
      setFlanguageX(null);
      handleFilterSubmit(e, '&language=');
    }
    if (id == 'Fengagement_minX') {
      setFengagement_min('&engagement_min=');
      setFengagement_minX(null);
      handleFilterSubmit(e, '&engagement_min=');
    }
    if (id == 'Fengagement_maxX') {
      setFengagement_max('&engagement_max=');
      setFengagement_maxX(null);
      handleFilterSubmit(e, '&engagement_max=');
    }
    if (id == 'FcategoryX') {
      setFcategory('&categories=');
      setFcategoryX(null);
      setX2(false);
      handleFilterSubmit(e, '&categories=');
    }
    if (id == 'Fprice_minX') {
      setFprice_minX('&price_min=');
      setFprice_minX(null);
      handleFilterSubmit(e, '&price_min=');
    }
    if (id == 'Fprice_maxX') {
      setFprice_maxX('&price_max=');
      setFprice_maxX(null);
      handleFilterSubmit(e, '&price_max=');
    }
    if (id == 'FisMainX') {
      setFisMain('&isMain=');
      setFisMainX(null);
      handleFilterSubmit(e, '&isMain=');
    }
    if (id == 'FsponsoredX') {
      setFsponsored('&sponsored=');
      setFsponsoredX(null);
      setX3(false);
      handleFilterSubmit(e, '&sponsored=');
    }
    if (id == 'FdoFollowX') {
      setFdoFollow('&doFollow=');
      setFdoFollowX(null);
      setX4(false);
      handleFilterSubmit(e, '&doFollow=');
    }
    if (id == 'FindexedX') {
      setFindexed('&indexed=');
      setFindexedX(null);
      handleFilterSubmit(e, '&indexed=');
    }
    if (id == 'FimageX') {
      setFimage('&image=');
      setFimageX(null);
      setX5(false);
      handleFilterSubmit(e, '&image=');
    }
  };

  useEffect(() => {
    axios
      .get('https://api.pay2pitch.app/items/?limit=12&isPack=false')
      .then((res) => {
        setArray(res.data.results);
        setProductCount(res.data.count);
        setPageCount(res.data.count / 12);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });

    axios
      .get('https://api.pay2pitch.app/getFilters')
      .then((res) => {
        setValue([res.data.lowest_price.price__min, res.data.highest_price.price__max]);
        setPriceMin(res.data.lowest_price.price__min);
        setPriceMax(res.data.highest_price.price__max);
        setEngagment([
          res.data.lowest_engagement.engagement__min,
          res.data.highest_engagement.engagement__max,
        ]);
        setEngagmentMin(res.data.lowest_engagement.engagement__min);
        setEngagmentMax(res.data.highest_engagement.engagement__max);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });

    axios
      .get('https://api.pay2pitch.app/regions/?limit=200&offset=0')
      .then((res) => {
        console.log(res.data.results);
        let filter = res.data.results.map((el, i) => ({
          key: el.id,
          value: el.id,
          text: el.name,
        }));
        let regionsArr = [];
        filter.map((el) => {
          if (el.key == 1547) {
            regionsArr.push(regionsArr[0]);
            regionsArr.unshift(regionsArr.pop());
            regionsArr[0] = el;
          }
          if (el.key == 1562) {
            if (regionsArr[0].key !== 1547) {
              regionsArr.push(regionsArr[0]);
            }

            regionsArr.unshift(regionsArr.pop());
            regionsArr[1] = el;
          } else {
            regionsArr.push(el);
          }
          // if (el.key == 1562) {
          //   regionsArr[1] = el;
          // }
        });
        let sortedRegionsArr = regionsArr.sort(function (a, b) {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
        setRegions(sortedRegionsArr);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    axios
      .get('https://api.pay2pitch.app/languages/?limit=200&offset=0')
      .then((res) => {
        let filter = res.data.results.map((el) => ({
          key: el.id,
          value: el.id,
          text: el.name,
        }));
        setLanguages(filter);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });
    axios
      .get('https://api.pay2pitch.app/categories/?limit=200&offset=0')
      .then((res) => {
        let filter = res.data.results.map((el) => ({
          key: el.id,
          value: el.id,
          text: el.name,
        }));
        function SortArray(x, y) {
          return x.text.localeCompare(y.text, 'fr', { ignorePunctuation: true });
        }
        var s = filter.sort(SortArray);
        let sortedCategoriesArr = s.sort(function (a, b) {
          if (a.text < b.text) {
            return -1;
          }
          if (a.text > b.text) {
            return 1;
          }
          return 0;
        });
        setCategories(sortedCategoriesArr);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
      });

    const nav = document.querySelector('.nav-container');

    if (nav) {
      const toggle = nav.querySelector('.nav-toggle');

      if (toggle) {
        toggle.addEventListener('click', () => {
          if (nav.classList.contains('is-active')) {
            nav.classList.add('is-active');
          }
        });
      }
    }
  }, []);
  const {
    userStore: { isLogged, username, clearUser },
  } = useStores();

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <main className="main main-page-store">
        <img src="./assets/img/ellipse-576.png" alt="" className="main-page-store__ellipse" />
        <div className="container">
          <div className="store-page-title-search">
            <div className="store-page-title-search__content">
              <h1 className="store-page-title-search__title">{t('media.store_text_title')}</h1>
              <div className="store-page-title-search__search">
                <input
                  type="text"
                  placeholder={t('media.store')}
                  className="store-page-title-search__search_input"
                  onChange={(e) => {
                    handleSearchChange(e);
                  }}
                />
              </div>
            </div>
            <div className="store-catalog__quantity-products">
              <div class={filterMenu ? 'nav-container is-active' : 'nav-container'} tabindex="0">
                <div class="nav-toggle" onClick={updateFilterState}>
                  <button>
                    <img
                      src="/assets/img/store/filterMenu.svg"
                      alt="filterMenu"
                      className="filterImgFirst"
                    />
                    <div>
                      Filter
                      <img src="/assets/img/store/filterMenuArrow.svg" alt="filterMenuArrow" />
                    </div>
                  </button>
                </div>

                <nav class="nav-items">
                  <div class="nav-toggle menu" onClick={updateFilterState}>
                    <button>
                      <img
                        src="/assets/img/store/filterMenu.svg"
                        alt="filterMenu"
                        className="filterImgFirst"
                      />
                      <div>
                        Filter
                        <img src="/assets/img/store/filterMenuArrow.svg" alt="filterMenuArrow" />
                      </div>
                    </button>
                  </div>
                  <div className="d-lg-block col-lg-3 filterMenuNav">
                    <form className="store-catalog-form">
                      <div className="store-catalog-form__filters-wrap">
                        <div className="store-catalog-form__select-wrap">
                          <img
                            src="/assets/img/store/clear.svg"
                            id="FregionX"
                            className={x1 ? 'FilterClear' : 'FilterClear none'}
                            onClick={(e) => {
                              handleClearFilter(e);
                            }}
                            alt=""
                          />

                          <Dropdown
                            onChange={(e, data) => {
                              onFilterChange(e, data);
                              handleClearFilter(e);
                            }}
                            options={regions}
                            value={FregionX}
                            placeholder={t('product.region')}
                            selection
                            id="Fregion"
                          />
                        </div>
                        {/* <div className="store-catalog-form__select-wrap">
                        <Dropdown
                          onChange={(e, data) => {
                            onFilterChange(e, data);
                          }}
                          options={cities}
                          placeholder="City"
                          selection
                          id="Fcity"
                        />
                      </div>
                      <div className="store-catalog-form__select-wrap">
                        <Dropdown
                          onChange={(e, data) => {
                            onFilterChange(e, data);
                          }}
                          options={languages}
                          placeholder="Language"
                          selection
                          id="Flanguage"
                        />
                      </div> */}
                        <div className="store-catalog-form__select-wrap">
                          <img
                            src="/assets/img/store/clear.svg"
                            id="FcategoryX"
                            className={x2 ? 'FilterClear' : 'FilterClear none'}
                            onClick={(e) => {
                              handleClearFilter(e);
                            }}
                            alt=""
                          />
                          <Dropdown
                            onChange={(e, data) => {
                              onFilterChange(e, data);
                            }}
                            options={categories}
                            value={FcategoryX}
                            placeholder={t('product.category')}
                            selection
                            id="Fcategory"
                          />
                        </div>

                        <div className="store-catalog-form__range-price">
                          <p className="store-catalog-form__range-price_title">
                            {t('media.store_text_content')}
                          </p>
                          <RangeSlider
                            min={priceMin}
                            max={priceMax}
                            step={1000}
                            value={value}
                            onInput={(e) => {
                              console.log(e);
                              onPriceChange(e);
                            }}
                          />
                          <div class="price-input">
                            <div class="price-input__field">
                              <span class="price-input__span">Min</span>
                              <input
                                type="number"
                                class="price-input__input price-input__input-min"
                                value={value[0]}
                                onChange={(e) => {
                                  onPriceChange([e.target.value, value[1]]);
                                }}
                              />
                            </div>
                            <div class="separator">-</div>
                            <div class="price-input__field">
                              <span class="price-input__span">Max</span>
                              <input
                                type="number"
                                class="price-input__input price-input__input-max"
                                value={value[1]}
                                onChange={(e) => {
                                  onPriceChange([value[0], e.target.value]);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="store-catalog-form__range-price">
                          <p className="store-catalog-form__range-price_title">
                            {t('product.engagment')}
                          </p>
                          <RangeSlider
                            min={engagmentMin}
                            max={engagmentMax}
                            step={5}
                            value={engagment}
                            onInput={(e) => {
                              onEngagmentChange(e);
                            }}
                          />
                          <div class="price-input">
                            <div class="price-input__field engagment">
                              <span class="price-input__span">{nFormatter(engagment[0])}</span>
                            </div>
                            <div class="price-input__field engagment">
                              <span class="price-input__span">{nFormatter(engagment[1])}</span>
                            </div>
                          </div>
                        </div>
                        <div className="store-catalog-form__select-wrap">
                          <img
                            src="/assets/img/store/clear.svg"
                            id="FsponsoredX"
                            className={x3 ? 'FilterClear' : 'FilterClear none'}
                            onClick={(e) => {
                              handleClearFilter(e);
                            }}
                            alt=""
                          />
                          <Dropdown
                            onChange={(e, data) => {
                              onFilterChange(e, data);
                            }}
                            options={[
                              { key: 'Y', value: 'Y', text: t('yes.no') },
                              { key: 'N', value: 'N', text: t('yes.no_text_title') },
                              { key: 'D', value: 'D', text: 'Discrete' },
                              { key: 'P', value: 'P', text: 'Partner' },
                              { key: 'R', value: 'R', text: 'Press release' },
                            ]}
                            placeholder={t('product.sponsored')}
                            value={FsponsoredX}
                            selection
                            id="Fsponsored"
                          />
                        </div>
                        <div className="store-catalog-form__select-wrap">
                          <img
                            src="/assets/img/store/clear.svg"
                            id="FdoFollowX"
                            className={x4 ? 'FilterClear' : 'FilterClear none'}
                            onClick={(e) => {
                              handleClearFilter(e);
                            }}
                            alt=""
                          />
                          <Dropdown
                            onChange={(e, data) => {
                              onFilterChange(e, data);
                            }}
                            options={[
                              { key: 'YY', value: 'Y', text: t('yes.no') },
                              { key: 'NN', value: 'N', text: t('yes.no_text_title') },
                              { key: 'DD', value: 'M', text: 'Maybe' },
                            ]}
                            placeholder={t('product.follow')}
                            value={FdoFollowX}
                            selection
                            id="FdoFollow"
                          />
                        </div>
                        <div className="store-catalog-form__select-wrap">
                          <img
                            src="/assets/img/store/clear.svg"
                            id="FimageX"
                            className={x5 ? 'FilterClear' : 'FilterClear none'}
                            onClick={(e) => {
                              handleClearFilter(e);
                            }}
                            alt=""
                          />
                          <Dropdown
                            onChange={(e, data) => {
                              onFilterChange(e, data);
                            }}
                            options={[
                              { key: 'YYY', value: 'Y', text: t('yes.no') },
                              { key: 'NNN', value: 'N', text: t('yes.no_text_title') },
                              { key: 'MMM', value: 'M', text: 'Maybe' },
                            ]}
                            value={FimageX}
                            placeholder={t('product.image')}
                            selection
                            id="Fimage"
                          />
                        </div>
                      </div>
                      <div className="store-catalog-form__filters-btn">
                        {/* <button
                        className="btn store-catalog-form__filters-btn_apply"
                        onClick={(e) => {
                          handleFilterSubmit(e);
                        }}>
                        Apply
                      </button> */}
                        <button
                          className="btn store-catalog-form__filters-btn_reset"
                          onClick={refreshPage}>
                          {t('media.store_button_text')}
                        </button>
                      </div>
                    </form>
                  </div>
                </nav>
              </div>
              <div className="product-count-container">
                <div className="store-catalog__quantity-products_number">{productCount}</div>
                <div className="store-catalog__quantity-products_text">
                  {t('media.store_text_subtitle')}
                </div>
              </div>
            </div>
          </div>

          <div className="store-catalog">
            <div className="row">
              {/* <div className="col-12 col-lg-3 col-xxl-4">
                  <button
                    className="btn store-catalog__btn-filters d-lg-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasFilters"
                    aria-controls="offcanvasFilters">
                    <img src="./assets/img/icons/funnel.svg" alt="" />
                    <span>Filters</span>
                  </button>

                  <div className="store-applied-filters">
                    <p className="store-applied-filters__text">Applied filters:</p>
                    <div className="store-applied-filters__selected-wrap">
                      <div className="store-applied-filters__selected">
                        <span>Selected Filter</span>
                        <button className="btn store-applied-filters__close">
                          <img src="./assets/img/icons/close-btn.svg" alt="" />
                        </button>
                      </div>
                      <div className="store-applied-filters__selected">
                        <span>Selected Filter</span>
                        <button className="btn store-applied-filters__close">
                          <img src="./assets/img/icons/close-btn.svg" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              {/* <div className="col-12 col-lg-9 col-xxl-8">
                  <div className="store-recommended">
                    <div className="store-recommended__list">
                      <button className="btn store-recommended__item">Recommended</button>
                      <button className="btn store-recommended__item active">New</button>
                      <button className="btn store-recommended__item">Price</button>
                      <button className="btn store-recommended__item">Audience</button>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className="row">
              <div className="d-none d-lg-block col-lg-3">
                <form className="store-catalog-form">
                  <div className="store-catalog-form__filters-wrap">
                    <div className="store-catalog-form__select-wrap">
                      <img
                        src="/assets/img/store/clear.svg"
                        id="FregionX"
                        className={x1 ? 'FilterClear' : 'FilterClear none'}
                        onClick={(e) => {
                          handleClearFilter(e);
                        }}
                        alt=""
                      />

                      <Dropdown
                        onChange={(e, data) => {
                          onFilterChange(e, data);
                        }}
                        options={regions}
                        value={FregionX}
                        placeholder={t('product.region')}
                        selection
                        id="Fregion"
                      />
                      <div className="filter-chips-container">
                        {regionFilters.map((obj, i) => (
                          <div key={i}>
                            <p>{obj.text}</p>
                            <svg
                              fill="none"
                              height="24"
                              onClick={() => {
                                setRegionFilters(regionFilters.filter((el) => el.id !== obj.id));
                              }}
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* <div className="store-catalog-form__select-wrap">
                        <Dropdown
                          onChange={(e, data) => {
                            onFilterChange(e, data);
                          }}
                          options={cities}
                          placeholder="City"
                          selection
                          id="Fcity"
                        />
                      </div>
                      <div className="store-catalog-form__select-wrap">
                        <Dropdown
                          onChange={(e, data) => {
                            onFilterChange(e, data);
                          }}
                          options={languages}
                          placeholder="Language"
                          selection
                          id="Flanguage"
                        />
                      </div> */}
                    <div className="store-catalog-form__select-wrap">
                      <img
                        src="/assets/img/store/clear.svg"
                        id="FcategoryX"
                        className={x2 ? 'FilterClear' : 'FilterClear none'}
                        onClick={(e) => {
                          handleClearFilter(e);
                        }}
                        alt=""
                      />
                      <Dropdown
                        onChange={(e, data) => {
                          onFilterChange(e, data);
                        }}
                        options={categories}
                        value={FcategoryX}
                        placeholder={t('product.category')}
                        selection
                        id="Fcategory"
                      />
                      <div className="filter-chips-container">
                        {categoryFilters.map((obj, i) => (
                          <div key={i}>
                            <p>{obj.text}</p>
                            <svg
                              fill="none"
                              height="24"
                              onClick={() => {
                                setCategoryFilters(
                                  categoryFilters.filter((el) => el.id !== obj.id),
                                );
                              }}
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="store-catalog-form__range-price">
                      <p className="store-catalog-form__range-price_title">
                        {t('media.store_text_content')}
                      </p>
                      <RangeSlider
                        min={priceMin}
                        max={priceMax}
                        step={1000}
                        value={value}
                        onInput={(e) => {
                          console.log(e);
                          onPriceChange(e);
                        }}
                      />
                      <div class="price-input">
                        <div class="price-input__field">
                          <span class="price-input__span">Min</span>
                          <input
                            type="number"
                            class="price-input__input price-input__input-min"
                            value={value[0]}
                            onChange={(e) => {
                              onPriceChange([e.target.value, value[1]]);
                            }}
                          />
                        </div>
                        <div class="separator">-</div>
                        <div class="price-input__field">
                          <span class="price-input__span">Max</span>
                          <input
                            type="number"
                            class="price-input__input price-input__input-max"
                            value={value[1]}
                            onChange={(e) => {
                              onPriceChange([value[0], e.target.value]);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="store-catalog-form__range-price">
                      <p className="store-catalog-form__range-price_title">
                        {t('product.engagment')}
                      </p>
                      <RangeSlider
                        min={engagmentMin}
                        max={engagmentMax}
                        step={5}
                        value={engagment}
                        onInput={(e) => {
                          onEngagmentChange(e);
                        }}
                      />
                      <div class="price-input">
                        <div class="price-input__field engagment">
                          <span class="price-input__span">{nFormatter(engagment[0])}</span>
                        </div>
                        <div class="price-input__field engagment">
                          <span class="price-input__span">{nFormatter(engagment[1])}</span>
                        </div>
                      </div>
                    </div>
                    <div className="store-catalog-form__select-wrap">
                      <img
                        src="/assets/img/store/clear.svg"
                        id="FsponsoredX"
                        className={x3 ? 'FilterClear' : 'FilterClear none'}
                        onClick={(e) => {
                          handleClearFilter(e);
                        }}
                        alt=""
                      />
                      <Dropdown
                        onChange={(e, data) => {
                          onFilterChange(e, data);
                        }}
                        options={[
                          { key: 'Y', value: 'Y', text: t('yes.no') },
                          { key: 'N', value: 'N', text: t('yes.no_text_title') },
                          { key: 'D', value: 'D', text: 'Discrete' },
                          { key: 'P', value: 'P', text: 'Partner' },
                          { key: 'R', value: 'R', text: 'Press release' },
                        ]}
                        placeholder={t('product.sponsored')}
                        value={FsponsoredX}
                        selection
                        id="Fsponsored"
                      />
                    </div>
                    <div className="store-catalog-form__select-wrap">
                      <img
                        src="/assets/img/store/clear.svg"
                        id="FdoFollowX"
                        className={x4 ? 'FilterClear' : 'FilterClear none'}
                        onClick={(e) => {
                          handleClearFilter(e);
                        }}
                        alt=""
                      />
                      <Dropdown
                        onChange={(e, data) => {
                          onFilterChange(e, data);
                        }}
                        options={[
                          { key: 'YY', value: 'Y', text: t('yes.no') },
                          { key: 'NN', value: 'N', text: t('yes.no_text_title') },
                          { key: 'DD', value: 'M', text: 'Maybe' },
                        ]}
                        placeholder={t('product.follow')}
                        value={FdoFollowX}
                        selection
                        id="FdoFollow"
                      />
                    </div>
                    <div className="store-catalog-form__select-wrap">
                      <img
                        src="/assets/img/store/clear.svg"
                        id="FimageX"
                        className={x5 ? 'FilterClear' : 'FilterClear none'}
                        onClick={(e) => {
                          handleClearFilter(e);
                        }}
                        alt=""
                      />
                      <Dropdown
                        onChange={(e, data) => {
                          onFilterChange(e, data);
                        }}
                        options={[
                          { key: 'YY', value: 'Y', text: t('yes.no') },
                          { key: 'NN', value: 'N', text: t('yes.no_text_title') },
                          { key: 'DD', value: 'M', text: 'Maybe' },
                        ]}
                        value={FimageX}
                        placeholder={t('product.image')}
                        selection
                        id="Fimage"
                      />
                    </div>
                  </div>
                  <div className="store-catalog-form__filters-btn">
                    {/* <button
                        className="btn store-catalog-form__filters-btn_apply"
                        onClick={(e) => {
                          handleFilterSubmit(e);
                        }}>
                        Apply
                      </button> */}
                    <button
                      className="btn store-catalog-form__filters-btn_reset"
                      onClick={refreshPage}>
                      {t('media.store_button_text')}
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-9 col-xxl-9">
                <div className="store-catalog">
                  <div className="row gx-xxl-5 gy-5 store-catalog__row">
                    {array.map((el, i) => (
                      <div key={i} className="col-12 col-sm-6 col-md-3 store-card">
                        <Link href={{ pathname: '/product', query: { id: el.id } }}>
                          <div className="store-catalog__card">
                            <div className="store-catalog__card_header">
                              <div className="store-catalog__card_image-wrap">
                                <img
                                  src={
                                    el.mainImage == null
                                      ? './assets/img/store/default.png'
                                      : el.mainImage
                                  }
                                  className="store-catalog__card_image"
                                  alt="forbes"
                                />
                              </div>
                            </div>
                            <div className="store-catalog__card_body">
                              <h3 className="store-catalog__card_title">{el.name}</h3>

                              <a
                                href={el.site}
                                className="store-catalog__card_link"
                                target="_blank">
                                {el.site}
                              </a>
                              <div className="store-catalog__card_info-item">
                                <p className="store-catalog__card_plain-text">
                                  {t('product.region')}
                                </p>
                                <p className="store-catalog__card_bold-text">
                                  <span>{el.region ? el.region.name : 'No'}</span>
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
                                  {nFormatter(el.engagement, 1)}
                                </p>
                              </div>
                              <div className="store-catalog__card_info-item">
                                <p className="store-catalog__card_plain-text">
                                  {t('product.category')}
                                </p>
                                <p className="store-catalog__card_bold-text">
                                  {/* {el.category ? el.category.name : 'No'} */}
                                  {el.categories.length < 2 ? (
                                    el.categories.map((x, j) => {
                                      return <b key={j}>{x.name}</b>;
                                    })
                                  ) : (
                                    <b id={`item${i}`}>{`${el.categories.length} genres`}</b>
                                  )}
                                </p>
                                <Tooltip anchorSelect={`#item${i}`} place="top">
                                  {el.categories.length > 2
                                    ? el.categories.map((x, j) => {
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
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="store-catalog__footer">
                    <div className="store-catalog__pagination">
                      <div className="store-catalog__pagination_text"></div>
                      <ReactPaginate
                        pageCount={pageCount}
                        pageRange={5}
                        marginPagesDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        previousLinkClassName={'nextProvNone'}
                        breakClassName={'page'}
                        nextLinkClassName={'nextProvNone'}
                        pageClassName={'page-link'}
                        disabledClassNae={'disabled'}
                        activeClassName={'active'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Helmet>
          <title>{t('pages_text_title')}</title>
        </Helmet>
      </main>
    </>
  );
}
