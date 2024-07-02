import React from 'react'
import PropTypes from 'prop-types'

const Table = props => {
    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                For more information about DataTables, please visit the <a target="_blank"
                    href="https://datatables.net">official DataTables documentation</a>.</p>

            {/* <!-- DataTales Example --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3" >
                    <h6 className="m-0 font-weight-bold text-primary">DataTables Example</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr >
                                    {
                                        Array.isArray(props.thead) && props.thead.length > 0 &&
                                        props.thead.map((data, index) =>
                                            <th key={index} width={'5%'} style={{width : '5%'}}>{data.thname}</th>
                                        )
                                    }

                                </tr>
                            </thead>
                            <tbody >
                        {
                            Array.isArray(props.tbody) &&
                                props.tbody.length > 0 ?
                                props.tbody.map((row, index) =>
                                    <tr key={index}
                                        
                                        onClick={props.options ? () => props.makeOption(row) : null}
                                        
                                    >
                                        {
                                            
                                            Object.values(row).map((data, index) =>
                                                <td key={index}>{data}</td>
                                            )

                                        }
                                    </tr>

                                )
                                : <tr><td>No data Found</td>

                                </tr>

                        }
                    </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

Table.propTypes = {}

export default Table