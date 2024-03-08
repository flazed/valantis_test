import { useCopy } from '@hooks/useCopy';

import { SProductCard } from '@components/product-card/product-card.styles';

import { Item } from '@common/market.types';
import classNames from 'classnames';

type ProductCardProps = {
  item: Item
};

export function ProductCard({ item }: ProductCardProps) {
  const {
    id, product, brand, price,
  } = item;

  const { isCopied, copyContent } = useCopy();

  const {
    card, cardInfo, cardTitle, cardSubtitle, cardPrice, cardID,
  } = SProductCard();

  return (
    <div className={card()}>
      <div className={cardInfo()}>
        <span className={cardTitle()}>{product}</span>
        {' '}
        {
          brand && (
          <span className={cardSubtitle()}>
            (
            {brand}
            )
          </span>
          )
        }
      </div>
      <div className={cardPrice()}>
        {price}
        {' '}
        ₽
      </div>
      <button
        type="button"
        onClick={() => copyContent(id)}
        className={classNames(cardID(), { 'text-green-600': isCopied })}
      >
        {id}
      </button>
    </div>
  );
}
