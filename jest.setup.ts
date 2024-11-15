import '@testing-library/jest-dom';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

global.ReadableStream = jest.fn();
