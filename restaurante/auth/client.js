const axios = require("axios"); // npm install axios

const API_URL = "http://localhost:3000"; // Altere se necessário
let token = null;
let userId = null;

// Registrar usuário
async function register(username, email, password) {
  try {
    const res = await axios.post(`${API_URL}/register`, { username, email, password });
    console.log("Usuário registrado com sucesso!");
  } catch (err) {
    console.error("Erro ao registrar:", err.response?.data || err.message);
  }
}

// Login
async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    token = res.data.token;
    console.log("------------------", token, "------------------")
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    userId = payload._id;
    console.log("------------------", payload, userId, "------------------")
    console.log("Login bem-sucedido! Token salvo:\n", token);
  } catch (err) {
    console.error("Erro ao logar:", err.response?.data || err.message);
  }
}

// 3. Ler usuário
async function getUser() {
  try {
    const res = await axios.get(`${API_URL}/users/${userId}`, {
      headers: { Authorization: token }
    });
    console.log("Dados do usuário:", res.data);
  } catch (err) {
    console.error("Erro ao buscar usuário:", err.response?.data || err.message);
  }
}

// 4. Atualizar senha
async function updatePassword(newPassword) {
  try {
    const res = await axios.patch(`${API_URL}/users/${userId}`, { password: newPassword }, {
      headers: { Authorization: token }
    });
    console.log("Senha atualizada com sucesso!");
  } catch (err) {
    console.error("Erro ao atualizar senha:", err.response?.data || err.message);
  }
}

// 5. Deletar usuário
async function deleteUser() {
  try {
    const res = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: token }
    });
    console.log("Usuário deletado com sucesso.");
  } catch (err) {
    console.error("Erro ao deletar usuário:", err.response?.data || err.message);
  }
}

// Exemplo de uso
(async () => {
  await register("maria", "joao@example.com", "senhaSegura123");
  await login("joao@example.com", "senhaSegura123");
  await getUser();
  await updatePassword("novaSenha456");
  await deleteUser();
})();