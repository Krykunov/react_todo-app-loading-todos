/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { filterTodos } from './utils/services';
import TodoItem from './components/TodoItem';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorNotification from './components/ErrorNotification';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  const filtered = useMemo(
    () => filterTodos(todos, activeFilter),
    [todos, activeFilter],
  );

  const loadTodos = useCallback(() => {
    setLoading(true);
    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(''), 3000);
    }
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} />

        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} loading={loading} />
          ))}
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
