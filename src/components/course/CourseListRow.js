import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Stateless prezentační komponenta
// Konstanta CourseListRow je funkcí, která přijímá jako parametr objekt course
const CourseLinkRow = ({course}) => {
  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
    </tr>
  );
};

CourseLinkRow.propTypes = {
  course: PropTypes.object.isRequired
};

export default CourseLinkRow;