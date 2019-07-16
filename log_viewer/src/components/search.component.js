import React from 'react';
import axios from 'axios';
import Table from './table.component';

const { API_KEY } = process.env
const API_URL = 'http://localhost:5000/'

export default class SearchPage extends React.Component {

    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        // can use this.search.query here
        axios.get(`${API_URL}`)
            .then(({ data }) => {
                this.setState({
                    results: data
                })
            })
    }

    doSearch = () => {
        this.getInfo();
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        })
    }

    render() {
        return (
            <form>
                <input placeholder="Search for..." ref={input => this.search = input} onChange={this.handleInputChange}/>
                <button type="button" onClick={this.doSearch.bind(this)}>Search</button>
                <Table data={this.state.results}/>
            </form>
        );
    }
}