'use client';

import {useState} from 'react';
import {useTranslation} from '../i18n/client';

function Counter() {
  const [count, setCount] = useState(0);
  const {t} = useTranslation();

  return (
    <div>
      <h1>{t('client_component')}</h1>
      <p className="text-2xl my-4">
        {t('count')}: {count}
      </p>
      <button
        className="p-2 bg-black text-white mb-2"
        onClick={() => setCount(count + 1)}
      >
        {t('increase')}
      </button>{' '}
      <br />
      <button
        className="p-2 bg-black text-white"
        onClick={() => setCount(count - 1)}
      >
        {t('decrease')}
      </button>
    </div>
  );
}

export default Counter;
