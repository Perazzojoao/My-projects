import PgContainer from "@/components/PgContainer";

import UserList from "./UserList";


const Home = () => {
  return (
    <PgContainer className="lg:px-16 xl:px-32">
      <UserList />
    </PgContainer>
  );
}

export default Home;