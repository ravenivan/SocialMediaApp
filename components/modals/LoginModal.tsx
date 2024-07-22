"use client"

import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { closeLogInModal, closeSignUpModal, openLogInModal, openSignUpModal } from '@/redux/slices/modalSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function LoginModal() {
  const [showPassword, setShowPassword] = useState(false);

  const isOpen = useSelector((state: RootState) => {
    return state.modals.logInModalOpen
  })

  const dispatch: AppDispatch = useDispatch()

  return (
    <>
      <button 
      onClick={() => dispatch(openLogInModal())}
      className='border-2 border-white text-white font-bold rounded-full text-base md:text-sm
        w-full h-[48px] md:w-[88px] md:h-[40px] 
        hover:bg-white hover:bg-opacity-25 transition
      '>
        Log in
      </button>

      <Modal open={isOpen} onClose={() => dispatch(closeLogInModal())}
        className='flex justify-center items-center'
      >
        <div className='w-full h-full sm:w-[600px] sm:h-fit bg-white border-none
        sm:rounded-xl
        '>
          <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
            onClick={() => dispatch(closeLogInModal())}
          />
          <form className='pt-10 pb-20 px-4 sm:px-20'>
            <h1 className='text-3xl font-bold mb-10'>Log in to Busy Bee</h1>

            <div className='w-full space-y-5 mb-10'>
              <input type="text" placeholder='Email' className='
              h-[54px] w-full ps-3 text-black border border-gray-200 outline-none rounded-[4px]
            focus:border-[#F4AF01] transition
              ' />

              <div className='h-[54px] w-full text-black border border-gray-200 outline-none rounded-[4px]
            focus-within:border-[#F4AF01] transition overflow-hidden pr-3
              flex items-center
              '>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  className='w-full h-full ps-3 outline-none'
                />
                <div
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='w-7 h-7 text-gray-400 cursor-pointer'>
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <button className='bg-[#F4AF01] text-white w-full h-[48px] mb-5 rounded-full shadow-md '>
              Log In
            </button>
            <span className='text-center text-sm mb-5 block'>Or</span>
            <button className='bg-[#F4AF01] text-white w-full h-[48px] mb-5 rounded-full shadow-md '>
              Log In as Guest
            </button>

          </form>

        </div>
      </Modal>
    </>
  )
}
