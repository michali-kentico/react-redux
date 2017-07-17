import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

// Stateless prezentační komponenta definovaná jako lamda funkce
// Konstanta CourseList je funkcí, která přijímá jako parametr objekt {courses} - jde o tzv. pojmenovaný import
// Pokud by se použilo např. const CourseList = (props) => {}, muselo by se pak volat {props.courses.map().
// Pokud se však použije const CourseList = ({courses}) => {}, lze pak volat přímo {courses.map()},
// protože property courses se uloží přímodo přoměnné courses. Je to obdobná situace jako u importu např. { PropTypes }
const CourseList = ({courses}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {courses.map(course => <CourseListRow key={course.id} course={course} />)}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CourseList;