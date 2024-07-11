import style from './NoticeDetail.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { noticeAPI, noticeFileAPI } from '../../apis/serviceCenter/NoticeDetailAPI';

function NoticeDetailPage() {

    const [notice, setNotice] = useState({});
    const [file, setFile] = useState(null);
    const { code } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const mainNotice = await noticeAPI(code);
                setNotice(mainNotice);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchData();
    }, [code]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fileDTO = await noticeFileAPI(code);
                setFile(fileDTO);
            } catch (error) {
                console.error('파일 불러오기 실패.', error);
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
                <hr className={style.hrLine} />
                {/* <img src={`http://localhost:8080/notice/image?name=${file.name}`} alt="preview image" /> */}
            </div>
        </div>
    );
}

export default NoticeDetailPage;
