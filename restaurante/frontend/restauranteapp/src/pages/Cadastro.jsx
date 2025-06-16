import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router';
import axios from "axios";
import '../style/Auth.css';

const Cadastro = (props) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    senha: '',
    server: ''
  });

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from;

  const validateNome = (nome) => {
    if (!nome.trim()) return "Nome é obrigatório";
    if (!/^[a-zA-ZÀ-ÿ\s]{2,64}$/.test(nome)) return "Nome inválido";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email é obrigatório";
    if (!emailRegex.test(email)) return "Formato de email inválido";
    return "";
  };

  const validateSenha = (senha) => {
    if (!senha) return "Senha é obrigatória";
    if (senha.length < 8 || senha.length > 32) return "Senha deve ter entre 8 e 32 caracteres";
    return "";
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "nome") setErrors((prev) => ({ ...prev, nome: validateNome(value) }));
    if (name === "email") setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    if (name === "senha") setErrors((prev) => ({ ...prev, senha: validateSenha(value) }));
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    const nomeError = validateNome(form.nome);
    const emailError = validateEmail(form.email);
    const senhaError = validateSenha(form.senha);

    if (nomeError || emailError || senhaError) {
      setErrors({
        nome: nomeError,
        email: emailError,
        senha: senhaError,
        server: ""
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: form.nome,
        email: form.email,
        password: form.senha
      });

      setRegisterSuccess(true);
      setErrors({ email: "", password: "", server: "" });
        
      setTimeout(() => {
      if (from) {
        navigate('/login', {
          state: { from: from }
        });
      } else {
        navigate("/login");
      }
    }, 2000);

    } catch (error) {
      if (error.response && error.response.data) {
        setErrors((prev) => ({ ...prev, server: error.response.data }));
      } else {
        setErrors((prev) => ({ ...prev, server: "Erro ao tentar cadastrar. Tente novamente." }));
      }
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className='auth-wrapper'>
      <div className="auth-container">
        <div className='auth-header'>
          <h2>Cadastro</h2>
        </div>

        {registerSuccess && (
          <p className="auth-success">Cadastro realizado com sucesso! Redirecionando...</p>
        )}

        <form onSubmit={handleCadastro}>
          {errors.nome && <p className="auth-error">{errors.nome}</p>}
          {errors.email && <p className="auth-error">{errors.email}</p>}
          {errors.senha && <p className="auth-error">{errors.senha}</p>}
          <input
            type="text"
            placeholder="Nome completo"
            name="nome"
            value={form.nome}
            onChange={handleInput}
            required
          />

          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={form.email}
            onChange={handleInput}
            required
          />
          
          
          <input
            type="password"
            placeholder="Senha"
            name="senha"
            value={form.senha}
            onChange={handleInput}
            required
          />
          

          <button type="submit">Cadastrar</button>

          {errors.server && <p className="auth-error">{errors.server}</p>}
        </form>
        <p className='auth-extra'>Já tem conta? <Link to="/login" className='auth-link'>Faça login</Link></p>
      </div>
    </div>
  );
};

export default Cadastro;
