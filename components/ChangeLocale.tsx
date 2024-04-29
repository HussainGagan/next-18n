'use client';
import React from 'react';
import {switchLocaleAction} from '../actions/switch-locale';
import {useTranslation} from '../i18n/client';

// We removed the `locale` prop because we can get it from the hook
export default function ChangeLocale() {
  const {i18n, t} = useTranslation();
  // You can also use our custom hook instead of `i18n.resolvedLanguage`
  // const locale = useLocale();

  return (
    <div>
      <select
        onChange={e => switchLocaleAction(e.target.value)}
        value={i18n.resolvedLanguage}
      >
        <option value="en">en English</option>
        <option value="de">de German</option>
        <option value="fr">fr French</option>
      </select>
    </div>
  );
}
