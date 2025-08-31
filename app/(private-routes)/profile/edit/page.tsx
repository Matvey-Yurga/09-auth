"use client";
import Image from "next/image"
import css from "./EditProfilePage.module.css"
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { patchMe } from "@/lib/api/clientApi";
const EditProfilePage = () => {
    const router = useRouter()
    const user = useAuthStore(state => state.user)
    const setUser = useAuthStore(state => state.setUser)
    if (!user) return null;
  const handleSubmit = async (formData: FormData) => {
    const newUsername = String(formData.get("username")).trim();
    await patchMe({ username: newUsername });
    setUser({
      ...user,
      username: newUsername
    });
    router.push("/profile");
  }
    const handleCancel = () => {
        router.push("/profile")
    }
    return (<main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={user.avatar}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form action={handleSubmit} className={css.profileInfo}>
      <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username:</label>
        <input id="username"
              type="text"
              name="username"
                        className={css.input}
                        defaultValue={user.username}
        />
      </div>

      <p>Email: {user.email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button onClick={handleCancel} type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>
)
}
export default EditProfilePage;