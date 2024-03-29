import React from 'react';
import axios from 'axios';
import logo from '../images/logo.png'
import Table from './table.component';

// const API_URL = 'http://2ca912fc.ngrok.io/logs'
const API_URL = 'http://localhost:5000/'

export default class SearchBar extends React.Component {

    state = {
        query: '',
        severity: '',
        component: '',
        hostname: '',
        results: [],
        hostnames: []
    };

    componentDidMount() {
        this.doSearch();
    }

    fetchData() {
        let params = {
            params: {
                'fts-query': this.state.query,
                severity: this.state.severity,
                component: this.state.component,
                hostname: this.state.hostname
            }
        };
        console.dir(params);
        axios.get(`${API_URL}`, params)
            .then(({ data }) => {
                this.setState({
                    results: data.results,
                    hostnames: data.hostnames
                })
            })
    };

    doSearch = () => {
        this.fetchData();
    };

    getHostnameOptions = () => {
        const names = [];
        for(const hostname of this.state.hostnames) {
            names.push(<option value={hostname}>{hostname}</option>);
        }
        return names;
    }

    handleSearchQueryInputChange = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    handleSeverityInputChange = (event) => {
        this.setState({
            severity: event.target.value
        })
        // this.fetchData();
    };

    handleComponentInputChange = (event) => {
        this.setState({
            component: event.target.value
        })
        // this.fetchData();
    };

    handleHostnameInputChange = (event) => {
        this.setState({
            hostname: event.target.value
        })
        // this.fetchData();
    }

    render() {
        return (
            <div>
                <div className="searchBar">
                    <div className="logo">
                        <img src={logo}/>
                    </div>
                    <div className="searchLabel">
                        Search Terms:
                    </div>
                    <form>
                        <input size="40" type="text" placeholder="" ref={input => this.search = input} onChange={this.handleSearchQueryInputChange}/>
                        <div className="searchLabel">
                            Severity Level:
                        </div>
                        <select onChange={this.handleSeverityInputChange}>
                            <option value='' defaultValue=''>All Severity Levels</option>
                            <option value="I">I</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                            <option value="W">W</option>
                            <option value="D">D</option>
                        </select>
                        <div className="searchLabel">
                            Component:
                        </div>
                        <select onChange={this.handleComponentInputChange}>
                            <option value='' defaultValue=''>All Components</option>
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
                        <div className="searchLabel">
                            Host:
                        </div>
                        <select onChange={this.handleHostnameInputChange}>
                            <option value='' defaultValue=''>All Hosts</option>
                            {this.getHostnameOptions()}
                        </select>
                        <button type="button" onClick={this.doSearch.bind(this)}>Search</button>
                    </form>
                </div>
                <Table data={this.state}/>
            </div>

        );
    }
}