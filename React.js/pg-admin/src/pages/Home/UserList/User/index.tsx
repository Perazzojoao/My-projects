import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { deleteUser } from "@/http/Requests";
import IRequestData from "@/types/IRequestData";
import { useCallback } from "react";

type UserProps = {
  user: IRequestData
  i: number
}

const User = ({ user, i }: UserProps) => {
  const { ID = 0, nome, cpf, email, password } = user
  const onDelete = useCallback(async () => {
    if (await deleteUser(ID)) {
      location.reload()
    }
  }, [])

  return (
    <TableRow>
      <TableCell className="font-medium">{i + 1}</TableCell>
      <TableCell>{nome}</TableCell>
      <TableCell>{cpf}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{password}</TableCell>
      <TableCell className="flex justify-center gap-2">
        <Button variant="secondary" className="bg-orange-500 hover:bg-orange-400">Editar</Button>
        <Button onClick={onDelete} variant="secondary" className="bg-red-600 hover:bg-red-00">Deletar</Button>
      </TableCell>
    </TableRow>
  );
}

export default User;