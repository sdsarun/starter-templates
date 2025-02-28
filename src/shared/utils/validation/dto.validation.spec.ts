import { plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { validateDTO } from './dto.validation';

describe('validateDTO', () => {
  class DTO {
    @IsString()
    property: string;
  }

  const failedDTO = plainToInstance(DTO, {});

  beforeEach(() => jest.clearAllMocks());

  it('should throw error by default', () => {
    expect(validateDTO(failedDTO)).rejects.toThrow(Error);
  });

  it('should not throw error if set throwErrorOnValidateFailed to false', () => {
    expect(
      validateDTO(failedDTO, { throwErrorOnValidateFailed: false }),
    ).resolves.toHaveLength(1);
  });

  it('should call onValidateDTOFailed when validation fails', async () => {
    const onValidateDTOFailedMock = jest.fn();

    await validateDTO(failedDTO, {
      throwErrorOnValidateFailed: false,
      onValidateDTOFailed: onValidateDTOFailedMock,
    });

    expect(onValidateDTOFailedMock).toHaveBeenCalled();
    expect(onValidateDTOFailedMock).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should not call onValidateDTOFailed when validation succeeds', async () => {
    class ValidDTO {
      @IsString()
      property: string;
    }

    const validDTO = plainToInstance(ValidDTO, { property: 'valid value' });

    const onValidateDTOFailedMock = jest.fn();

    const errors = await validateDTO(validDTO, {
      throwErrorOnValidateFailed: false,
      onValidateDTOFailed: onValidateDTOFailedMock,
    });

    expect(errors).toEqual([]);
    expect(onValidateDTOFailedMock).not.toHaveBeenCalled();
  });

  it('should throw an error when throwErrorOnValidateFailed is true and validation fails', async () => {
    await expect(
      validateDTO(failedDTO, { throwErrorOnValidateFailed: true }),
    ).rejects.toThrow(Error);
  });

  it('should call onValidateDTOFailed callback with errors if validation fails and throwErrorOnValidateFailed is false', async () => {
    const onValidateDTOFailedMock = jest.fn();

    await validateDTO(failedDTO, {
      throwErrorOnValidateFailed: false,
      onValidateDTOFailed: onValidateDTOFailedMock,
    });

    expect(onValidateDTOFailedMock).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should not call onValidateDTOFailed when there are no errors and validation passes', async () => {
    class ValidDTO {
      @IsString()
      property: string;
    }

    const validDTO = plainToInstance(ValidDTO, { property: 'valid value' });

    const onValidateDTOFailedMock = jest.fn();

    await validateDTO(validDTO, {
      throwErrorOnValidateFailed: false,
      onValidateDTOFailed: onValidateDTOFailedMock,
    });

    expect(onValidateDTOFailedMock).not.toHaveBeenCalled();
  });
});
