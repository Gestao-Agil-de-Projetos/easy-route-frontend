import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../../api/auth.js";
import RouteInputField from "../../atoms/RouteInputField";
import RouteButton from "../../atoms/RouteButton";
import RouteRoleSelector from "../RouteRoleSelector";
import RouteText from "../../atoms/RouteText";
import { theme } from "../../../conf/theme";
import RouteSnackBar from "../../atoms/RouteSnackBar";
import { useState } from "react";
import { registerSchema } from "../../../validation/auth-validation.js";

export default function RouteRegisterForm() {
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <Formik
      initialValues={{
        role: "PASSENGER",
        name: "",
        email: "",
        cpf_cnpj: "",
        phone: "",
        cnh: "",
        password: "",
      }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await register({
            ...values,
            cnh: values.role === "OWNER" ? values.cnh : undefined,
          });
          setSnack({
            open: true,
            message: "Usuário criado com sucesso",
            severity: "success",
          });
          setTimeout(() => navigate("/"), 2500);
        } catch (err) {
          setSnack({
            open: true,
            message:
              err.response?.data?.message ||
              err.message ||
              "Erro ao cadastrar usuário",
            severity: "error",
          });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "90%", sm: theme.sizes.form.maxWidth },
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2.5,
            }}
          >
            <RouteText
              variant="h5"
              sx={{ fontWeight: 700, textAlign: "center" }}
            >
              Cadastre-se Gratuitamente
            </RouteText>

            <RouteRoleSelector
              role={values.role}
              onChange={(e, newRole) => setFieldValue("role", newRole)}
              passengerLabel="Sou Passageiro"
              driverLabel="Sou Motorista"
            />

            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr" },
                gap: 1,
              }}
            >
              {[
                {
                  name: "name",
                  label: "Nome",
                  placeholder: "Seu nome completo",
                },
                {
                  name: "email",
                  label: "Email",
                },
                {
                  name: "cpf_cnpj",
                  label: "CPF / CNPJ",
                },
                {
                  name: "phone",
                  label: "Telefone (opcional)",
                },
                ...(values.role === "OWNER"
                  ? [{ name: "cnh", label: "CNH" }]
                  : []),
                {
                  name: "password",
                  label: "Senha",
                  type: "password",
                },
              ].map((field) => (
                <Box key={field.name}>
                  <Field
                    component={RouteInputField}
                    name={field.name}
                    label={field.label}
                    type={field.type || "text"}
                  />
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                mb: -1,
              }}
            >
              <RouteText
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Já tem uma conta?{" "}
                <Box
                  component="span"
                  onClick={() => navigate("/")}
                  sx={{
                    color: theme.palette.text.link,
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Faça Login
                </Box>
              </RouteText>
            </Box>

            <RouteButton
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                height: theme.sizes.button.medium.height,
                borderRadius: theme.shape.borderRadius,
                fontSize: "1.1rem",
                fontWeight: 700,
                background: theme.palette.primary.gradient,
              }}
            >
              {isSubmitting ? "Enviando..." : "Crie sua Conta"}
            </RouteButton>

            <RouteSnackBar
              open={snack.open}
              message={snack.message}
              severity={snack.severity}
              onClose={() => setSnack({ ...snack, open: false })}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
}
