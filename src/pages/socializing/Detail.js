import { useLocation } from 'react-router-dom';

const Detail = () => {
    const images = require.context('../../../public/images/socializing',false, /\.(png|jpe?g|svg)$/)

    const getImage = (path) => {
        try{
            return images(`./${path}`)
        } catch (err){
            return null
        }
    }

    const location = useLocation()
    const { honey } = location.state

    return (
        <div style={{marginTop:'200px'}}>
        <h1>{honey.honeyTitle}</h1>
        <img src={getImage(honey.ticket.ticketPoster)} alt='티켓 포스터' />
        <p>{honey.honeyContent}</p>
        {/* 추가 정보 표시 */}
        </div>
    );
};

export default Detail;