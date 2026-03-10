import { useNavigate } from "react-router-dom";

function StudentTable({ students, onDelete }) {

  const navigate = useNavigate();

  return (

    <table>

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

      {students.map(student => (

        <tr key={student.id}>

          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.email}</td>
          <td>{student.age}</td>

          <td>

            <button
            onClick={()=>navigate("/edit",{state:student})}
            >
              Edit
            </button>

            <button
            onClick={()=>onDelete(student.id)}
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

      </tbody>

    </table>

  )
}

export default StudentTable