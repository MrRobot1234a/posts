import React, {Component} from 'react';

//CSS
import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ``
        };
        
        
    }

    onChangeInput = (e) => {
        this.setState(({text}) => ({
            text: e.target.value
        }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text !== ``) {
            this.props.onAddPost(this.state.text);
            this.setState({
                text: ``
            });
        }
    }

    render() {
        
        return(
            <form className="bottom-panel d-flex"
            onSubmit={this.onSubmit}
            >
                <input
                    type="text"
                    placeholder="О чём вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onChangeInput}
                    value={this.state.text}
                />
    
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                >Добавить</button>
            </form>
        );
    }
};