import './App.css';
import React, { /* useEffect, */ useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';

const mockTasks = [
  {
    id: 1,
    descricao: "Criar react app",
    finalizada: false,
  },
  {
    id: 2,
    descricao: "Criar form",
    finalizada: false,
  },
  {
    id: 3,
    descricao: "Criar table",
    finalizada: false,
  },
];
let counter = mockTasks.length;

function App() {
  const [tasks, setTasks] = useState(mockTasks); // inicia o component com o mockTasks
  const [taskToEdit, setTaskToEdit] = useState(null);

  const updateOrCreateTask = (task) => {
    if (task.id) { // se a task tem id a gente vai substituir/editar
      const newTasks = tasks.map(tsk => {
        if (tsk.id === task.id) {
          return task;
        }
        return tsk;
      });
      setTasks(newTasks);
    } else { // se não tem id a gente adiciona um id
      counter = counter + 1; // adiciona o prox id no counter

      const newTask = {
        id: counter,
        ...task,
      }

      console.log('newTask', newTask);
      // setTasks sem callback
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
    }


    // cria a task

    // prevTaks sem a task nova
    // newTasks com a task nova

    // const setTasksCallback = stateAtual => {
    //   console.log('stateAtual', stateAtual);

    //   const newState = [...stateAtual, task]; // adicionamos a task nova a lista de tasks
    //   console.log('newState', newState);
    //   return newState; // retorna o novo state
    // }

    // adiciona task
    // setTasks para adicionar a task nova a lista de tasks

    // setTasks com callback
    // setTasks(setTasksCallback);


    // debugger
    // mandar a task / fazer POST
  }

  const handleClick = (id) => {
    const newTasks = tasks.map(task => {
      // procura pela task que queremos atualizar
      if (task.id === id) {
        // achamos? criamos um objeto novo com a prop atualizada e retornamos ela pro map
        return {
          ...task,
          finalizada: true,
        }
      }

      // não é essa ? retorna a task igual
      return task;
    })

    setTasks(newTasks);
  }

  // deletarNota(index) {
  //   let arrayNotas = this.state.notas;
  //   arrayNotas.splice(index, 1);
  //   this.setState({ notas: arrayNotas });
  // }

  const delTask = (id) => {
    // filtra todas as tasks com id diferente da que a gente quer excluir
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  const editTask = (taskParaEditar) => {
    // const taskParaEditar = tasks.find(task => task.id === id);
    setTaskToEdit(taskParaEditar); // seta no taskToEdit para as informações aparecerem no formulário
    console.log('editTask::taskParaEditar', taskParaEditar);
  }

  return (
    <div className="App">
      <Form
        updateOrCreateTask={updateOrCreateTask}
        taskToEdit={taskToEdit}
      />
      <Table
        //props
        title="Todas"
        showActions
        tasks={tasks}
        handleClick={handleClick}
        delTask={delTask}
        editTask={editTask}
      />
      <Table
        //props
        title="Finalizadas"
        tasks={tasks.filter(task => task.finalizada)}
        handleClick={handleClick}
      />
      <Table
        //props
        title="Pendentes"
        tasks={tasks.filter(task => !task.finalizada)}
        handleClick={handleClick}
      />
    </div>
  );
}

export default App;
