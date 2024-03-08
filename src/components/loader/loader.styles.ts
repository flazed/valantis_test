import { tv } from 'tailwind-variants';

export const SLoader = tv({
  slots: {
    container: 'w-96 h-96 mx-auto flex justify-center items-center',
    loader: 'h-56 w-56 text-indigo-400 animate-spin rounded-full border-8 border-solid border-current border-b-transparent',
  },
});
