import expect from 'expect';
import { authorsFormattedForDropdown } from './authorSelector';

describe('Author Selectors', () => {
  it('authorsFormattedForDropdown should return author data formatted for use in a dropdown', () => {
    const authors = [
      {id: 'test-author-1', firstName: 'Test1', lastName: 'Last1'},
      {id: 'test-author-2', firstName: 'Test2', lastName: 'Last2'}
    ];

    const expected = [
      {value: 'test-author-1', text: 'Test1 Last1'},
      {value: 'test-author-2', text: 'Test2 Last2'}
    ];

    expect(authorsFormattedForDropdown(authors)).toEqual(expected);
  });
});