import { tv } from 'tailwind-variants';

export const SPaginate = tv({
  slots: {
    container: 'flex justify-center text-2xl mb-3',
    page: 'mx-3 text-center',
    navigate: 'flex justify-center w-10 h-10 rounded-md bg-indigo-400 text-white duration-300 disabled:opacity-50 enabled:hover:bg-indigo-600',
  },
});
