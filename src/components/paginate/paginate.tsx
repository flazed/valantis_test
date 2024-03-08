import { Container } from '@components/container/container';

import { SPaginate } from '@components/paginate/paginate.styles';

interface PaginateProps {
  onClick: (page: number) => void
  currentPage: number
  prevDisabled: boolean
  nextDisabled: boolean
}

export function Paginate(props: PaginateProps) {
  const {
    onClick, currentPage, prevDisabled, nextDisabled,
  } = props;

  const {
    container, page, navigate,
  } = SPaginate();

  const handlePaginateButtonClick = (isNext: boolean): void => {
    onClick(currentPage + (isNext ? 1 : -1));
  };

  return (
    <Container>
      <div className={container()}>
        <button
          type="button"
          onClick={() => handlePaginateButtonClick(false)}
          className={navigate()}
          disabled={prevDisabled}
        >
          {'<'}
        </button>
        <span className={page()}>{currentPage}</span>
        <button
          type="button"
          onClick={() => handlePaginateButtonClick(true)}
          className={navigate()}
          disabled={nextDisabled}
        >
          {'>'}
        </button>
      </div>
    </Container>
  );
}
