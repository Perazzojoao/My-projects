import { DBContext } from '@/contexts/DBProvider'
import IRequestData from '@/types/IRequestData'
import { useContext } from 'react'

export default function useDBData() {
	const { userList, setUserList } = useContext(DBContext)

	const saveUserList = (users: IRequestData[]) => {
    setUserList(users)
  }

	return { userList, saveUserList }
}
