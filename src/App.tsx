import { useEffect, useState } from 'react';

import { Filters } from '@components/filters/filters';
import { ProductList } from '@components/product-list/product-list';
import { Paginate } from '@components/paginate/paginate';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { changeOffset } from '@store/slices/marketSlice';

export function App() {
  const {
    offset, itemsIdList, limit, loading,
  } = useAppSelector((store) => store.market);
  const dispatch = useAppDispatch();

  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);

  const handleChangePage = (page: number): void => {
    dispatch(changeOffset({ newOffset: page - 1 }));
  };

  useEffect(() => {
    setPrevBtnDisabled(loading || offset === 0);
    setNextBtnDisabled(loading || !itemsIdList[offset] || itemsIdList[offset].length < limit);
  }, [offset, itemsIdList, loading]);

  return (
    <>
      <Filters />
      <ProductList />
      <Paginate
        currentPage={offset + 1}
        onClick={handleChangePage}
        prevDisabled={prevBtnDisabled}
        nextDisabled={nextBtnDisabled}
      />
    </>
  );
}
