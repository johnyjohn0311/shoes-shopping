import Header from "./components/header";
import account from "../css/account.module.css";

export default function Account() {
  return (
    <div className="container">
      <Header />
      <main className={account.main} id="main">
        <div className={account.userProfile}>
          <h1 className={account.profile__title}>Your Profile</h1>
          <div className={account.userDetails}>
            <section className={account.avatarName}>
              <div className={account.avatar}>
                <img className={account.avatar__img} src="" alt="avatar"/>
              </div>
              <div className={account.name}>
                <h2 className={account.user__name}>YOUR NAME</h2>
                <button className={account.nameBtn}>
                  <img className={account.edit__icon} src="../images/icons/edit.png" alt="edit"/>
                </button>
              </div>
            </section>

            <section className={account.userInfor}>
              <form className={account.userForm}>
                <label for="email" className={account.form__label}>Email</label>
                <input className={account.form__input} id="email" type="email" placeholder="123@gmail.com"/>
                <label for="numbers" className={account.form__label}>Phone numbers</label>
                <input className={account.form__input} id="numbers" type="tel" placeholder="0123 456 789"/>
                <label for="birth" className={account.form__label}>Birthday</label>
                <input className={account.form__input} id="birth" type="date"/>
                <label for="address" className={account.form__label}>Address</label>
                <input className={account.form__input} id="address" type="text" placeholder="address"/>
                <button className={account.submitBtn}>Save</button>
              </form>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}