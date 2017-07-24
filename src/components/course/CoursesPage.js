import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import { browserHistory } from 'react-router';

// 3. varianta
import { bindActionCreators } from 'redux';


// Container komponenta
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  // Tato funkce by mohla být uvedena přímo v onClick={() => browserHistory.push('/course')}, ale z důvodu performance je
  // lepší ji napsat samostatně, aby se nevyhodnocovala při každém renderu této komponenty
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }
  // Container komponenta by neměla obsahovat mnoho JSX kódu, proto byla vytvořena vnořená prezentační komponenta CourseList
  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        <CourseList courses={this.props.courses}/>
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