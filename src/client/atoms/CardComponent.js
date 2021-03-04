import React from 'react';

// TODO : Common Card Component.
const CardComponent = ({ title, mission, launchYear, isSuccessLaunch, isSuccessLanding, imgUrl, ...props }) => {
    return (
        <div className="item" tabIndex="0">
            <div className="img-container" style={{ "background": `url(${imgUrl}) no-repeat center center`, "backgroundSize": "contain", "backgroundColor": "#ebeaea" }}></div>
            <p><strong>{title}</strong></p>
            <p><strong className="heading">Mission Id : </strong> {mission && mission.length === 0 ? '---' : ''}</p>
            {
                mission && mission.length > 0 && <ul>
                    {mission.map((x, i) => <li key={i}>{x}</li>)}
                </ul>
            }
            <p><strong className="heading">Launch Year :</strong> {launchYear} </p>
            <p><strong className="heading">Successful Launch :</strong> {isSuccessLaunch}</p>
            <p><strong className="heading">Successful Landing :</strong> {isSuccessLanding}</p>
        </div >
    )
}

export default CardComponent;