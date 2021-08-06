import { Response, Request } from 'express';

import { ServerOAuthAPI } from '../api/oauth.api';
import { ServerAuthAPI } from '../api/auth.api';
import { getHeadersWithCookies, setCookies } from '../server.utils';

export class AuthController {
  public static profile(req: Request, res: Response) {
    ServerAuthAPI.profile({
      headers: getHeadersWithCookies(req),
    })
      .then(async (response) => {
        const data = await response.json();
        res.send(data);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static OAuthGetClientId(req: Request, res: Response) {
    const { query } = req;
    if (!query?.redirect_uri) return res.sendStatus(400);
    ServerOAuthAPI.OAuthGetClientId({ redirect_uri: (query?.redirect_uri as string) })
      .then(async (response) => {
        res.send(await response.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static OAuthSignin(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    ServerOAuthAPI.OAuthSignin(req.body)
      .then(async (fetchResponse) => {
        setCookies(fetchResponse, res);
        res.send(await fetchResponse.text());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static signin(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    ServerAuthAPI.signin(req.body)
      .then(async (fetchResponse) => {
        setCookies(fetchResponse, res);

        res.send(await fetchResponse.text());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static signup(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    ServerAuthAPI.signup(req.body)
      .then(async (fetchResponse) => {
        setCookies(fetchResponse, res);
        res.send(await fetchResponse);
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }

  public static logout(req: Request, res: Response) {
    ServerAuthAPI.logout({
      headers: getHeadersWithCookies(req),
    })
      .then(async (response) => {
        res.clearCookie('uuid');
        res.clearCookie('authCookie');
        res.send(await response.text());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }
}
