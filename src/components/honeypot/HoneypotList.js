import './HoneypotList.css';

function HoneypotList() {
    return (
        <div className="honeypot-list-container">
            <div className='one-honeypot-index'>
                <div className='honeypot-index-poster'>
                <img src={`${process.env.PUBLIC_URL}/images/honeypot/poster_test.jpg`} alt="포스터이미지" />
                    <hr className='honeypot-dashed'/>
                </div>
                <div className='honeypot-index-info'>
                    <div className='top-info'>
                        <div className='region-info'>서울</div>
                        <div className='category-info'>전시</div>
                        <div className='honeypot-status'>모집중</div>
                    </div>
                    <p className='honeypot-title'>서양미술 800년 전 같이 가실 분 :-D </p>
                    <div className='honeypot-schedule'>
                        <div>일정</div>
                        <p className='honeypot-date'>2024.07.20 (토)</p>
                        <p className='total-member'>참여인원 1 / 2</p>
                    </div>
                    <p className='end-date'>2024.07.19 까지 모집해요</p>
                </div>
            </div>
        </div>
    )
}
export default HoneypotList;