import React from 'react';

// stateless component
// componente sem estado
// não tem useState
// não gera re-renderização
const Table = (props) => {
  const { title, tasks, handleClick, delTask, editTask, showActions } = props;

  return (
    <table>
      <thead>
        <tr><th colSpan="4">{title}</th></tr>
        <tr>
          <th>id</th>
          <th>descricao</th>
          <th>finalizada</th>
          {showActions && <th>ações</th>}
        </tr>
      </thead>
      <tbody>
        {
          // aqui eu transformo um array de objetos em um array de jsx tr 
          tasks
            .map(task => (
              <tr key={task.id}>
                <th>{task.id}</th>
                <th>{task.descricao}</th>
                <th>{task.finalizada ? 'Sim' : 'Não'}</th>
                {
                  showActions &&
                  <th>
                    {
                      !task.finalizada &&
                      <button
                        onClick={() => handleClick(task.id)}
                      >
                        Finalizar
                    </button>
                    }
                    <button
                      onClick={() => delTask(task.id)}
                    >
                      Excluir
                  </button>
                    <button
                      onClick={() => editTask(task)}
                    >
                      Editar
                  </button>
                  </th>
                }
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

export default Table;