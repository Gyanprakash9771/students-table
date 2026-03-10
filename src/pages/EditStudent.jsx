import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditStudent({ onUpdate }) {

  const navigate = useNavigate();
  const location = useLocation();

  const student = location.state;

  const [name,setName] = useState(student.name);
  const [email,setEmail] = useState(student.email);
  const [age,setAge] = useState(student.age);

  const handleSubmit = (e)=>{

    e.preventDefault();

    const updatedStudent = {
      id: student.id,
      name,
      email,
      age
    }

    onUpdate(updatedStudent);

    navigate("/");
  }

  return(

    <div style={{padding:"20px"}}>

      <h2>Update Student</h2>

      <form onSubmit={handleSubmit}>

        <input
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <input
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        />

        <button type="submit">
          Update Student
        </button>

      </form>

    </div>

  )
}

export default EditStudent