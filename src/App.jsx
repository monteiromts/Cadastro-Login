// Importa o hook useState do React para manipular estados no componente
import { useState } from 'react';

// Importa o arquivo de estilos CSS para este componente
import './App.css';

// Importa o componente Link do React Router para navegação sem recarregar a página
import { Link } from 'react-router-dom';

function Login() {
  // Cria estados locais para armazenar email, senha e o checkbox "lembrar de mim"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // Função que será executada quando o formulário for enviado
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    // Simula envio de dados (você pode substituir por uma requisição real)
    console.log('Enviando dados:', {
      email,
      password,
      remember,
    });

    // Exemplo de como fazer uma requisição real:
    /*
    fetch('https://seuservidor.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, remember })
    })
    .then(res => res.json())
    .then(data => {
      // tratar resposta do servidor
    })
    .catch(err => {
      // tratar erro de requisição
    });
    */
  };

  return (
    // Container principal com classe 'login' para estilização
    <div className='login'>
      {/* Formulário com evento de envio atrelado à função handleSubmit */}
      <form onSubmit={handleSubmit}>
        <h1 className='Titulo'>Login</h1>

        {/* Espaço reservado para a logo da empresa */}
        <div className='Logo'>
          <img src="" alt="Logo" />
        </div>

        {/* Campo de entrada para o email */}
        <div className='formulario-E-mail'>
          <label htmlFor="email" className="formulario-Email-label">E-mail</label>
          <br />
          <input
            type="email"
            id="email"
            className='formulario-Email-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado email
          />
        </div>

        {/* Campo de entrada para a senha */}
        <div className='Formulario-Password'> 
          <label htmlFor="password" className="formulario-Password-label">Senha</label>
          <br />
          <input
            type="password"
            id="password"
            className='form-label-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado password
          />
        </div>
        
        {/* Checkbox para lembrar o usuário */}
        <div className="Formulario-Check">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="dropdownCheck"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)} // Atualiza o estado remember
            />
            <label className="form-check-label" htmlFor="dropdownCheck">
              Lembre de mim
            </label>
          </div>
        </div>

        {/* Botão de envio do formulário */}
        <button type="submit" className="btn btn-primary">Sign in</button>
        
        <div className="dropdown-divider"></div>

        {/* Link para a página de cadastro (novo usuário) */}
       <Link className="dropdown-item" to="/cadastro">Primeiro acesso</Link>
        <br />

        {/* Link para recuperação de senha (ainda sem rota definida) */}
        <Link className="dropdown-item" to="/forgot">Esqueceu a senha?</Link>
      </form>
    </div>    
  )
}

// Exporta o componente para ser usado em outros arquivos
export default Login;
