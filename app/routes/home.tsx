import { Link } from "react-router";

import styles from './home.module.scss'

export function meta() {
  return [
    { title: "Sapper" },
    { name: "description", content: "Добро пожаловать в Сапёр!" },
  ];
}

export default function Home() {

  return (
    <div className={styles.home}>
      <h1>Выберите уровень сложности</h1>


      <div className={styles.levels}>
        <Link to="/sapper/easy" className={styles.levelCard}>
          <h2>Легкий</h2>
          <p>8x8</p>
        </Link>

        <Link to="/sapper/medium" className={styles.levelCard}>
          <h2>Средний</h2>
          <p>16x16</p>
        </Link>

        <Link to="/sapper/hard" className={styles.levelCard}>
          <h2>Тяжелый</h2>
          <p>32x16</p>
        </Link>

        <Link to="/sapper/custom" className={styles.levelCard}>
          <h2>Свои настройки</h2>
          <p>Выбери параметры</p>
        </Link>

        <Link to="/sapper/table" className={styles.levelCard}>
          <h2>Таблица рекордов</h2>
        </Link>
      </div>
    </div>
  )
}
