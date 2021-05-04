import { ServiceError } from '@grpc/grpc-js';
import log from '../log';

export const unaryHandler = (
  name: string,
  resolve: (res: any) => void,
  reject: (err: any) => void
) => (err: ServiceError | null, res: any): void => {
  log.debug(
    `${name} response ${JSON.stringify(res.toObject())} ${
      err != null ? `, err ${JSON.stringify(err)}` : ''
    }`
  );
  if (err != null) {
    log.error(`GRPC error ${JSON.stringify(err)}`);
    reject(err);
  } else {
    resolve(res);
  }
};
