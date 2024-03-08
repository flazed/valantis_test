import { md5 } from 'js-md5';

import { getCurrentTimestamp } from '@services/timestamp';

import { Response } from '@common/api.types';

const apiPassword: string = import.meta.env.VITE_API_PASS ?? '';

type FetchMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type DataBody<T> = {
  action: string
  params: T
};

export async function call<T, R>(url: string, method: FetchMethod, data: DataBody<T>)
  : Promise<Response<R>> {
  const timestamp = getCurrentTimestamp();

  const response = await fetch(url, {
    method,
    headers: {
      'X-Auth': md5(`${apiPassword}_${timestamp}`),
      'Content-Type': 'application/json; charset=utf8',
    },
    body: JSON.stringify(data),
  })
    .then((resp) => {
      if (resp.status === 200) {
        return resp.json();
      }

      return resp.text().then((error) => {
        throw new Error(error);
      });
    })
    .catch((error) => {
      console.error(`Error when call data with ID: ${error.message}`);
      return Error(error.message);
    });

  if (!response.result) {
    return call(url, method, data);
  }

  return response;
}
