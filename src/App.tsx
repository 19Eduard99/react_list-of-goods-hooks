import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

interface Values {
  items: string[];
  isReverse: boolean;
  sortByLength: boolean;
  sortByAlph: boolean;
  reset: boolean;
}

const initialValues: Values = {
  items: goodsFromServer,
  isReverse: false,
  sortByLength: false,
  sortByAlph: false,
  reset: false,
};

export const App: React.FC = () => {
  const [foodItems, setFoodItems] = useState(initialValues);

  const sortByLength = (isReverse: boolean) => () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      return isReverse ? b.length - a.length : a.length - b.length;
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortByLength: true,
        sortByAlph: false,
        reset: true,
      };
    });
  };

  const sortByAlph = (isReverse: boolean) => () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      return isReverse ? b.localeCompare(a) : a.localeCompare(b);
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortByLength: false,
        sortByAlph: true,
        reset: true,
      };
    });
  };

  const reverse = () => {
    setFoodItems(prev => {
      const newItems = [...prev.items].reverse();
      const isInitial = newItems.join() === goodsFromServer.join();

      return {
        ...prev,
        items: newItems,
        isReverse: !prev.isReverse,
        reset: !isInitial,
      };
    });
  };

  const reset = () => {
    setFoodItems(() => ({ ...initialValues }));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlph(foodItems.isReverse)}
          type="button"
          className={`button ${foodItems.sortByAlph ? 'is-info' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength(foodItems.isReverse)}
          type="button"
          className={`button ${foodItems.sortByLength ? 'is-success' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button ${foodItems.isReverse ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>

        {foodItems.reset && (
          <button onClick={reset} type="button" className="button is-danger">
            Reset
          </button>
        )}
      </div>

      <ul>
        {foodItems.items.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
