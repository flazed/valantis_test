import { tv } from 'tailwind-variants';

export const SFilters = tv({
  slots: {
    container: 'grid md:grid-cols-3 xl:grid-cols-4 gap-5 mt-3 mb-10',
    fields: 'border rounded-md px-3 border-violet-600 focus:border-2 focus:border-violet-600 transition outline-none py-1',
    cancel: 'text-lg font-bold bg-gray-400 rounded-md text-white py-1 duration-300 enabled:hover:bg-gray-600',
  },
});
