import React, {Component} from 'react';

//CSS
import './post-list-item.css';


export default class PostListItem extends Component {

    render() {

        const {label, onDelete, onToggleImportant, onToggleLike, important, like} = this.props;

        let classNames = `app-list-item d-flex justify-content-between`;

        if (important) {
            classNames += ` important`;
        }

        if (like) {
            classNames += ` like`;
        }

        return(
        <div className={classNames}>
            <span onClick={onToggleLike} className="app-list-item-label">
                {label}
            </span>
            <div className="d-flex justify-content-center align-items-center">
                <button onClick={onToggleImportant} className="btn-star btn-sm">
                    <i className="far fa-star"></i>
                </button>

                <button 
                className="btn-trash btn-sm"
                onClick={onDelete}
                >
                    <i className="far fa-trash-o"></i>
                </button>

                <i className="far fa-heart"></i>
            </div>
        </div>  
        );
    }
}