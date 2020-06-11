import { useEffect, useState } from 'react';
import axios from 'axios';
import { Item, Service } from './types';

export interface Items {
  results: Item[];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useGetData = () => {
  const [result, setResult] = useState<Service<Items>>({ status: 'loading' });

  const url = 'http://localhost:3000/';
  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.data.items)
      .catch((error) => setResult({ status: 'error', error }));
  }, []);
  return result;
};

export default useGetData;
