import { FormProvider, useForm } from 'react-hook-form'
import './App.css'
import Otp from './components/Otp'
import Phone from './components/Phone'
import UserInfo from './components/UserInfo'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {useState } from 'react'


function App() {

  const [step, setStep] = useState(1);
  // console.log(step)

  const phoneSchema = z.object({
    phoneNumber: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number').transform((val) => Number(val)),
  })
  const otpSchema = z.object({
    otp: z.string().regex(/^\d{6}$/, 'OTP must be a 6-digit number').transform((val) => Number(val)),
  })

  const dataSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 characters').max(10),
    dob: z.coerce.date({ invalid_type_error: 'DOB is required' }),
    address: z.string().optional(),
  })

  const getSchema = () => {
    if (step === 1) return phoneSchema;
    if (step === 2) return otpSchema;
    return dataSchema;
  }


  const methods = useForm({
    mode: 'onChange',
    resolver: zodResolver(getSchema()),
    defaultValues: {
      phoneNumber: '',
      otp: '',
      name: '',
      dob: '',
      address: ''
    }
  });
  const { } = methods;

  return (
    <FormProvider {...methods}>
      <div className='bg-fuchsia-800 h-screen p-8 flex justify-center items-center' >
        <div className='p-6 bg-white w-[400px] py-4 rounded-xl shadow'>
          <h2 className='text-2xl font-semibold text-center mb-2'>Sign Up</h2>
          {step === 1 &&
            <Phone setStep={setStep} />
          }
          {step === 2 &&
            <Otp setStep={setStep} />
          }
          {step === 3 &&
            <UserInfo setStep={setStep} />
          }
           {step === 0 &&
           (<>
           <h1 className='text-center text-xl font-semibold'>Signed in Successfully</h1>
           </>)
          }



        </div>
      </div>
    </FormProvider>
  )
}

export default App
