import React, { Component } from 'react';
import UnitCreator from './UnitCreator';

export default class CampaignCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            unitCount: null,
            items: []
        }
        this.addCampaign = this.props.onAddCampaign.bind(this);
        this.createCampaignObject = this.createCampaignObject.bind(this);
        this.addUnitCreator = this.addUnitCreator.bind(this);
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
    addUnitCreator() {
        this.setState({
            unitCount: this.state.unitCount + 1,
            items: [...this.state.items, <UnitCreator key={this.state.unitCount}/>]
        });
    }
    render() {
        return(
            <div className="campaign-creator">
                <h2>Add New Campaign</h2>
                <form>
                    <label>
                        Title
                        <br/>
                        <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} name="title"/>
                    </label>
                    <br/>
                    <i className="add-unit far fa-plus-square" onClick={this.addUnitCreator}><p>Add New Unit</p></i>
                    <br/>
                    <i className="add-unit far fa-plus-square" onClick={this.addUnitCreator}><p>Add New Takeover</p></i>
                    <br/>
                    {this.state.items}
                    <input type="submit" value="Submit" onClick={(e) => this.createCampaignObject(e)} />
                </form>
            </div>
        );
    }
}