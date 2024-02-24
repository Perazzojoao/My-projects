export default interface IRequestData {
  CreatedAt?: string
  UpdatedAt?: string
  DeletedAt?: string | null
  ID?: number
	nome: string;
	cpf: string;
	email: string;
	password: string;
}
