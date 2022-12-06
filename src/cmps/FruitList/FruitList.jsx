import { useEffect, useState } from 'react'
import { fruitService } from '../../services/fruitService'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import './FruitList.scss'

export const FruitList = (props) => {
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
        fruitService.remove(id)


    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newFruit = { title: document.getElementById('addfruit').value, price:document.getElementById('add-fruit-price').value  }
        if (newFruit.title.length === 0 || newFruit.price.length === 0) return
        fruitService.save(newFruit).then(res => {
            data.push(res)
            setData([...data])
        })
        document.querySelector('.add-fruit').value = ''
    }

    const handleSearch = (e) => {
        fruitService.query(e.target.value)
            .then(fruits => {
                setData(fruits)
            })
            .catch(err => console.log('Error:', err))
    }






    return (
        <div className='fruit-list'>
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
                            <TableRow
                                key={user._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell className='link' component="th" scope="row">
                                    {user.title}
                                </TableCell>
                                <TableCell align="center">{user.price}</TableCell>
                                <TableCell align="center"><Button variant="outlined" startIcon={<EditIcon />} onClick={() => navigate(`/fruit/${user._id}`)}>EDIT</Button></TableCell>
                                <TableCell align="center"><Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => delUser(user._id)}>DELETE</Button></TableCell>
                            </TableRow>

                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {addUserModal ?
                <form onSubmit={handleSubmit} className='item add-user'>
                    <TextField type="text" className='add-fruit' id='addfruit' label='Enter A Name' > </TextField>
                    <TextField type="number" className='add-fruit' id='add-fruit-price' label='Enter A Price' > </TextField>
                    <Button variant="contained" type='submit' color="success"> Add </Button>
                    <Button variant="outlined" color="error" onClick={(e) => { setUserModal(!addUserModal); e.preventDefault();  }}>Close</Button>
                </form>
                :
                <Button variant="contained" onClick={() => setUserModal(!addUserModal)} className='item'>Add</Button>}

        </div>
    )
}
