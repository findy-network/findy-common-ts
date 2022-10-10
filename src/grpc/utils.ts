import { ServiceError } from '@grpc/grpc-js';
import log from '../log';

export const unaryHandler =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (name: string, resolve: (res: any) => void, reject: (err: any) => void) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (err: ServiceError | null, res: any): void => {
      if (err != null) {
        log.error(`${name}: GRPC error ${JSON.stringify(err)}`);
        reject(err);
      } else if (res == null) {
        log.error(`Null GRPC response for ${name}`);
        reject(new Error('No response for GRPC call'));
      } else {
        log.debug(`${name} response ${JSON.stringify(res.toObject())}`);
        resolve(res);
      }
    };
