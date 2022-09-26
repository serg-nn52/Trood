/* eslint-disable no-unused-vars */
import React from 'react';
import { TItem } from '..';
import style from './style.module.scss';

type TRow = {
  item: TItem;
  onBuy: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
  ) => void;
};

const Row: React.FC<TRow> = (props) => {
  const { item, onBuy } = props;
  return (
    <div className={style[`row-${item.status}`]}>
      <div>
        <div className={style[item.status]} />
        {item.name}
      </div>
      <div>{item.type}</div>
      <div>{item.conditions.replace(',', ', ')}</div>
      <div>$ {item.volume.toLocaleString()}</div>
      <div>{item.roi} %</div>
      <div>{item.free}</div>
      <div>{item.hedge} %</div>
      <div>
        <button
          className="buyBtn"
          type="button"
          onClick={(e) => onBuy(e, item.id)}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Row;
