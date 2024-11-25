import React from 'react';

import { Todo } from '../types/Todo';
import { filters } from '../data/filters';
import FilterButton from './FilterButton';

type Props = {
  todos: Todo[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const Footer: React.FC<Props> = ({ todos, activeFilter, setActiveFilter }) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filterItem => {
          return (
            <FilterButton
              key={filterItem}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filterItem={filterItem}
            />
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
