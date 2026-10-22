
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  addStudent,
  updateStudent,
  fetchStudents,
} from '../redux/studentSlice';

const initialForm = {
  name: '',
  rollNumber: '',
  email: '',
  phone: '',
  age: '',
  class: '',
  grade: '',
  image: '',
};

function StudentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { students } = useSelector((state) => state.students);

  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id && students.length === 0) {
      dispatch(fetchStudents());
    }
  }, [id, students.length, dispatch]);

  useEffect(() => {
    if (!id) {
      setForm(initialForm);
      return;
    }

    const student = students.find(
      (item) => String(item.id) === String(id)
    );

    if (student) {
      setForm({
        ...initialForm,
        ...student,
        rollNumber: student.rollNumber ?? student.roll ?? '',
      });
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.rollNumber || !form.class) {
      setError('Please fill in name, roll number and class.');
      return;
    }

    setSaving(true);

    try {
      const studentData = {
        ...form,
        name: form.name.trim(),
        age: form.age === '' ? '' : Number(form.age),
      };

      if (id) {
        await dispatch(
          updateStudent({
            id,
            student: studentData,
          })
        ).unwrap();
      } else {
        await dispatch(addStudent(studentData)).unwrap();
      }

      navigate('/');
    } catch (err) {
      setError(
        typeof err === 'string'
          ? err
          : err?.message || 'Unable to save student. Check JSON Server.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="form-page">
      <div className="form-heading">
        <div>
          <span className="dashboard-label">STUDENT MANAGEMENT</span>
          <h2>{id ? 'Edit Student' : 'Add New Student'}</h2>
          <p>
            {id
              ? 'Update the student information below.'
              : 'Enter the details to register a new student.'}
          </p>
        </div>

        <Link to="/" className="btn btn-outline-secondary">
          Back to Students
        </Link>
      </div>

      <div className="student-panel form-panel">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Student Name *</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Roll Number *</label>
              <input
                className="form-control"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="student@example.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                className="form-control"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Age</label>
              <input
                className="form-control"
                type="number"
                min="1"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="Enter age"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Class *</label>
              <input
                className="form-control"
                name="class"
                value={form.class}
                onChange={handleChange}
                placeholder="e.g. 10"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Grade</label>
              <input
                className="form-control"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                placeholder="e.g. A+"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Image URL</label>
              <input
                className="form-control"
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="col-12 d-flex gap-2 mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={saving}
              >
                {saving
                  ? 'Saving...'
                  : id
                    ? 'Update Student'
                    : 'Add Student'}
              </button>

              <Link to="/" className="btn btn-light border">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;