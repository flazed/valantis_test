import { useState } from 'react';

type UseCopyReturn = {
  isCopied: boolean
  copyContent: (content: string) => void
};

export function useCopy(): UseCopyReturn {
  const [isCopied, setCopy] = useState<boolean>(false);

  const copyContent = (contentToCopy: string) => {
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1200);
      })
      .catch(() => setCopy(false));
  };

  return {
    isCopied,
    copyContent,
  };
}
