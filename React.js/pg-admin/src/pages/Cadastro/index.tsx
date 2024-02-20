import { useForm } from 'react-hook-form';
import Campo from '@/components/Campo';
import Form from '@/components/Form';
import PgContainer from '@/components/PgContainer';

const Cadastro = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <PgContainer>
      <Form type='cadastro' handleSubmit={handleSubmit} >
        <Campo label='Nome' name='nome' register={register} />
        <Campo label='Cpf' name='cpf' register={register} />
        <Campo label='Email' name='email' register={register} />
        <Campo label='Senha' name='password' register={register} type='password' />
      </Form>
    </PgContainer>
  );
}

export default Cadastro;
