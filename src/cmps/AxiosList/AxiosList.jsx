import { useEffect, useState } from 'react'
import { toyService } from '../../services/toyService'
import { AxiosPreview } from '../AxiosPreview/AxiosPreview'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import './AxiosList.scss'

export const AxiosList = (props) => {
    const [data, setData] = useState(null)
    const [addUserModal, setUserModal] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const delUser = (id) => {
        const idx = data.findIndex(user => user._id === id)
        data.splice(idx, 1)
        setData([...data])
        toyService.remove(id)


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newToy = { title: document.getElementById('addfruit').value }
        if (newToy.title.length === 0) return
        toyService.save(newToy).then(res => {
            data.push(res)
            setData([...data])
        })
        document.querySelector('.add-toy').value = ''
    }

    const handleSearch = (e) => {
        toyService.query(e.target.value)
            .then(toys => {
                setData(toys)
            })
            .catch(err => console.log('Error:', err))
    }






    return (
        <div className='axios-list'>
            <div className="filter">
                <TextField onChange={handleSearch} label='Search Fruit...'></TextField>
            </div>
            <TableContainer className='table-component' component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map(user =>
                            // <li className='item' key={user._id}>
                            //     <AxiosPreview delUser={delUser} key={user._id} user={user}>
                            //     </AxiosPreview>
                            // </li>

                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='link' component="th" scope="row">
                                    {user.title}
                                </TableCell>
                                <TableCell align="center">{user._id}</TableCell>
                                <TableCell align="center"><Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`/todo/${user._id}`)}>EDIT</Button></TableCell>
                                <TableCell align="center"><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => delUser(user._id)}>DELETE</Button></TableCell>
                            </TableRow>

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {addUserModal ?
                <form onSubmit={handleSubmit} className='item add-user'>
                    <TextField type="text" className='add-toy' id='addfruit' label='Enter A Name' > </TextField>
                    <Button variant="contained" type='submit' color="success"> Add </Button>
                    <Button variant="outlined" color="error" onClick={(e) => { setUserModal(!addUserModal); e.preventDefault();  }}>Close</Button>
                </form>
                :
                <Button variant="contained" onClick={() => setUserModal(!addUserModal)} className='item'>Add</Button>}

        </div>
    )
}
