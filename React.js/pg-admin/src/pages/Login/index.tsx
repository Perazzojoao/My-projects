import Campo from "@/components/Campo";
import Form from "@/components/Form";
import PgContainer from "@/components/PgContainer";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm()

  return (
    <PgContainer>
      <Form type="login" handleSubmit={handleSubmit}>
        <Campo label="Email" name="email" register={register} />
        <Campo label="Senha" name="password" type="password" register={register} />
      </Form>
    </PgContainer>
  );
}

export default Login;