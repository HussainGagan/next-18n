import Counter from '../components/Counter';
import {createTranslation} from '../i18n/server';

export default async function Page() {
  const {t} = await createTranslation();

  return (
    <div>
      <h1>{t('greeting')}</h1>
      <Counter />
    </div>
  );
}
