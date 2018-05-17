import React, { Component } from 'react';

export default class CampaignCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.addCampaign = this.props.onAddCampaign.bind(this);
        this.createCampaignObject = this.createCampaignObject.bind(this);
    }
    createCampaignObject(e) {
        e.preventDefault();
        const campaign = {
            title: this.state.title
        }
        this.addCampaign(campaign)
    }
    handleInputChange(e) {
        e.preventDefault();
        const KEY = e.target.name;
        const VAL = e.target.value;
        this.setState({
            [KEY] : VAL
        });
    }
    render() {
        return(
            <div>
                <h2>Add New Campaign</h2>
                <form>
                    <label>
                        Title
                        <br/>
                        <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} name="title"/>
                    </label>
                    <br/>
                    <input type="submit" value="Submit" onClick={(e) => this.createCampaignObject(e)} />
                </form>
            </div>
        );
    }
}