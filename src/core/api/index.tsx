import { FormInputs } from '@components/FormInput';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const signin = (formData: FormInputs) => (
  fetch(`${BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Set-Cookie': 'HttpOnly',
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res)
    .catch((err) => console.error(err))
);

export const signup = (formData: FormInputs) => (
  fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Set-Cookie': 'HttpOnly',
    },
    body: JSON.stringify(formData),
  })
    .then((res: Response) => res)
    .catch((err: Error) => console.error(err))
);
