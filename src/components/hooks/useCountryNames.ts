import { useState, useEffect } from 'react';
import { httpGet } from '@/lib/fetch';
import enUS from '../../../public/intl/country/en-US.json';

const countryNames = {
  'en-US': enUS,
};

export function useCountryNames(locale: string) {
  const [list, setList] = useState(countryNames[locale] || enUS);

  async function loadData(locale: string) {
    const { data } = await httpGet(`${process.env.basePath || ''}/intl/country/${locale}.json`);

    if (data) {
      countryNames[locale] = data;
      setList(countryNames[locale]);
    } else {
      setList(enUS);
    }
  }

  useEffect(() => {
    if (!countryNames[locale]) {
      loadData(locale);
    } else {
      setList(countryNames[locale]);
    }
  }, [locale]);

  return { countryNames: list };
}

export default useCountryNames;
