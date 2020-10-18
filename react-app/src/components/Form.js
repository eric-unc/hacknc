import React, {Component} from 'react';
import '../App.css';

const suggestedSong = "Song of the Sea";
const defaultMinutes = "3";

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            minutes: defaultMinutes
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.fileInput = React.createRef();
    }

    isInputValid(){
        // this is hacky af but works lol
        let ret = this.state.name.length >= 4 &&
            this.state.minutes >= 1 && this.state.minutes <= 200 && this.state.minutes.match(/^\d{1,3}$/);

        console.log("Name: " + this.state.name)
        console.log("Length: " + this.state.name.length)
        console.log("over 4: " + (this.state.name.length >= 4));
        console.log("mins in range: " + (this.state.minutes >= 1 && this.state.minutes <= 200));
        console.log("match: " + this.state.minutes.match(/^\d{1,3}$/))
        console.log("checked: " + ret);
        return ret;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log("" + name + " -> " + value);

        /*if(this.isInputValid())
            document.getElementById("subForm");*/
    }

    handleSubmit(event) {
        // TODO: call api
        event.preventDefault();
        console.log(`Selected file - ${this.fileInput.current.files[0].name}`);
    }

    render(){
        return (
            <section className="section">
                <div className="container">
                    <form className="box" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                    placeholder={suggestedSong}/>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Minutes (1-200)</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="minutes"
                                    value={this.state.minutes}
                                    onChange={this.handleInputChange}
                                    /*placeholder={defaultMinutes}*//>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Input</label>
                            <div className="file is-primary">
                                <input type="file" ref={this.fileInput}/>
                            </div>
                        </div>

                        <div class="field">
                            <div className="control">
                                <button className="button is-link" type="submit" disabled={!this.isInputValid()}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}