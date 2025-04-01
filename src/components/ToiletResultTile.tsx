import React from 'react';

const ToiletResultTile = ({toilet}) => {
    return (
        <div className={"tileContainer fontBodyMedium"}>
            <div className="title fontHeadlineSmall">{toilet.name} · {toilet.distance}km</div>
            <div className="rating">{toilet.rating} ({toilet.ratingCount})</div>
            <div className="typeAddress">
                <span>{toilet.type}</span> · <span>{toilet.address}</span>
            </div>
        </div>
    );
};

export default ToiletResultTile;