"use client"
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css";
import { Register, RegisterPayload } from "@/lib/api/clientApi";
import { useState } from "react";
import { ApiError } from "@/lib/api/api";
export default function SingUp(){
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = async (fromData: FormData) => {
        try {
            const data = Object.fromEntries(fromData) as RegisterPayload;
            const res = await Register(data);
            if (res) {
                router.push('/profile')
            } else {
                setError('Failed to register');
            }
        } catch (error) {
            setError((error as ApiError).response?.data.error ?? (error as ApiError).message ?? 'Something went wrong');
        }
    }
    return (<main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
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
        Register
      </button>
    </div>

            {error && <p className={css.error}>{ error}</p>}
  </form>
</main>
)
}