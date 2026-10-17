import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import z from 'zod'
import { putUser } from '../store/dataSlice'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';


const userSchema = z.object({
    name: z.string().min(3, 'Your name must have more 3 letters'),
    age: z.coerce.number().min(10, 'You must be older 10 years old'),
    avatar: z.string().optional(),
    status: z.string().nonempty(),
    job: z.string().nonempty(),
    phone: z.coerce.number().min(9, 'More 9')
})

export default function EditDialog({open,setOpen,user}: any) {
  
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
    }
  }) 

  useEffect(()=> {
    if(user) {
      reset({
        name: user.name || '',
        age: user.age || '',
        avatar: user.avatar || '',
        status: user.status || '',
        phone: user.phone || '',
        job: user.job || '',
      })
    }
  },[user,reset])

  function editUser(data: any) {
    if(!user?.id) return;
    dispatch(putUser({
      id: user.id,
      ...data
    }))
    setOpen(false)
  }

  return (
        <Dialog open={open}>
      <DialogTitle>EDIT USER</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(editUser)} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>

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
            <option value="" disabled>Выберите статус</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <input placeholder='Job...' {...register('job')} />

            <div>
            <input type='number' placeholder='Phone...' {...register('phone')} />
            {errors.phone && <div style={{color: 'red', fontSize: '12px'}}>{errors.phone.message}</div>}
          </div>


          <DialogActions>
            <button type='submit'>Save</button>
            <button type='button' onClick={()=> setOpen(false)}>Close</button>
          </DialogActions>

        </form>
      </DialogContent>
    </Dialog>
  )
}
