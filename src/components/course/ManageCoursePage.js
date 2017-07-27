import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseAction from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import { authorsFormattedForDropdown } from '../../selectors/authorSelector';

// Přidáním export před class docílím toho, že mimo default export (níže) se bude i exportovat tato komponenta bez vazeb na redux.
// Jedná se o takzvaný "named export".
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course });
  }

  // Validace formuláře na straně klienta
  isFormValid() {
    // Vytvořím objekt errors
    let errors = {};

    // Pokud některá z podmínek neplatí, přidám do objektu errors chybovou zprávu
    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
    }
    if (this.state.course.authorId === "") {
      errors.authorId = 'Author must be selected.';
    }

    // Do lokálního stavu komponenty nastavím nový stav errors
    this.setState({ errors });
    // Vrátím true, pokud objekt errors neobsahuje žádné keys (tj. je prázdný)
    return Object.keys(errors).length === 0;
  }

  saveCourse(event) {
    event.preventDefault();

    // Nejdříve zkontroluje validitu formuláře a pokud je nevalidní, ukládání přeruší
    if (!this.isFormValid()) {
      return;
    }

    // Pak se teprve pokusí odeslat data a zobrazí notifikaci o úspěchu/neúspěchu volání API
    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch((error) => {
        // V případě chyby nastaví state saving zpět na false a zobrazí notifikaci
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    // Po úspěšném uložení kurzu nastaví state saving na false (protože již bylo uloženo), zobrazí notifikaci a přesměruje
    this.setState({ saving: false });
    toastr.success('Course was saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        allAuthors={this.props.authors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id === id);
  return course.length > 0 ? course[0] : null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // Převzato z cesty 'course/:id'
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);