import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

function Otp({ setStep }) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0){
      confirm("Session expired!")
      setStep(1)
    };
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer)
  }, [timeLeft])

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2,'0');
    const s = String(sec % 60).padStart(2,'0');
    return `${m}:${s}`
  }


  const { register, handleSubmit, formState: { isValid, errors, isSubmitting, isSubmitSuccessful } } = useFormContext();
  const onSubmit = async (data) => {
    console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (isSubmitSuccessful == true)
      setStep(3);
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col mb-4'>
        <label className='mb-2 font-semibold' >OTP </label>
        <span>{timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Time expired"}</span>
        <input type="text" {...register('otp')} className='p-2 outline-fuchsia-800 outline-1 rounded-sm' />
        {errors.otp && <p className='text-red-500 italic text-[0.8rem]'>{errors.otp?.message}</p>}
      </div>
      <div className='items-center flex justify-center'>
        <button type='submit' disabled={!isValid || isSubmitting} className={!isValid || isSubmitting ? 'bg-fuchsia-400 py-2 px-4 text-white rounded-xl cursor-not-allowed' : 'bg-fuchsia-800 py-2 px-4 text-white rounded-xl cursor-pointer'} >{isSubmitting ? "Loading" : "Validate OTP"}</button>
      </div>
    </form>
  )
}

export default Otp
