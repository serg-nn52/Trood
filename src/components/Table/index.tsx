/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React from 'react';
import Arrow from './Arrow';
import Row from './Row';
import style from './style.module.scss';

export type TItem = {
  id: number;
  name: string;
  status: string;
  type: string;
  conditions: string;
  volume: number;
  roi: number;
  free: number;
  hedge: number;
};

type TFiltres = {
  status: string;
  type: string;
};

interface IPropsTable {
  items: Array<TItem>;
  filtres?: TFiltres;
  sort?: string;
  onSort: (e: string) => void;
  onFilter: (e: { [key: string]: string }) => void;
  onBuy: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => void;
}

const Table: React.FC<IPropsTable> = (props) => {
  const { items, sort, filtres, onSort, onFilter, onBuy } = props;

  const fieldNames = [
    { name: 'Project' },
    { typeToken: 'Token type' },
    { conditions: 'Conditions' },
    { volume: 'Volume' },
    { roi: 'ROi' },
    { free: 'Free float' },
    { hedge: 'Insurance hedge' },
  ];

  return (
    <div className={style.table}>
      <nav
        onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) =>
          sort === (e.target as HTMLElement).id
            ? onSort(`-${(e.target as HTMLElement).id}`)
            : onSort((e.target as HTMLElement).id)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) =>
          sort === (e.target as HTMLElement).id
            ? onSort(`-${(e.target as HTMLElement).id}`)
            : onSort((e.target as HTMLElement).id)
        }
      >
        {fieldNames.map((el: { [key: string]: string | undefined }) => {
          return (
            <div id={Object.keys(el)[0]} key={Object.keys(el)[0]}>
              {Object.keys(el)[0] === 'name' && (
                <div>
                  <select
                    name="status"
                    id="status"
                    defaultValue={filtres?.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      onFilter({ [e.target.name]: e.target.value })
                    }
                  >
                    <option value="all">All</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                    <option value="red">Red</option>
                  </select>
                  <label htmlFor="project">{filtres?.status}</label>
                </div>
              )}
              {Object.keys(el)[0] === 'typeToken' && (
                <div>
                  <select
                    name="type"
                    id="type"
                    defaultValue={filtres?.type}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      onFilter({ [e.target.name]: e.target.value })
                    }
                  >
                    <option value="all">All</option>
                    <option value="TRST">TRST</option>
                    <option value="THT">THT</option>
                  </select>
                  <label htmlFor="type">{filtres?.type}</label>
                </div>
              )}
              {Object.values(el)[0]}
              <Arrow id={Object.keys(el)[0]} sort={sort} />
            </div>
          );
        })}
      </nav>
      <ul>
        {items.map((el) => (
          <li key={el.id}>
            <Row item={el} onBuy={onBuy} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Table;
