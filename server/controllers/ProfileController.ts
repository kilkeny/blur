import { Response, Request } from 'express';

import { ServerProfileAPI } from '../api/profile.api';
import { getHeadersWithCookies } from '../server.utils';

export class ProfileController {
  public static change(req: Request, res: Response) {
    if (!req.body) return res.sendStatus(400);

    ServerProfileAPI.editDataProfile(req.body, {
      headers: getHeadersWithCookies(req),
    })
      .then(async (response) => {
        res.send(await response.json());
      })
      .catch((error) => {
        res.status(error.status).send(error.statusText);
      });
  }
}
