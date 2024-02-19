const Cadastro = () => {
  return (
    <div className="mt-40 flex justify-center">
      <form action="#" className="bg-zinc-800 p-8 flex flex-col justify-center gap-4">
        <input type="text" name="nome" />
        <input type="text" name="cpf" />
        <input type="text" name="email" />
        <input type="text" name="senha" />
      </form>
    </div>
  );
}

export default Cadastro;