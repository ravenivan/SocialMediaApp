"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from '@mui/material'
import { AppDispatch, RootState } from '@/redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'
import { signInUser } from '@/redux/slices/userSlice'

export default function SignUpModal() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isOpen = useSelector((state: RootState) => {
    return state.modals.signUpModalOpen
  })

  const dispatch: AppDispatch = useDispatch()

  const handleSignUp = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      // Handle Redux Actions
      dispatch(signInUser({
        name: '',
        username: currentUser.email!.split("@")[0],
        email: currentUser.email,
        uid: currentUser.uid,
      }))
      
    })

    return unsubscribe
  }
  , [])

  return (
    <>
      <button className='bg-white text-black font-bold rounded-full text-base md:text-sm
        w-full h-[48px] md:w-[88px] md:h-[40px]'
        onClick={
          () => dispatch(openSignUpModal())
        }
      >
        Sign up
      </button>

      <Modal open={isOpen} onClose={() => dispatch(closeSignUpModal())}
        className='flex justify-center items-center'
      >
        <div className='w-full h-full sm:w-[600px] sm:h-fit bg-white border-none
        sm:rounded-xl
        '>
          <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer' 
          onClick={() => dispatch(closeSignUpModal())}
          />
          <div className='pt-10 pb-20 px-4 sm:px-20'>
            <h1 className='text-3xl font-bold mb-10'>Create your account</h1>

            <div className='w-full space-y-5 mb-10'>
              <input 
              type="text" placeholder='Name' 
              className='
              h-[54px] w-full ps-3 text-black border border-gray-200 outline-none rounded-[4px]
             focus:border-[#F4AF01] transition
              ' />
              <input type="text" placeholder='Email' 
              className='
              h-[54px] w-full ps-3 text-black border border-gray-200 outline-none rounded-[4px]
            focus:border-[#F4AF01] transition'
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              />

              <div className='h-[54px] w-full text-black border border-gray-200 outline-none rounded-[4px]
            focus-within:border-[#F4AF01] transition overflow-hidden pr-3
              flex items-center
              '>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                  className='w-full h-full ps-3 outline-none'
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
                <div
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='w-7 h-7 text-gray-400 cursor-pointer'>
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <button 
            className='bg-[#F4AF01] text-white w-full h-[48px] mb-5 rounded-full shadow-md '
            onClick={() => handleSignUp()}
            >
              Sign Up
            </button>
            <span className='text-center text-sm mb-5 block'>Or</span>
            <button className='bg-[#F4AF01] text-white w-full h-[48px] mb-5 rounded-full shadow-md '>
              Log In as Guest
            </button>

          </div>

        </div>
      </Modal>
    </>
  )
}
