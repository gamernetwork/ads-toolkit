import React, { Component } from 'react';
import UnitCreator from './UnitCreator';

export default class CampaignCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            unitCount: null,
            items: [],
            units: [],
            selectedCampaign: this.props.selectedCampaign
        }
        this.addCampaign = this.props.onAddCampaign.bind(this);
        this.createCampaignObject = this.createCampaignObject.bind(this);
        this.addUnitCreator = this.addUnitCreator.bind(this);
        this.saveUnit = this.saveUnit.bind(this);
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
            items: [...this.state.items, <UnitCreator key={this.state.unitCount} onSave={this.saveUnit}/>]
        });
    }
    saveUnit(object) {
        this.setState({
            units: [...this.state.units, object]
        });
        console.log(object)
    }
    render() {  
        return(
            <div className="campaign-creator container">
                <div className="col-lg-4">
                    { (this.state.selectedCampaign === null) ? <h2>Add New Campaign</h2> : <h2>Edit Campaign</h2> }
                    <form>
                        <label>
                            Title
                            <br/>
                            <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} name="title"/>
                        </label>
                        <br/>
                        <p onClick={this.addUnitCreator}>Add Unit</p>
                        <p>Add Takeover</p>
                        <ul className="list-group">
                            {this.state.items}
                        </ul>
                        <input type="submit" value="Submit" onClick={(e) => this.createCampaignObject(e)} />
                    </form>
                </div>
            </div>
        );
    }
}