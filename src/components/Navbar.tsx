import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import React, { FormEvent, useRef } from "react";
import styles from "./Navbar.module.css";

interface PropsList {
  handleSubmit: (query: string | undefined) => void;
  goHome: () => void;
}

const Navbar: React.FC<PropsList> = ({ handleSubmit, goHome }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query: string | undefined = inputRef.current?.value;
    handleSubmit(query);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={goHome} data-testid="logo">
        <FontAwesomeIcon
          icon={faYoutube}
          color="red"
          className={styles.font_youtube}
        />
        <span className={styles.title}>Youtube</span>
      </div>
      <form className={styles.searchForm} onSubmit={submit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="검색"
          ref={inputRef}
        />
        <button className={styles.inputBtn}>
          <FontAwesomeIcon
            icon={faSearch}
            color="white"
            className={styles.font_search}
          />
        </button>
      </form>
      <div className={styles.logIn}>
        <FontAwesomeIcon
          icon={faUserCircle}
          color="white"
          className={styles.font_login}
        />
        <span>로그인</span>
      </div>
    </nav>
  );
};

export default Navbar;
