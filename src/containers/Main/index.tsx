import React, { useState } from 'react';
import Table, { TItem } from 'components/Table';
import style from './style.module.scss';

const Main: React.FC = () => {
  const items = [
    {
      id: 1,
      name: 'Pyshky.net',
      status: 'green',
      type: 'TRST',
      conditions: 'x2,6 months',
      volume: 120000,
      roi: 4,
      free: 20,
      hedge: 20,
    },
    {
      id: 2,
      name: 'NFT-Flowershop',
      status: 'yellow',
      type: 'THT',
      conditions: 'x4,2 years',
      volume: 80000,
      roi: 23,
      free: 12,
      hedge: 0,
    },
    {
      id: 4,
      name: 'Web3 P2P University',
      status: 'red',
      type: 'TRST',
      conditions: 'x2,1 years',
      volume: 200000,
      roi: 6,
      free: 1,
      hedge: 0,
    },
  ];

  const initialFilters = {
    status: 'all',
    type: 'all',
  };
  const initialSortName = 'name';

  const [filters, setFilters] = useState(initialFilters);
  const [sortName, setSortName] = useState(initialSortName);

  const filterItems = items
    .filter((item: TItem) => {
      if (filters.status === 'all') return item;
      return item.status === filters.status;
    })
    .filter((item) => {
      if (filters.type === 'all') return item;
      return item.type === filters.type;
    })
    .sort((a: TItem, b: TItem) => {
      if (sortName[0] !== '-') {
        if (sortName === 'typeToken') {
          return a.type > b.type ? 1 : -1;
        }
        return a[sortName as keyof TItem] > b[sortName as keyof TItem] ? 1 : -1;
      }
      if (sortName === '-typeToken') {
        return a.type < b.type ? 1 : -1;
      }
      return a[sortName.slice(1) as keyof TItem] <
        b[sortName.slice(1) as keyof TItem]
        ? 1
        : -1;
    });

  const onSort = (value: string) => {
    setSortName(value);
  };

  const onFilter = (obj: { [key: string]: string }) => {
    setFilters((prev) => {
      return { ...prev, ...obj };
    });
  };

  const onBuy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const buttons: HTMLElement[] = [
      ...(document.querySelectorAll('.buyBtn') as any),
    ];
    buttons.forEach((el) => {
      el.style.backgroundColor = '';
    });
    (e.target as HTMLElement).style.backgroundColor = 'pink';
  };

  return (
    <div className={style.wrapper}>
      <Table
        items={filterItems}
        filtres={filters}
        sort={sortName}
        onSort={onSort}
        onFilter={onFilter}
        onBuy={onBuy}
      />
    </div>
  );
};

export default Main;
