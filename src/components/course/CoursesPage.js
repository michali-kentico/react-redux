import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

// 3. varianta
import { bindActionCreators } from 'redux';


// Container komponenta
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props,  context);

    // Lokální stav komponenty
    this.state = {
      course: { title: "" }
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSaved = this.onClickSaved.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course });
  }

  onClickSaved() {
    // 1. varianta - nepoužívat mapDispatchToProps a volat dispatch přímo
    // this.props.dispatch(courseActions.createCourse(this.state.course));

    // 2. varianta - použít mapDispatchToProps ve kterém je definována daná funkce createCourse
    // this.props.createCourse(this.state.course);

    // 3. varianta - bindActionCreators obalí všechny akce dispatch funkcí a přiřadí je do action property
    this.props.actions.createCourse(this.state.course);


    this.setState({ course: { title: "" } });
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  // Typicky se používá Child (Presentation) komponenta, která zajišťuje zobrazování obsahu.
  // V rámci zjednodušení je prezentační část vložena přímo do této Container komponenty.
  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add course</h2>
        <input type="text" value={this.state.course.title} onChange={this.onTitleChange} />
        <input type="submit" value="Save" onClick={this.onClickSaved} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  // 1. varianta
  // dispatch: PropTypes.func.isRequired,

  // 2. varianta
  // createCourse: PropTypes.func.isRequired,

  // 3. varianta
  actions: PropTypes.object.isRequired,

  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

// 1. varianta - nepoužívá mapDispatchToProps

// 2. varianta
// function mapDispatchToProps(dispatch) {
//   return {
//     createCourse: (course) => dispatch(courseActions.createCourse(course))
//   };
// }

// 3. varianta
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);