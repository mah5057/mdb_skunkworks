import React, { Component } from 'react';
import Highlighter from "react-highlight-words";

class Table extends Component {
    constructor(props) {
        super(props);
    }

    renderTableData() {

        return this.props.data.results.map((r, index) => {
            const { date, severity, component, hostname, details } = r;
            let detailsHighlighted = <Highlighter
                                        highlightClassName="YourHighlightClass"
                                        searchWords={this.props.data.query.split(" ")}
                                        autoEscape={true}
                                        textToHighlight={details} />;

            return (
                <tr key={index}>
                    <td>{date}</td>
                    <td>{severity}</td>
                    <td>{component}</td>
                    <td>{hostname}</td>
                    <td>{detailsHighlighted}</td>
                </tr>
        )
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // don't re-render until results change
        if(this.props.data.results === nextProps.data.results){
            return false;
        }
        return true;
    }

    renderTableHeader() {
        return (<tr>
                <th>date</th>
                <th>severity</th>
                <th>component</th>
                <th>host</th>
                <th>details</th>
               </tr>)
    }

    render() {
        let tableHeader = '';
        if(this.renderTableData().length !== 0) {
            tableHeader = this.renderTableHeader();
        } else {
            tableHeader = '';
        }
        return (
                <div>
                    <div>
                        <table id='data'>
                            <tbody>{tableHeader}{this.renderTableData()}</tbody>
                        </table>
                    </div>
                    <div>
                        {this.props.data.results.length} results...
                    </div>
                </div>
                )
    }
}

export default Table