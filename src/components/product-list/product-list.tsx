import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { getMarketProducts, getMarketProductsContent } from '@store/thunks/market';

import { ProductCard } from '@components/product-card/product-card';
import { Container } from '@components/container/container';

import { SProductList } from '@components/product-list/product-list.styles';
import { Loader } from '@components/loader/loader';

export function ProductList() {
  const dispatch = useAppDispatch();

  const {
    offset,
    limit,
    itemsIdList,
    itemsDataList,
    loading,
    filters: { isFilterEnabled },
  } = useAppSelector((store) => store.market);
  function getPageIDs() {
    dispatch(
      getMarketProducts({ offset: offset * limit, limit }),
    );
  }

  function getPageData() {
    dispatch(
      getMarketProductsContent({ ids: itemsIdList[offset] }),
    );
  }

  useEffect(() => {
    if (!itemsIdList[offset] && !loading && !isFilterEnabled) {
      getPageIDs();
    }
  }, [offset, isFilterEnabled]);

  useEffect(() => {
    const currentPage = offset;
    if (
      !itemsDataList[currentPage]
      && itemsIdList[currentPage]
      && itemsIdList[currentPage].length > 0
    ) {
      getPageData();
    }
  }, [itemsIdList, offset]);

  return (
    <Container>
      {
      loading
        ? <Loader />
        : (
          <div className={SProductList()}>
            {itemsDataList[offset] && itemsDataList[offset]
              .map((product) => (
                <ProductCard
                  key={product.id}
                  item={product}
                />
              ))}
          </div>
        )
    }
    </Container>
  );
}
