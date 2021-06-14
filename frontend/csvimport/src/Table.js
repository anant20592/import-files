import Table from 'react-bootstrap/Table';

function TableComponent(props) {
    return (
        <div>
            {props.fileList.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name<i class="fa fa-fw fa-sort-up" style={{ position: 'absolute' }} onClick={() => props.sort('file_name', 'asc')}></i><i class="fa fa-fw fa-sort-down" onClick={() => props.sort('file_name', 'desc')}></i></th>
                            <th>Date uploaded<i class="fa fa-fw fa-sort-up" style={{ position: 'absolute' }} onClick={() => props.sort('date_uploaded', 'asc')}></i><i class="fa fa-fw fa-sort-down" onClick={() => props.sort('date_uploaded', 'desc')}></i></th>
                            <th>Status<i class="fa fa-fw fa-sort-up" style={{ position: 'absolute' }} onClick={() => props.sort('status', 'asc')}></i><i class="fa fa-fw fa-sort-down" onClick={() => props.sort('status', 'desc')}></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.fileList.map((file, index) => (
                            <tr key={file._id}>
                                <td>{index + 1}</td>
                                <td>{file.file_name}</td>
                                <td>{file.date_uploaded}</td>
                                <td>{props.status[file._id] ? props.status[file._id] : file.status}</td>
                                <td>
                                    {file.file_content ? file.file_content.length > 0 ? (
                                        file.file_content.map(data => (
                                            <div key={data._id}>{data._id}  {data.total}</div>
                                        ))
                                    ) : <button onClick={() => props.getFileContent(file._id)}>View Data</button> : <button>View Data</button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : null}
        </div>

    )
}

export default TableComponent;