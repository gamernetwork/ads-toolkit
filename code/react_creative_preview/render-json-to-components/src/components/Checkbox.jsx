import React, { Component } from 'react';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            title: this.props.title,
            format: this.props.format
        }
    }
    // Keep checked value tied to state
    // Format is only defined for a standalone creative, so is used to check what to pass to returnFunc (returnStateFromCheckbox in campaignCard)
    handleChange(e) {
        const target = e.target;
        const val = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: val
        }, () => {
            if(this.props.format !== undefined) {
                this.props.returnFunc('creative', this.props.returnObj, this.state.isChecked)
            } else {
                this.props.returnFunc('takeover', this.props.returnObj, this.state.isChecked)
            }
        });
    }
    render() {
        const checkBox = this.props.format !== undefined ? (
            <React.Fragment><strong>{this.props.title} : </strong> {this.props.format}</React.Fragment>
        ) : (
            <strong>{this.props.title}</strong> 
        )
        return (
            <div className="control">
                <label className="checkbox">
                    <input onChange={(e) => this.handleChange(e)}
                        type="checkbox"
                        checked={this.state.isChecked}
                        name="isChecked"
                    />
                    {checkBox}
                </label>
            </div>
        );
    }
}