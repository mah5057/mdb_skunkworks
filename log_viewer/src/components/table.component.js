import React, { Component } from 'react'

class Table extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = { //state is by default an object
            data: props.data
        }
    }

    renderTableData() {
        return this.props.data.map((r) => {
            const { _id, date, severity, system, host, details } = r //destructuring
            return (
                <tr key={_id}>
                <td>{date}</td>
                <td>{severity}</td>
                <td>{system}</td>
                <td>{host}</td>
                <td>{details}</td>
                </tr>
        )
        })
    }

    renderTableHeader() {
        return <tr>
                <th>date</th>
                <th>severity</th>
                <th>system</th>
                <th>host</th>
                <th>details</th>
               </tr>
    }

    render() {
        let tableHeader = '';
        if(this.renderTableData().length != 0) {
            tableHeader = this.renderTableHeader();
        } else {
            tableHeader = '';
        }
        return (
            <div>
                <table id='data'>
                    <tbody>
                        {tableHeader}
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
    )
    }
}

export default Table