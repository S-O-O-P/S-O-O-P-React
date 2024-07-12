import style from './NoticeDetail.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNoticeData } from '../../apis/serviceCenter/NoticeDetailAPI';

function NoticeDetailPage() {

    const [notice, setNotice] = useState({});
    const [file, setFile] = useState(null);
    const { code } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const mainNotice = await fetchNoticeData(code);
                setNotice(mainNotice.notice);
                setFile(mainNotice.file.name);
                console.log(notice.title);
                console.log(file);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchData();
    }, [code]);

    return (
        <div className={style.wrapper}>
            <div className={style.contentBox}>
                <p className={style.pageTitle}>공지사항</p>
                <p className={style.noticeTitle}>{notice.title}</p>
                <p className={style.noticeDate}>{notice.regDate}</p>
                <hr className={style.hrLine} />
                <p className={style.noticeContext}>{notice.content}</p>
                {file ? (<img src={`${file}`} className={style.noticeImg} alt="사진" />) : ""}
                <hr className={style.hrLine} />

            </div>
        </div>
    );
}

export default NoticeDetailPage;
