import { ChangeEvent, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@store/hooks';

import { Container } from '@components/container/container';
import { SFilters } from '@components/filters/filters.styles';

import { applyFilters, clearFilters } from '@store/slices/marketSlice';
import { getMarketFields, getMarketFilteredProducts } from '@store/thunks/market';

export function Filters() {
  const {
    brands,
    filters: { product, price, brand },
  } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const select = useRef(null);
  const handleApplyFilters = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let dataValue;

    if (event.target === select.current) {
      dataValue = (event.target as HTMLSelectElement).value;
    } else {
      dataValue = Number.isNaN((event.target as HTMLInputElement).valueAsNumber)
        ? event.target.value
        : Number(event.target.value);
    }

    const data = {
      [event.target.name]: dataValue,
    };

    dispatch(applyFilters(data));
    if (data[event.target.name]) dispatch(getMarketFilteredProducts(data));
  };

  const handleClearFiltersClick = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    dispatch(getMarketFields({
      field: 'brand',
    }));
  }, []);

  const { container, fields, cancel } = SFilters();

  return (
    <Container>
      <div className={container()}>
        <input
          className={fields()}
          value={product}
          onChange={handleApplyFilters}
          name="product"
          type="text"
          placeholder="Название"
        />
        <select
          className={fields()}
          name="brand"
          onChange={handleApplyFilters}
          value={brand}
          ref={select}
        >
          {brands.map((el) => (
            <option
              key={el}
              value={el || ''}
            >
              {el || 'Бренд'}
            </option>
          ))}
        </select>
        <input
          className={fields()}
          value={price}
          onChange={handleApplyFilters}
          name="price"
          type="number"
          placeholder="Цена"
        />
        <button
          type="button"
          className={cancel()}
          onClick={handleClearFiltersClick}
        >
          Сбросить
        </button>
      </div>
    </Container>
  );
}
