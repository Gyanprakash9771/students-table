import { useState,useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import StudentForm from "./component/StudentForm";
import StudentTable from "./component/StudentTable";
import EditStudent from "./pages/EditStudent";
import studentsData from "./data/students";
import * as XLSX from "xlsx";
import "./App.css";

function App(){

  const [students,setStudents] = useState(studentsData);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])

  const addStudent = (student)=>{

    const nextId =
      students.length > 0
      ? Math.max(...students.map(s=>s.id)) + 1
      : 1

    const newStudent = {
      ...student,
      id:nextId
    }

    setStudents([...students,newStudent])
  }

  const deleteStudent = (id)=>{

    if(window.confirm("Delete student?")){
      setStudents(
        students.filter(s=>s.id !== id)
      )
    }

  }

  const updateStudent = (updatedStudent)=>{

    const updatedList =
      students.map(s=>
        s.id === updatedStudent.id
        ? updatedStudent
        : s
      )

    setStudents(updatedList)

  }

  // 🔎 Filter students
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  )

  // 📊 Download all students
  const downloadAllExcel = ()=>{

    const worksheet =
      XLSX.utils.json_to_sheet(students)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    )

    XLSX.writeFile(
      workbook,
      "all_students.xlsx"
    )

  }

  // 📊 Download filtered students
  const downloadFilteredExcel = ()=>{

    const worksheet =
      XLSX.utils.json_to_sheet(filteredStudents)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Students"
    )

    XLSX.writeFile(
      workbook,
      "filtered_students.xlsx"
    )

  }

  if(loading){
    return <h2>Loading students...</h2>
  }

  return(

<Routes>

<Route path="/" element={

<div className="container">

<h1>Students Table</h1>

<StudentForm onAdd={addStudent}/>

<input
type="text"
placeholder="Search student..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="search-input"
/>

<div className="download-buttons">

<button
className="download-btn"
onClick={downloadAllExcel}
>
Download All
</button>

<button
className="download-btn"
onClick={downloadFilteredExcel}
>
Download Filtered
</button>

</div>

<StudentTable
students={filteredStudents}
onDelete={deleteStudent}
/>

</div>

}/>

<Route
path="/edit"
element={
<EditStudent onUpdate={updateStudent}/>
}
/>

</Routes>

  )

}

export default App;