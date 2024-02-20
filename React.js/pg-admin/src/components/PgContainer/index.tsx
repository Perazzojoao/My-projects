import { ReactNode } from "react";

type PgContainerProps = {
  children: ReactNode
  className?: string
}

const PgContainer = ({ children, className = '' }: PgContainerProps) => {
  return ( 
    <div className={`mt-16 sm:mt-40 px-5 flex justify-center ${className}`} >
      {children}
    </div>
  );
}
 
export default PgContainer;