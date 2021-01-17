import React, {useCallback, useEffect, useMemo, useState} from 'react';

// import { Container } from './styles';

function Hooks() {
  const [tarefas, setTarefas] = useState([])
  const [dados, setDados] = useState('')

  // Component did Mount - está pegando os dados do localStorage
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas')

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage))
    }
  },[])

  // Component upDate - está salvando os dados no localStorage
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  },[tarefas])

  // Evita o return ser acionado a cada letra digitada 
  const totalTarefas = useMemo(() => tarefas.length, [tarefas])

  //useCallback é utilizado para calculos mais complexos
  const adicionarTarefas = useCallback((e) => {
    e.preventDefault()
    
    setTarefas([...tarefas, dados])
    setDados('')
  }, [tarefas, dados])

  const listarTarefas = tarefas.map((tarefa) => {
    return (
      <div>
        <p key={tarefa}>{tarefa}</p>
      </div>
    )
  })

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <h3>Você tem {totalTarefas} tarefas!</h3>

      <form onSubmit={adicionarTarefas}>
        <label htmlFor="item">Nova tarefa: </label>
        <input 
          type="text" 
          name="item" 
          value={dados}
          onChange={(e) => setDados(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      {listarTarefas}
    </div>
  )
}

export default Hooks;