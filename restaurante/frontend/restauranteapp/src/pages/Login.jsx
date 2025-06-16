import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import axios from "axios";
import '../style/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    server: ""
  });
  
  const [loginSuccess, setLoginSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email é obrigatório";
    if (!emailRegex.test(email)) return "Formato de email inválido";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Senha é obrigatória";
    if (password.length < 8 || password.length > 32) return "Senha deve ter entre 8 e 32 caracteres";
    return "";
  };

  const handleInput = (event) => {
    const { name, value } = event.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }

    if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        server: ""
      });
      return;
    }

    try {
      await axios.post('http://localhost:3000/login', user, {
        withCredentials: true,
      });

      setLoginSuccess(true);
      setErrors({ email: "", password: "", server: "" });

      setTimeout(() => {
        navigate(from);
      }, 2000);

    } catch (error) {
      if (error.response && error.response.data) {
        setErrors((prev) => ({ ...prev, server: error.response.data }));
      } else {
        setErrors((prev) => ({ ...prev, server: "Erro ao tentar fazer login. Tente novamente." }));
      }
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className="auth-container">
        <div className='auth-header'>
          <h2>Login</h2>
        </div>

        {loginSuccess && (
          <p className="auth-success">Login realizado com sucesso! Redirecionando...</p>
        )}

        <form onSubmit={handleLogin}>
          {errors.email && <p className="auth-error">{errors.email}</p>}
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInput}
            required
          />
          {errors.password && <p className="auth-error">{errors.password}</p>}

          <button type="submit">Entrar</button>

          {errors.server && <p className="auth-error">{errors.server}</p>}
        </form>
        <p className="auth-extra">Não tem conta? <Link to="/cadastro" className='auth-link' state={{ from: from }}>Cadastre-se</Link></p>
      </div>
    </div>
  );
};

export default Login;
