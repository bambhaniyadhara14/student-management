
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import StudentList from './pages/StudentList';
import StudentForm from './pages/StudentForm';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="container mt-4">
                  <Routes>
                    <Route path="/" element={<StudentList />} />
                    <Route path="/add-student" element={<StudentForm />} />
                    <Route
                      path="/edit-student/:id"
                      element={<StudentForm />}
                    />
                  </Routes>
                </main>
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;