import { addUser, login } from "@/http/Requests";
import { ReactNode, useMemo } from "react";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormProps = {
  children: ReactNode
  handleSubmit: UseFormHandleSubmit<FieldValues, FieldValues>
  type: "cadastro" | "login"
}

const Form = ({ children, handleSubmit, type }: FormProps) => {
  const navigate = useNavigate()
  const titulo = useMemo(() => {
    if (type === 'cadastro') {
      return { h1: "Criar uma conta", h2: "Resgistre suas informações para criar uma conta", btn: "Criar conta" }
    }
    return {h1: "Login", h2: "Preencha seus dados para acessar sua conta.", btn: "Login"}

  }, [type])

  return (
    <form
      action='#'
      className='bg-zinc-900 p-5 sm:p-8 flex flex-auto flex-col justify-center gap-5 rounded-lg sm:max-w-[455px] shadow-lg shadow-black'
      onSubmit={handleSubmit(async (data) => {
        try {
          if (type === 'cadastro') {
            const resp = await addUser(data)
            console.log(resp);
            navigate('/login')
          } else if (type === "login") {
            const resp = await login(data)
            console.log(resp);
          }
        } catch (error) {
          console.log(error);
        }
        
      })}
    >
      <div>
        <h1 className='font-bold text-2xl'>{titulo.h1}</h1>
        <h2 className='text-gray-200 text-opacity-40 text-sm'>
          {titulo.h2}
        </h2>
      </div>
      {children}
      <button type='submit' className='h-9 rounded-md bg-blue-700 hover:bg-blue-800'>
        {titulo.btn}
      </button>
    </form>
  );
}

export default Form;