import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../pages/cultureInfo/CultureInfo.module.css';

function formatDate(date) {
  const writtenDate = new Date(date);
  let month = '' + (writtenDate?.getMonth() + 1);
  let day = '' + writtenDate?.getDate();
  const year = writtenDate?.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('.');
}

function timer(targetDate) {
  const now = new Date();
  const endDate = new Date(targetDate);
  const timeRemaining = endDate - now;

  if (timeRemaining <= 0) {
    return "얼리버드 마감";
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return `${days} 일 ${hours} 시간 ${minutes} 분 ${seconds} 초`;
}

export default function EarlySlideItem({ item }) {
  const targetTime = new Date(item.saleEndDate).getTime();
  const title = item?.ebTitle.replaceAll('&lt;', `<`).replaceAll('&gt;', `>`).replaceAll("&#39;", "'");

  const [timeLeft, setTimeLeft] = useState(timer(targetTime));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = timer(targetTime);
      setTimeLeft(newTimeLeft);

      // 타이머가 종료되면 interval을 정리합니다.
      if (newTimeLeft === "얼리버드 마감") {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  return (
    <div className={styles.early_slide_list}>
      <Link to={`/cultureinfo/detail/${item.earlyBirdCode}`} state={{ earlyCheck: true }} className={styles.flex_start}>
        <div className={styles.early_img}>
          <img src={item.poster === null ? `${process.env.PUBLIC_URL}/images/commons/logo.png` : item.poster} alt="early bird info" />
        </div>
        <div className={styles.early_txt_box}>
          <p className={styles.early_tit}>{title}</p>
          <p className={styles.early_date}>{formatDate(item.saleStartDate)}&nbsp;~&nbsp;{formatDate(item.saleEndDate)}</p>
          <p className={styles.early_place}>{item.place}</p>
          <span className={styles.left_time_mark}>남은시간</span>
          <p className={styles.time_left}>{timeLeft}</p>
          <p className={styles.early_end_date}>얼리버드 : {formatDate(item.saleEndDate)}&nbsp;<span>24:00</span>까지</p>
        </div>
      </Link>
    </div>
  );
}
