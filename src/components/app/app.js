import React, {Component} from 'react';

//Components
import AppHeader from './../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

//CSS
import './app.css';
import '../search-panel/search-panel.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Going to learn React", important: false, like: false, id: 1},
                {label: "That is so good", important: false, like: false, id: 2},
                {label: "I need a break...", important: false, like: false, id: 3}
            ],

            term: ``,
            filter: `all`
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);
            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const newPost = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newPost];
            return{
                data: newArr
            }
        });
        
    }

    onToggleImportant = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    onToggleLike =(id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    searchPost = (posts, valueTerm) => {
        if (valueTerm === ``) {
            return posts;
        }

        return posts.filter(item => {
            return item.label.indexOf(valueTerm) > -1;
        });
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (posts, filter) => {
        if (filter === `like`) {
           return posts.filter(item => item.like);
        }

        if (filter !== `like`) {
            return posts;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return(
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}
                    />
                </div>
                <PostList 
                posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleLike={this.onToggleLike}
                />
                <PostAddForm
                onAddPost={this.addItem}
                />
            </div>
        );
    }
};