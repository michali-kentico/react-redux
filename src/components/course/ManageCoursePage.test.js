import React from 'react';
import expect from 'expect';
import { mount, shallow} from 'enzyme';
// Pro importování výchozího exportu (default export) se zapíše
// import ManageCoursePage from './ManageCoursePage'; // eslint-disable-line import/no-named-as-default
// Eslint však bude zobrazovat chybu, proto je vhodné pro tento řádek eslint vypnout
// ale pokud chceme importovat pouze část, použijeme tzv. "named import", kdy do {} uvedeme název importované části,
// v tomto případě se jedná o stejný název
import { ManageCoursePage } from './ManageCoursePage';

describe('Manage Course Page', () => {
  it('sets error message when trying to save empty title', () => {
    // Definice props
    const props = {
      authors: [],
      course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' },
      // Mockování chování funkce (resp. akce) saveCourse()
      actions: { saveCourse: () => { return Promise.resolve(); }}
    };

    const wrapper = mount(<ManageCoursePage {...props} />);
    const saveButton = wrapper.find('button');
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});