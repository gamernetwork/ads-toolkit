import React, { Component } from 'react';

export default class UnitCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitType: null,
            title: '',
            link: ''
        }
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
            <li className="list-group-item">
                <label>
                    Unit Type
                    <select name="adFormat">
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
                    <input type="text" value={this.state.title} onChange={(e) => this.handleInputChange(e)} name="title"/>
                </label>
                <label>
                    Link
                    <input type="text" value={this.state.link} onChange={(e) => this.handleInputChange(e)} name="link"/>
                </label>
                <button>Save</button>
            </li>
        );
    }
}
