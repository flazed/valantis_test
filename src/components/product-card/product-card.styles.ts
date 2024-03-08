import { tv } from 'tailwind-variants';

export const SProductCard = tv({
  slots: {
    card: 'p-2 flex flex-col border border-indigo-500 rounded-md bg-white hover:shadow-xl transition',
    cardInfo: 'grow border-b border-gray-200',
    cardTitle: 'text-lg',
    cardSubtitle: 'text-sm mb-3 grow text-gray-500 italic',
    cardPrice: 'mt-3 mb-4 text-md font-semibold',
    cardID: 'text-right text-xs underline italic transition cursor-pointer',
  },
});
