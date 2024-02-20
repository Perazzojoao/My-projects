import { addUser } from "@/http/Requests";
import {  ReactNode } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

type FormProps = {
  children: ReactNode
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
}

const Form = ({ children, handleSubmit }: FormProps) => {
  return ( 
    <form
        action='#'
        className='bg-zinc-900 p-5 sm:p-8 flex flex-auto flex-col justify-center gap-5 rounded-lg sm:max-w-[455px] shadow-lg shadow-black'
        onSubmit={handleSubmit(async (data) => {
          const resp = await addUser(data)
          console.log(resp);
        })}
      >
        <div>
          <h1 className='font-bold text-2xl'>Criar uma conta</h1>
          <h2 className='text-gray-200 text-opacity-40 text-sm'>
            Resgistre suas informações para criar uma conta
          </h2>
        </div>
        {children}
        <button type='submit' className='h-9 rounded-md bg-blue-700 hover:bg-blue-800'>
          Criar conta
        </button>
      </form>
  );
}
 
export default Form;