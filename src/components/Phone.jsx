import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function Phone({ setStep }) {
    const methods = useFormContext();
    const { register, handleSubmit, formState: { isValid, errors, isSubmitting, isSubmitSuccessful } } = methods;

    console.log(errors.phoneNumber);
    console.log(isValid)
    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data)
        if (isSubmitSuccessful == true)
            setStep(2);
    }
    useEffect((data) => {
        onSubmit(data);
    }, [onSubmit])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col mb-4'>
                <label className='mb-2 font-semibold' >Phone Number </label>
                <input type="text" {...register('phoneNumber')} className='p-2 outline-fuchsia-800 outline-1 rounded-sm' />
                {errors.phoneNumber && <p className='text-red-500 italic text-[0.8rem]'>{errors.phoneNumber?.message}</p>}
            </div>
            <div className='items-center flex justify-center'>
                <button type='submit' disabled={!isValid || isSubmitting} className={!isValid || isSubmitting ? 'bg-fuchsia-400 py-2 px-4 text-white rounded-xl cursor-not-allowed' : 'bg-fuchsia-800 py-2 px-4 text-white rounded-xl cursor-pointer'}>{isSubmitting ? "Loading" : "Generate OTP"}</button>
            </div>

        </form>
    )
}

export default Phone
