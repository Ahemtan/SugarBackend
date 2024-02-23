"use client";

import React from 'react'
import { DropdownMenuItem } from './ui/dropdown-menu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

const Logout = () => {

    const router = useRouter()

    const logout = () => {
        try {
            axios.get('/api/auth/logout')
            toast.success("Logged out successfully")
            router.push('/')
        } catch (error) {
           toast.error("Something went wrong!")
        }
    }
  return (
    <DropdownMenuItem onClick={logout}>
        Log out
    </DropdownMenuItem>
  )
}

export default Logout