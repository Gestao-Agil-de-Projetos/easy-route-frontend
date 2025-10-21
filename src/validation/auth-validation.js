import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  cpf_cnpj: yup.string().required("O CPF/CNPJ é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
  cnh: yup.string().when("role", {
    is: "OWNER",
    then: (schema) => schema.required("A CNH é obrigatória"),
  }),
});

export const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
});
