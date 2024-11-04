// import Default from '@/layouts/Default'
// import { ROUTES } from '@/resources/routes-constants'
// import { useAppDispatch, useAppSelector } from '@/store/reducers/store'
// import { loadingAction } from '@/store/slice/loading.slice'
// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import { register as registerAPI } from '@/resources/api-constants'
// import toast from 'react-hot-toast'

// interface IFormInput {
//   name: string
//   email: string
//   password: string
//   rePassword: string
// }

// const Register = () => {
//   const user = useAppSelector((state) => state.user.user)
//   const dispatch = useAppDispatch()
//   const navigate = useNavigate()
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch
//   } = useForm<IFormInput>()

//   const onSubmit = async (data: IFormInput) => {
//     dispatch(loadingAction.show())
//     try {
//       const result = await registerAPI({ name: data.email, email: data.email, password: data.password, password_confirmation: data.rePassword })
//       toast.success('Account registration successful! Please check your email to activate your account.')
//     } catch (error) {
//       toast.error('There was an error during account registration!')
//     } finally {
//       dispatch(loadingAction.hide())
//     }
//   }

//   useEffect(() => {
//     if (user) {
//       navigate(ROUTES.HOMEPAGE_ROUTE)
//     }
//   }, [user])

//   return (
//     <Default>
//       <div>
//         <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
//           <h1 className="text-sm font-bold text-red">Register</h1>
//         </div>
//         <div className="py-2.5 pl-4 pr-4 my-6 w-full max-w-md m-[auto] bg-[#f9f9f9] border border-[#eee]">
//           <form action="/#" className="py-2.5 pl-1 my-2.5">
//             <div className="mb-4">
//               <label htmlFor="name">Your name: </label>
//               <input
//                 {...register('name', {
//                   required: true
//                 })}
//                 type="text"
//                 id="name"
//                 className="block w-full mt-1 border border-[#ccc] p-2 rounded-lg focus-visible:outline-[#3c765f]"
//                 name="name"
//                 placeholder="Your name"
//               />
//               {errors.name && (
//                 <p className="text-red mb-4">
//                   {errors?.name?.type === 'required' && <span role="alert">Your name is required</span>}
//                   <span role="alert">{errors.name.message}</span>
//                 </p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="email">Email: </label>
//               <input
//                 {...register('email', {
//                   required: true,
//                   pattern: {
//                     value: /\S+@\S+\.\S+/,
//                     message: 'Email invalid.'
//                   }
//                 })}
//                 type="text"
//                 id="email"
//                 className="block w-full mt-1 border border-[#ccc] p-2 rounded-lg focus-visible:outline-[#3c765f]"
//                 name="email"
//                 placeholder="email.example@gmail.com"
//               />
//               {errors.email && (
//                 <p className="text-red mb-4">
//                   {errors?.email?.type === 'required' && <span role="alert">Your email is required.</span>}
//                   <span role="alert">{errors.email.message}</span>
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="password">Password: </label>
//               <input
//                 {...register('password', {
//                   required: true
//                 })}
//                 type="password"
//                 id="password"
//                 className="block w-full mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
//                 name="password"
//                 placeholder="Your password"
//               />
//               {errors.password && (
//                 <p className="text-red mb-4">
//                   {errors?.password?.type === 'required' && <span role="alert">Password is required</span>}
//                   <span role="alert">{errors.password.message}</span>
//                 </p>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="rePassword">Re-type Password: </label>
//               <input
//                 {...register('rePassword', {
//                   required: true,
//                   validate: (val: string) => {
//                     if (watch('password') != val) {
//                       return 'Password does not match'
//                     }
//                   }
//                 })}
//                 type="password"
//                 id="rePassword"
//                 className="block w-full mt-1 border border-[#ccc] focus-visible:outline-[#3c765f] p-2 rounded-lg"
//                 name="rePassword"
//                 placeholder="Confirm your password"
//               />
//               {errors.rePassword && (
//                 <p className="text-red mb-4">
//                   {errors?.rePassword?.type === 'required' && <span role="alert">Password is required.</span>}
//                   <span role="alert">{errors.rePassword.message}</span>
//                 </p>
//               )}
//             </div>

//             <button
//               onClick={handleSubmit(onSubmit)}
//               type="submit"
//               value="Submit"
//               className="mt-6 uppercase bg-primary hover:bg-secondary text-white hover:text-primary font-bold text-[13px] border border-[#ccc] p-2 rounded-lg"
//             >
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </Default>
//   )
// }

// export default Register
