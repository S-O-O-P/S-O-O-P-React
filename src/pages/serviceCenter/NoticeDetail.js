import style from './NoticeDetail.module.css'

function NoticeDetailPage() {
    return (

        <div className={style.wrapper}>
            <div className={style.contentBox}>
                <p className={style.pageTitle}>1:1 문의 접수</p>

                <p className={style.noticeTitle}>공지사항 제목</p>
                <p className={style.noticeDate}>2024.06.20</p>
                <hr className={style.hrLine}/>
                <p className={style.noticeContext}>공지사항 내용</p>
                <hr className={style.hrLine}/>
            </div>
        </div>
    )
}

export default NoticeDetailPage;