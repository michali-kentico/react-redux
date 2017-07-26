import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';

function setup(saving) {
  // Props předané komponentě - lze předat i přímo, ale z důvodu čitelnosti je lepší je nejdříve props definovat a pak je předat pomocí {...props}
  const props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe('CourseForm via Enzyme', () => {
  it('popis testu (např. renders form and h1)', () => {
    // Výstup z renderování komponenty si uložím do wrapper
    const wrapper = setup(false);
    // Najdu všechny 'form' tagy (ty se uloží do pole) a porovná, zda souhlasí počet
    expect(wrapper.find('form').length).toBe(1);
    // Najdu tag 'h1' a porovnám jeho text
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    // Pomocí parametrů mohu upravovat inicializaci komponenty a testovat její chování závislé na props
    const wrapper = setup(false);
    // Najdu tag button a porovnám jeho text
    expect(wrapper.find('button').text()).toBe('Save');
  });
  it('save button is labeled "Saving..." when saving', () => {
    // Výstup z renderování komponenty si uložím do wrapper
    const wrapper = setup(true);
    expect(wrapper.find('button').text()).toBe('Saving...');
  });
});