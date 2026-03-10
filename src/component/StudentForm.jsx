import { useState } from "react";

function StudentForm({ onAdd }) {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [age,setAge] = useState("");
  const [errors,setErrors] = useState({});

  const validate = () => {

    const newErrors = {};

    if(!name.trim()){
      newErrors.name = "Name is required";
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if(!email){
      newErrors.email = "Email is required";
    }
    else if(!emailRegex.test(email)){
      newErrors.email = "Invalid email format";
    }

    if(!age){
      newErrors.age = "Age is required";
    }
    else if(age <= 0){
      newErrors.age = "Age must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!validate()) return;

    const student = {
      name,
      email,
      age
    }

    onAdd(student);

    setName("");
    setEmail("");
    setAge("");
    setErrors({});
  }

  return(

    <form onSubmit={handleSubmit}>

      <div>

        <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        {errors.name && <p className="error">{errors.name}</p>}

      </div>

      <div>

        <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        {errors.email && <p className="error">{errors.email}</p>}

      </div>

      <div>

        <input
        placeholder="Age"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
        />

        {errors.age && <p className="error">{errors.age}</p>}

      </div>

      <button type="submit">
        Add Student
      </button>

    </form>

  )
}

export default StudentForm