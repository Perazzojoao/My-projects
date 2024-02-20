import IRequestData from "@/types/IRequestData";
import { createContext, useState, ReactNode } from "react";

type DBProps = {
  children: ReactNode
}

type Context = {
  userList: IRequestData[]
  setUserList: React.Dispatch<React.SetStateAction<IRequestData[]>>
}

export const DBContext = createContext({} as Context);
DBContext.displayName = 'Calculator';


const DBProvider = ({ children }: DBProps) => {
  const [userList, setUserList] = useState([{} as IRequestData]);

  return ( 
    <DBContext.Provider value={{userList, setUserList}}>
      {children}
    </DBContext.Provider>
  );
}
 
export default DBProvider;