import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../../../api/auth.js";
import { useAuth } from "../../../hooks/useAuth";
import RouteInputField from "../../atoms/RouteInputField";
import RouteButton from "../../atoms/RouteButton";
import RouteText from "../../atoms/RouteText";
import { theme } from "../../../conf/theme";
import { loginSchema } from "../../../validation/auth-validation.js";
import { jwtDecode } from "jwt-decode";
import RouteSnackBar from "../../atoms/RouteSnackBar";
import { useState } from "react";

export default function RouteLoginForm() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await login(values.email, values.password);

            loginUser(response.data.token);

            const decoded = jwtDecode(response.data.token);

            if (decoded.role === "PASSENGER") {
              navigate("/home");
            } else if (decoded.role === "OWNER") {
              navigate("/owner");
            } else {
              navigate("/");
            }
          } catch (err) {
            setSnack({
              open: true,
              message:
                err.response?.data?.message ||
                err.message ||
                "Erro ao realizar login do usuário",
              severity: "error",
            });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
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
                text="Bem-vindo!"
                variant="h5"
                sx={{ fontWeight: 700, textAlign: "center" }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <RouteText
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Não tem uma conta?{" "}
                  <Box
                    component="span"
                    onClick={() => navigate("/register")}
                    sx={{
                      color: theme.palette.text.link,
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Cadastre-se
                  </Box>
                </RouteText>
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field name="email" component={RouteInputField} label="Email" />
              </Box>

              <Box sx={{ width: "100%" }}>
                <Field
                  name="password"
                  component={RouteInputField}
                  label="Senha"
                  type="password"
                />
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
                {isSubmitting ? "Entrando..." : "Entrar"}
              </RouteButton>
            </Box>
          </Form>
        )}
      </Formik>
      <RouteSnackBar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack({ ...snack, open: false })}
      />
    </>
  );
}
