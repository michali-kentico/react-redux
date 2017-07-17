import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

// 3. varianta
import { bindActionCreators } from 'redux';


// Container komponenta
class CoursesPage extends React.Component {

  // Container komponenta by neměla obsahovat mnoho JSX kódu, proto byla vytvořena vnořená prezentační komponenta CourseList
  render() {
    return (
      <div>
        <h1>Courses</h1>
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