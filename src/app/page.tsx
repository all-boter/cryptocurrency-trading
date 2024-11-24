import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        {/* Navbar */}
        <nav className="flex items-center justify-between h-[68px] text-white">
          <div className="ml-5">
            {/* <Logo /> */}
            <img className="h-10" src="/logo2.svg" alt="logo" />
          </div>
          <div className="mr-5">
            {/* <I18n /> */}
            I18n
          </div>
        </nav>

        {/* Main content */}
        <div className="flex flex-col items-center min-h-[70vh]">
          {/* Slogan 1 */}
          <div className="mt-10 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 font-extrabold text-[48px] sm:text-[100px]">
            {/* {t('slogan1')} */}
            slogan1
          </div>

          {/* Slogan 2 */}
          <div className="mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 font-extrabold text-[48px] sm:text-[100px]">
            {/* {t('slogan2')} */}
            slogan2
          </div>

          {/* Slogan 3 */}
          <div className="w-4/5 text-center text-gray-300 text-lg sm:text-xl">
            {/* {t('slogan3')} */}
            slogan3
          </div>

          {/* Buttons */}
          <div className="flex mt-16">
            {/* <HomeBtns /> */}
            HomeBtns
          </div>
        </div>
      </div>
    </main>
  );
}
