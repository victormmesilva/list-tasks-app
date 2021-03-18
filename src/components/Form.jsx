import React, { useEffect, useState } from 'react';

// stateful component
// tem useState/gerencia estado
// gera re-renderização

// Criar um form

const Form = (props) => {
  const { updateOrCreateTask, taskToEdit } = props;

  const [descricao, setDescricao] = useState('');
  const [finalizada, setFinalizada] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setDescricao(taskToEdit.descricao);
      setFinalizada(taskToEdit.finalizada);
    }
  }, [taskToEdit]);


  // const useEffectCallback = () => {
  //   console.log('useEffect:descricao', descricao);
  // };
  // useEffect(useEffectCallback, [descricao, finalizada]) // quando descricao e finalizada mudarem roda o callback

  // useEffect(() => {
  //   console.log('useEffect:finalizada', finalizada);
  // }, [finalizada])


  const handleDescricaoChange = (event) => {
    // target é o element que a gente ta usando (Input) <input id="descricao" value="a">
    // console.log(event.target);
    const { value } = event.target;
    setDescricao(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // verifica se taskToEdit tem alguma coisa
    // verifica se tem id 
    if (taskToEdit && taskToEdit.id) {
      // se tem id quer dizer que é uma edição
      updateOrCreateTask({
        id: taskToEdit.id,
        descricao, // substitui pela descricao editada
        finalizada, // substitui pela finalizada editada
      });
    } else { // se não tem id quer dizer que é uma task nova
      updateOrCreateTask({
        descricao,
        finalizada,
      });
    }
    setDescricao('');
    setFinalizada(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*
          id
          descricao
          finalizada
        */}
      <div>
        <label htmlFor="descricao">Descrição: </label>
        <input
          id="descricao"
          value={descricao}
          onChange={handleDescricaoChange}
        />
      </div>
      {/* <div>
        <label for="finalizada">Finalizada:</label>
        <select
          id="finalizada"
          value={finalizada}
          onChange={handleFinalizadaChange}
        >
          <option value={1}>Sim</option>
          <option value={0}>Não</option>
        </select>
      </div> */}
      <div>
        Finalizada:
        <input
          type="radio"
          name="finalizada"
          id="yes"
          checked={finalizada === true}
          onChange={() => setFinalizada(true)}
        />
        <label htmlFor="yes">Sim</label>

        <input
          type="radio"
          name="finalizada"
          id="no"
          checked={finalizada === false}
          onChange={() => setFinalizada(false)}
        />
        <label htmlFor="no">Não</label>

        {/*
          <select
            id="finalizada"
            value={finalizada}
            onChange={handleFinalizadaChange}
          >
            <option value={1}>Sim</option>
            <option value={0}>Não</option>
          </select>
        */}
      </div>

      <div>
        <button
          type="submit"
        >
          {taskToEdit ? 'Salvar' : 'Cadastrar tarefa'}
        </button>
      </div>
    </form>
  );
}

export default Form;