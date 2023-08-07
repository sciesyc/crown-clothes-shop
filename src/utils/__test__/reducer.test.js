import { createAction } from '../reducer/reducer.utils';

const mockedCreateAction = describe('Reducer utils testing', () => {
  const testType = 'testType';

  it('createAction type testing', () => {
    expect(createAction(testType).type).toBe(testType);
  });

  it('createAction type and payload testing', () => {
    const testPayload = { id: 1, data: ['testData'] };

    expect(createAction(testType, testPayload).type).toBe(testType);
    expect(createAction(testType, testPayload).payload).toBe(testPayload);
  });
});
