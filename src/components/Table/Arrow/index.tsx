import React from 'react';
import down from 'icons/down-arrow.png';
import up from 'icons/up-arrow.png';
import style from './style.module.scss';

const Arrow: React.FC<{ sort?: string; id: string }> = ({ sort, id }) => {
  if (sort === id || sort?.slice(1) === id) {
    return sort[0] === '-' ? (
      <img className={style.arrow} src={down} alt="down" />
    ) : (
      <img className={style.arrow} src={up} alt="up" />
    );
  }
  return null;
};

export default Arrow;
