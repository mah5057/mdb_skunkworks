import React from 'react';
import axios from 'axios';
import Table from './table.component';

const { API_KEY } = process.env
const API_URL = 'http://localhost:5000/'

export default class SearchPage extends React.Component {

    state = {
        query: '',
        severity: '',
        system: '',
        results: []
    };

    getInfo = () => {
        console.log("Search for: " + this.state.query + "\nSeverity: " + this.state.severity + "\nSystem: " + this.state.system)
        // can use this.search.query here
        axios.get(`${API_URL}`)
            .then(({ data }) => {
                this.setState({
                    results: data
                })
            })
    };

    doSearch = () => {
        this.getInfo();
    };

    handleSearchStringInputChange = () => {
        this.setState({
            query: this.search.value
        })
    };

    handleSeverityInputChange = (event) => {
        this.setState({
            severity: event.target.value
        })
    };

    handleSystemInputChange = (event) => {
        this.setState({
            system: event.target.value
        })
    };

    render() {
        return (
            <form>
                <input placeholder="Search for..." ref={input => this.search = input} onChange={this.handleSearchStringInputChange}/>
                <select onChange={this.handleSeverityInputChange}>
                    <option defaultValue="">All Severity Levels</option>
                    <option value="I">I</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="W">W</option>
                    <option value="D">D</option>
                </select>
                <select onChange={this.handleSystemInputChange}>
                    <option defaultValue="">All Components</option>
                    <option value="QUERY">QUERY</option>
                    <option value="ACCESS">ACCESS</option>
                    <option value="COMMAND">COMMAND</option>
                    <option value="CONTROL">CONTROL</option>
                    <option value="FTDC">FTDC</option>
                    <option value="GEO">GEO</option>
                    <option value="NETWORK">NETWORK</option>
                    <option value="REPL">REPL</option>
                    <option value="REPL_HB">REPL_HB</option>
                    <option value="ROLLBACK">ROLLBACK</option>
                    <option value="SHARDING">SHARDING</option>
                    <option value="STORAGE">STORAGE</option>
                    <option value="RECOVERY">RECOVERY</option>
                    <option value="JOURNAL">JOURNAL</option>
                    <option value="TXN">TXN</option>
                    <option value="WRITE">WRITE</option>
                    <option value="INDEX">INDEX</option>
                </select>
                <button type="button" onClick={this.doSearch.bind(this)}>Search</button>
                <Table data={this.state.results}/>
            </form>
        );
    }
}