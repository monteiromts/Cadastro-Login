// Importa o hook useState do React, usado para controlar estados locais no componente
import { useState } from 'react';

// Importa o arquivo CSS para estilizar o componente de cadastro
import './cadastro.css';

// Define o componente funcional Cadastro
function Cadastro() {
  // Estados para armazenar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Estados para mensagens de erro e sucesso
  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Função executada ao enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o recarregamento da página

    // Verifica se a senha e a confirmação são iguais
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return; // Interrompe o envio
    }

    // Limpa mensagens anteriores
    setErro('');
    setMensagem('');

    // Monta os dados para envio ao backend
    const dados = {
      nome,
      matricula,
      email,
      password: senha, // o backend espera o campo chamado "password"
    };

    try {
      // Envia os dados para o backend via requisição HTTP POST
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo enviado
        body: JSON.stringify(dados), // Converte o objeto para JSON
      });

      const resultado = await response.json(); // Converte a resposta para JSON

      if (!response.ok) {
        // Exibe mensagem de erro vinda do backend
        setErro(resultado.error || 'Erro ao cadastrar usuário.');
      } else {
        // Exibe mensagem de sucesso
        setMensagem(resultado.message || 'Cadastro realizado com sucesso!');

        // Limpa os campos do formulário
        setNome('');
        setMatricula('');
        setEmail('');
        setSenha('');
        setConfirmarSenha('');
      }
    } catch (err) {
      // Erro na comunicação com o servidor (por exemplo, servidor offline)
      setErro('Erro na comunicação com o servidor.');
    }
  };

  // Retorna o JSX (HTML com JavaScript) para ser exibido na tela
  return (
    <div className="cadastro"> {/* Container principal */}
      <form onSubmit={handleSubmit}> {/* Formulário com evento de envio */}
        <h2>Cadastro de Usuário</h2>

        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Matrícula:</label>
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <label>Confirmar Senha:</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        {/* Mensagem de erro (se existir) */}
        {erro && <p className="erro">{erro}</p>}

        {/* Mensagem de sucesso (se existir) */}
        {mensagem && <p className="sucesso">{mensagem}</p>}

        <button type="submit">Cadastrar</button> {/* Botão para enviar o formulário */}
      </form>
    </div>
  );
}

// Exporta o componente para que ele possa ser usado em outras partes do app
export default Cadastro;
