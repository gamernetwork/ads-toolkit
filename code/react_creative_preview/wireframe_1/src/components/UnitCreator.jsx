import React, { Component } from 'react';

export default class UnitCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitType: '300x600',
            title: '',
            link: '',
            isSaved: false,
            index: this.props.index
        }
        console.log(this.state.index)
    }
    handleInputChange(e) {
        e.preventDefault();
        const KEY = e.target.name;
        const VAL = e.target.value;
        this.setState({
            [KEY] : VAL
        });
    }
    returnUnit(e) {
        e.preventDefault();
        const unit = {
            unitType: this.state.unitType,
            title: this.state.title,
            link: this.state.link 
        }
        this.setState({
            isSaved: true
        })
    }
    render() {
        return(
            <li className="list-group-item">
                <label>
                    Unit Type
                    <select name="unitType" onChange={(e) => this.handleInputChange(e)}>
                        <option value="300x600">300x600</option>
                        <option value="300x1050">300x1050</option>
                        <option value="300x250">300x250</option>
                        <option value="970x250">970x250</option>
                        <option value="728x90">728x90</option>
                        <option value="160x600">160x600</option>
                    </select>
                </label>
                <label>
                    Title
                    <input type="text" value={this.state.value} onChange={(e) => this.handleInputChange(e)} name="title"/>
                </label>
                <label>
                    Link
                    <input type="text" value={this.state.link} onChange={(e) => this.handleInputChange(e)} name="link"/>
                </label>
                <br/>
            </li>
        );
    }
}
