import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../store/dataSlice'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import InfoDialog from './InfoDialog'

export default function Home() {

    let {data,loading} = useSelector((state) => state.data )
    let dispatch = useDispatch()
    const [open,setOpen] = useState(false)
    const [editOpen,setEditOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [info, setInfo] = useState(false)


    useEffect(()=> {
        const timer = setTimeout(() => {
            dispatch(getUsers(search))
        },500)
        return () => clearTimeout(timer)
    },[search])

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px'}}>
    <input style={{padding: '10px 20px'}} placeholder='Search by name...' onChange={(e)=> setSearch(e.target.value)} />
    <Button variant='contained' onClick={()=> setOpen(true)}>+ Add User</Button>
    </div>
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '30px', gap: '30px'}}>
        {loading ? <CircularProgress/> : data.map((user) => {
            return <div key={user.id} style={{border: '1px solid gray', width: '240px', padding: '25px', gap: '30px', borderRadius: '20px'}}>
                <h2>{user.name}</h2>
                <img style={{width: '150px', height: '150px', borderRadius: '50%'}} src={user.avatar} alt="" />
                <h3>{user.age}</h3>
                <h3>{user.job}</h3>
                <h4>{user.phone}</h4>
                <p>{user.status ? 'Active' : 'Inactive'}</p>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px'}}>
                <Button variant='outlined' onClick={()=> dispatch(deleteUser(user.id))}>Delete</Button>
                <Button variant='outlined' onClick={()=> setEditOpen(user)}>Edit</Button>
                <Button variant='outlined' onClick={()=> setInfo(user)}>Info</Button>
                </div>
            </div>
        })}
    </div>

    <AddDialog open={open} setOpen={setOpen}/>
    <EditDialog open={editOpen} setOpen={setEditOpen} user={editOpen}/>
    <InfoDialog open={info} setOpen={setInfo} user={info}/>

    </>
  )
}
