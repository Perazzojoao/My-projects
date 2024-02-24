import { useMemo } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

type CampoProps = {
  label: string
  name: string
  register: UseFormRegister<FieldValues>
  type?: "password" | "text"
}

const Campo = ({ label, name, register, type = "text" }: CampoProps) => {
  const RegisterParams = useMemo(() => {
    if (type === "text") {
      return { required: "Field required" }
    }
    return {
      required: "Field required",
      minLength: {
        value: 4,
        message: "Min length is 4"
      }
    }
  }, [type])

  return (
    <div className="font-bold flex flex-col gap-2">
      <label className="text-sm">{label}</label>
      <input type={type} {...register(name, RegisterParams)} className="bg-zinc-900 text-gray-200 font-semibold border-2 border-gray-100 rounded-md border-opacity-65 h-9 pl-3" />
    </div>
  );
}

export default Campo;