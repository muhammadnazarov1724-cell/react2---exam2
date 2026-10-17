import { Button, DialogActions, DialogContent, DialogTitle, Drawer } from '@mui/material'
import React from 'react'

export default function InfoDialog({open,setOpen,user}:any) {
  return (
    <Drawer open={open} anchor='right'>
        <DialogTitle sx={{color: 'black'}}>Information About User</DialogTitle>
        <DialogContent sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', gap: '20px'}}>
                <h2 style={{color: 'black'}}>{user.name}</h2>
                <img style={{width: '250px', height: '250px', borderRadius: '50%'}} src={user.avatar} alt="" />
                <h3>{user.age}</h3>
                <h3>{user.job}</h3>
                <h4>{user.phone}</h4>
                <p>{user.status ? 'Active' : 'Inactive'}</p>
                <DialogActions>
                    <Button onClick={()=> setOpen(false)}>Close</Button>
                </DialogActions>
        </DialogContent>
    </Drawer>
  )
}
