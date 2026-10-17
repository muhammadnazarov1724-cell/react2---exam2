import React from 'react'
import { useDispatch } from 'react-redux'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { postUser } from '../store/dataSlice'
import { zodResolver } from '@hookform/resolvers/zod' 
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const userSchema = z.object({
    name: z.string().min(3, 'Your name must have more 3 letters'),
    age: z.coerce.number().min(10, 'You must be older 10 years old'),
    avatar: z.string().optional(),
    status: z.string().nonempty(),
    job: z.string().nonempty(),
    phone: z.coerce.number().min(9, 'More 9')
})

export default function AddDialog({open,setOpen}:any) {

    let dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: '',
            age: '',
            avatar: '',
            status: '',
            job: '',
            phone: '',
        },
    })

    function addUser(data) {
        dispatch(postUser(data))
        reset()
        setOpen(false)
    }

  return (
    <Dialog open={open}>
        <DialogTitle sx={{color: 'black'}}>Add User</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(addUser)} style={{display: 'flex', flexDirection: 'column', gap:'20px'}}>

                <div>
                    <input placeholder='Name...' {...register('name')} />
                    {errors.name && <div style={{color: 'red', fontSize: '12px'}}>{errors.name.message}</div>}
                </div>

                <div>
                    <input placeholder='Age...' {...register('age')} />
                    {errors.age && <div style={{color: 'red', fontSize: '12px'}}>{errors.age.message}</div>}
                </div>

                <input placeholder='Url...' {...register('avatar')} />

                <select {...register('status')}>
                    <option value="" disabled>Choose Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                </select>

                <input placeholder='Job...' {...register('job')} />

                <div>
                    <input placeholder='Phone...' {...register('phone')} />
                    {errors.phone && <div style={{color: 'red', fontSize: '12px'}}>{errors.phone.message}</div>}
                </div>

                <DialogActions>
                    <Button type='submit'>Add</Button>
                    <Button type='button' onClick={()=> setOpen(false)}>Close</Button>
                </DialogActions>

            </form>
        </DialogContent>
    </Dialog>
  )
}
