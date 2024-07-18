import style from './NoticeDetail.module.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNoticeData } from '../../apis/serviceCenter/NoticeDetailAPI';

function NoticeDetailPage() {

    const navigate = useNavigate();
    const [notice, setNotice] = useState({});
    const [file, setFile] = useState(null);
    const { code } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const mainNotice = await fetchNoticeData(code);
                setNotice(mainNotice.notice);
                setFile(mainNotice.file.name);
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
                <div className={style.noticeImg}>
                    {file ? (<img src={`${file}`} alt="사진" />) : ""}
                </div>
                <hr className={style.hrLine} />
                <button type='button' className={style.cancelButton} onClick={() => { navigate("/notice") }}>목록으로</button>

            </div>
        </div>
    );
}

export default NoticeDetailPage;
