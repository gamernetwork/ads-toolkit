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
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.items)
        this.setState({
            title: nextProps.title,
            units: nextProps.units,
            unitCount: nextProps.unitCount,
            items: nextProps.items
        }, function(){
            console.log(nextProps.items)
        })  
    }
    createCampaignObject(e) {
        e.preventDefault();
        const campaign = {
            title: this.state.title,
            units: this.state.units,
            items: this.state.items,
            unitCount: this.state.unitCount
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
            items: [...this.state.items, <UnitCreator index={this.state.items.length} key={this.state.title}/>]
        });
    }
    render() {  
        return(
            <div className="campaign-creator">
                <div>
                    { (this.state.selectedCampaign === null) ? <h2>Add New Campaign</h2> : <h2>Edit Campaign</h2> }
                    <form>
                        <h2>{this.state.title}</h2>
                        <label>
                            Title
                            <br/>
                            <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} name="title"/>
                        </label>
                        <br/>
                        <p onClick={this.addUnitCreator}>Add Unit</p>
                        <ul className="list-group">
                            {this.state.items}
                        </ul>
                        <input type="submit" value="Update Campaign" onClick={(e) => this.createCampaignObject(e)} />
                    </form>
                </div>
            </div>
        );
    }
}