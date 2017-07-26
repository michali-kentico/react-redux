import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving) {
  // Props předané komponentě - lze předat i přímo, ale z důvodu čitelnosti je lepší je nejdříve props definovat a pak je předat pomocí {...props}
  let props = {
    course: {}, saving: saving, errors: {},
    onSave: () => {},
    onChange: () => {}
  };
  let renderer = TestUtils.createRenderer();
  // Vyrenderuje komponentu
  renderer.render(<CourseForm {...props}/>);
  let output = renderer.getRenderOutput();

  return { props, output, renderer };
}

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    // Výstup z renderování komponenty si uložím do output
    const { output } = setup(false);
    // Porovnám, zda typ root tagu je 'form'
    expect(output.type).toBe('form');

    // props.children obsahuje pole všech vnořených elementů, první dva elementy pojmenuji a uložím do proměnných
    // pomocí let [ h1, input ]
    let [ h1, input ] = output.props.children;

    // Porovnám, zda typ prvního elementu souhlasí a zda property name druhého elementu odpovídá 'title'
    expect(h1.type).toBe('h1');
    expect(input.props.name).toBe('title');
  });

  it('save button is labeled "Save" when not saving', () => {
    // Pomocí parametrů mohu upravovat inicializaci komponenty a testovat její chování závislé na props
    const { output } = setup(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.children).toBe('Save');
  });
  it('save button is labeled "Saving..." when saving', () => {
    const { output } = setup(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.children).toBe('Saving...');
  });
});