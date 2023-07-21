import { useEffect, useState } from "react"
import "./Employees.css"
import { useNavigate } from "react-router-dom"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=locations`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })

        },
        []
    )
    const handleAddButtonClick = () => {
        // event.preventDefault()
        navigate("/employees/new")
    };

    return <article className="employees">
        {
            // In the .map pass the Employee component as a prop and give it the unique react key
            employees.map(employee => {
                return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {employee.fullName}</div>
                    <div>Pay rate: {employee.payRate}</div>
                    <div>Start Date: {employee.startDate}</div>
                    <div>Location: {employee.locations.address}</div>



                </section>
            })
        }
        <button onClick={handleAddButtonClick} className="btn btn-primary">
            Add New Employee
        </button>



    </article>
}