import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllUsers } from "@/http/Requests";
import { useEffect } from "react";
import User from './User/index';
import useDBData from "@/hooks/useDBData";

const UserList = () => {
  const { userList, saveUserList } = useDBData()

  useEffect(() => {
    console.log("ok");
    getAllUsers()
      .then((resp) => (
        saveUserList(resp)
      ))
      .catch(err => {
        console.log(err);
      })
  }, [])
  
  return ( 
    <Table className="bg-zinc-900 rounded-lg shadow-lg shadow-black">
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-gray-200 font-bold">ID</TableHead>
            <TableHead className="text-gray-200 font-bold">Nome</TableHead>
            <TableHead className="text-gray-200 font-bold">CPF</TableHead>
            <TableHead className="text-left text-gray-200 font-bold">Email</TableHead>
            <TableHead className="text-left text-gray-200 font-bold">Senha</TableHead>
            <TableHead className="text-center text-gray-200 font-bold">...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user, i) => (
            <User key={i}  user={user} i={i} />
          ))}
        </TableBody>
      </Table>
  );
}
 
export default UserList;