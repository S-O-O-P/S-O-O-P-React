import axios from 'axios';
import style from './NoticeDetail.module.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NoticeDetailPage() {

    const [notice, setNotice] = useState({});

    const { code } = useParams();

    useEffect(() => {
        async function fetchNotice() {
            try {

                const res = await axios.get(`http://localhost:8081/notice/${code}`);

                console.log(res)
                setNotice(res.data.mainNoticeList);
                console.log(res.data.mainNoticeList);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchNotice();
    }, []);

    const [file, setFile] = useState(null);
    useEffect(() => {
        async function fetchNotice() {
            try {
                const id = code;
                const res = await axios.get(`http://localhost:8080/notice/${id}`);
                setFile(res.data.fileDTO);
                console.log(res.data.fileDTO);
            } catch (error) {
                console.error('공지사항 불러오기 실패.', error);
            }
        }
        fetchNotice();
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
    )
}

export default NoticeDetailPage;