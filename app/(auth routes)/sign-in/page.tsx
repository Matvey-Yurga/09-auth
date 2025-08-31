"use client";
import { Login, RegisterPayload } from '@/lib/api/clientApi';
import css from './SignInPage.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api/api';

export default function SignIn() {
        const router = useRouter();
        const [error, setError] = useState<string | null>(null);
        const handleSubmit = async (fromData: FormData) => {
            try {
                const data = Object.fromEntries(fromData) as RegisterPayload;
                const res = await Login(data);
                if (res) {
                    router.push('/Profile')
                } else {
                    setError('Failed to register');
                }
            } catch (error) {
                setError((error as ApiError).response?.data.error ?? (error as ApiError).message ?? 'Something went wrong');
            }
        }
    return (<main className={css.mainContent}>
 <form action={handleSubmit} className={css.form}>
    <h1 className={css.formTitle}>Sign in</h1>

    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Log in
      </button>
    </div>

   {error && <p className={css.error}>{error}</p>}
  </form>
</main>
)
}