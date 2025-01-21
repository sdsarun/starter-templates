import { validate, ValidationError } from 'class-validator';
import { ServiceActionOptions } from 'src/shared/types/service-action';

export async function validateDTO<T extends object>(
  dto: T,
  options?: ServiceActionOptions,
): Promise<ValidationError[]> {
  const errors = await validate(dto, { whitelist: true });

  if (errors.length) {
    if (typeof options?.onError === 'function') {
      options?.onError(errors);
    } else {
      if (options?.throwErrorOnValidateFailed) {
        throw new Error(errors.toString());
      } else {
        return errors;
      }
    }
  }
}
