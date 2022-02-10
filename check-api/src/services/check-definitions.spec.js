import {
  getAllCheckDefinitions,
  getCheckDefinitionById,
  insertCheckDefinition,
} from './check-definitions';
import * as Repository from '../repositories/check-definitions.js';
import { insertCheckDefinitionsValidator } from '../validators/check-definitions.js';
import EntityNotFoundError from '../errors/EntityNotFoundError';
import jobRunnerRequest from '../utils/job-runner-request.js';

jest.mock('../utils/job-runner-request.js');

describe('check definitions service', () => {
  describe('getAllCheckDefinitions', () => {
    beforeAll(() => {
      jest.spyOn(Repository, 'getAll').mockResolvedValue([{ foo: 'bar' }]);
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    describe('when the function is called', () => {
      it('should resolve to a collection', () => {
        expect(getAllCheckDefinitions()).resolves.toEqual([{ foo: 'bar' }]);
      });

      it('should call getAll once', () => {
        expect(Repository.getAll).toBeCalledTimes(1);
      });
    });
  });

  describe('getCheckDefinitionById', () => {
    describe('when the id exists', () => {
      beforeAll(() => {
        jest.spyOn(Repository, 'getById').mockResolvedValue({ foo: 'bar' });
      });

      afterAll(() => {
        jest.resetAllMocks();
      });

      describe('when the function is called', () => {
        it('should resolve to an item', () => {
          expect(getCheckDefinitionById('fake-id')).resolves.toEqual({
            foo: 'bar',
          });
        });

        it('should call getById once', () => {
          expect(Repository.getById).toBeCalledTimes(1);
        });

        it('should call getById with the given id', () => {
          expect(Repository.getById).toBeCalledWith('fake-id');
        });
      });
    });

    describe('when the id does not exists', () => {
      beforeAll(() => {
        jest.spyOn(Repository, 'getById').mockResolvedValue(null);
      });

      afterAll(() => {
        jest.resetAllMocks();
      });

      describe('when the function is called', () => {
        it('should reject and throw EntityNotFoundError', () => {
          expect(getCheckDefinitionById('fake-id')).rejects.toThrow(
            EntityNotFoundError
          );
        });

        it('should call getById once', () => {
          expect(Repository.getById).toBeCalledTimes(1);
        });

        it('should call getById with the given id', () => {
          expect(Repository.getById).toBeCalledWith('fake-id');
        });
      });
    });
  });

  describe('insertCheckDefinition', () => {
    describe('when the validation have no errors', () => {
      beforeAll(() => {
        jest
          .spyOn(insertCheckDefinitionsValidator, 'validate')
          .mockReturnValue({ value: { foo: 'bar' } });
      });

      afterAll(() => {
        jest.resetAllMocks();
      });

      describe('when the insert function works', () => {
        describe('when the stored job is activated', () => {
          beforeAll(() => {
            jest
              .spyOn(Repository, 'insert')
              .mockResolvedValue({ id: 'fake-id', activated: true });
          });

          describe('when the job runner returns ok', () => {
            beforeAll(() => {
              jobRunnerRequest.mockResolvedValue({ ok: true });
            });

            describe('when the function is called', () => {
              it('should resolve the new id', () => {
                expect(insertCheckDefinition({ foo: 'bar' })).resolves.toEqual(
                  'fake-id'
                );
              });

              it('should call the validate function once', () => {
                expect(
                  insertCheckDefinitionsValidator.validate
                ).toBeCalledTimes(1);
              });

              it('should call the validate function with the sent object and no abort early config', () => {
                expect(insertCheckDefinitionsValidator.validate).toBeCalledWith(
                  { foo: 'bar' },
                  { abortEarly: false }
                );
              });

              it('should call the insert function once', () => {
                expect(Repository.insert).toBeCalledTimes(1);
              });

              it('should call the insert function with the sent object', () => {
                expect(Repository.insert).toBeCalledWith({ foo: 'bar' });
              });
            });
          });
        });
      });
    });
  });
});
