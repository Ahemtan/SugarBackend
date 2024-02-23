"use server";

import { LoginForm } from '@/components/auth/login-form'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const route = () => {

  const getCookie = cookies().has('token')

  if(getCookie) {
    redirect('/');
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <LoginForm />
    </div>
  )
}

export default route