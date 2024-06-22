import { useEffect } from "react";
import './TopBtn.css';

export default function TopBtn(){

  // 윈도우 스크롤 최상단으로 이동
  const scrollTop = () => {
    window.scrollTo({
      top : 0,
      behavior : 'smooth'
    });
    document.querySelector(".topBtn").classList.remove("active");
  }

  useEffect(
    () => {
      const clickShowBtn = () => {

        if(window.scrollY > 500){
          document.querySelector(".topBtn").classList.add("active");          
        } else {
          document.querySelector(".topBtn").classList.remove("active");         
        }
      }
      window.addEventListener("scroll", clickShowBtn);

      return () => {
        window.removeEventListener("scroll", clickShowBtn);
      }
    },[]
  );

  return (
    <span className="topBtn" onClick={scrollTop}>TOP</span>
  );

}