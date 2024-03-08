import { SLoader } from '@components/loader/loader.styles';

export function Loader() {
  const { container, loader } = SLoader();

  return (
    <div className={container()}>
      <div
        className={loader()}
      />
    </div>
  );
}
