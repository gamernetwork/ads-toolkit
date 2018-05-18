import React from 'react';

const CampaignCard = (props) => {
    console.log(props.select)
    this.selectCampaign = props.select.bind(this);
    return (
        <div onClick={() => this.selectCampaign(props.index)} className="campaign-card">
            <h3>{props.title}</h3>
        </div>
    );
}

export default CampaignCard;