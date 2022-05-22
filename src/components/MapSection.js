import React from 'react'
import '../styles/mapSection.css';
const MapSection = () => {
    return (
        <div className="wrapper-global map-wrapper">
            <iframe title="Google Map Our Store" src="http://maps.google.com/maps?q=11.561880001775203,104.85298717093411&z=15&output=embed" height="450" style={{border: '0'}} allowFullScreen={true} loading="lazy"></iframe>
        </div>
    )
}

export default MapSection
