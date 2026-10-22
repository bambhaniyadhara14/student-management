import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, deleteStudent } from '../redux/studentSlice';
import { Link } from 'react-router-dom';

function StudentList() {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(
    (state) => state.students
  );

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [classFilter, setClassFilter] = useState('All');

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const classes = [
    ...new Set(students.map((student) => student.class).filter(Boolean)),
  ];

  const filteredStudents = useMemo(() => {
    let result = students.filter((student) => {
      const query = search.toLowerCase();

      const matchesSearch =
        String(student.name || '').toLowerCase().includes(query) ||
        String(student.rollNo || '').toLowerCase().includes(query);

      const matchesClass =
        classFilter === 'All' ||
        String(student.class) === String(classFilter);

      return matchesSearch && matchesClass;
    });

    result.sort((a, b) => {
      if (sortBy === 'rollNo') {
        return String(a.rollNo ?? '').localeCompare(
          String(b.rollNo ?? ''),
          undefined,
          { numeric: true }
        );
      }

      return String(a.name || '').localeCompare(String(b.name || ''));
    });

    return result;
  }, [students, search, sortBy, classFilter]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">STUDENT MANAGEMENT</span>
          <h2>Student Dashboard</h2>
          <p>Manage your student records in one place.</p>
        </div>

        <Link to="/add-student" className="btn btn-light add-student-btn">
          + Add Student
        </Link>
      </div>

      <div className="row g-3 my-3">
        <div className="col-md-4">
          <div className="stat-card">
            <p>Total Students</p>
            <h3>{students.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <p>Classes</p>
            <h3>{classes.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card">
            <p>Filtered Results</p>
            <h3>{filteredStudents.length}</h3>
          </div>
        </div>
      </div>

      <div className="student-panel">
        <div className="panel-heading">
          <div>
            <h4>Student Records</h4>
            <p>Search, sort and manage students.</p>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-5">
            <input
              className="form-control"
              type="search"
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="All">All Classes</option>
              {classes.map((item) => (
                <option key={item} value={item}>
                  Class {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="rollNo">Sort by Roll Number</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center">Loading students...</p>}

        {error && (
          <div className="alert alert-danger">
            {error}. Please check whether JSON Server is running on port 5000.
          </div>
        )}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table align-middle student-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Class</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-name">
                        {student.name || 'Unnamed Student'}
                      </div>
                      <small className="text-muted">
                        {student.phone || 'No phone'}
                      </small>
                    </td>

                    <td>{student.rollNo ?? '-'}</td>
                    <td>{student.email || '-'}</td>
                    <td>{student.class || '-'}</td>
                    <td>{student.grade || '-'}</td>

                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/edit-student/${student.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;