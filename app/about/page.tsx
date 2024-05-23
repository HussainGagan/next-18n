import Link from 'next/link';
import {createTranslation} from '../../i18n/server';

async function Page() {
  const {t} = await createTranslation();

  return (
    <div>
      <h1>About</h1>
      <p>{t('auth.form.email_placeholder')}</p>
      <p>{t('test.work')}</p>
      <Link href="/">Home</Link>
    </div>
  );
}

export default Page;
