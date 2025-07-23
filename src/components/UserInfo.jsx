import React from 'react'
import { useFormContext } from 'react-hook-form'

function UserInfo({ setStep }) {
  const { register, handleSubmit, formState: { isValid, isSubmitting, isSubmitSuccessful, errors } } = useFormContext();
  const onSubmit = (data) => {
    console.log(data)
    if (isSubmitSuccessful == true)
      setStep(0);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-semibold' >Name</label>
        <input type="text" {...register('name')} className='p-2 outline-fuchsia-800 outline-1 rounded-sm' />
        {errors.name?.error && <p>{errors.name?.error}</p>}
      </div>
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-semibold' >DOB</label>
        <input type="date" {...register('dob')} className='p-2 outline-fuchsia-800 outline-1 rounded-sm' />
      </div>
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-semibold' >Address</label>
        <input type="text" {...register('address')} className='p-2 outline-fuchsia-800 outline-1 rounded-sm' />
      </div>

      <div className='items-center flex justify-center'>
        <button type='submit' disabled={!isValid || isSubmitting} className={!isValid || isSubmitting ? 'bg-fuchsia-400 py-2 px-4 text-white rounded-xl cursor-not-allowed' : 'bg-fuchsia-800 py-2 px-4 text-white rounded-xl cursor-pointer'} >{isSubmitting ? "Loading" : "Submit"}</button>
      </div>
    </form>
  )
}

export default UserInfo
