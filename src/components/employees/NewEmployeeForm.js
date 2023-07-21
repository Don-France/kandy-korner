import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const NewEmployeeForm = () => {
    const [employees, setEmployees] = useState([])
    const [locations, setLocations] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees`)
                .then(res => res.json())
                .then((employeesArray) => {
                    setEmployees(employeesArray)
                })
        },
        []
    )
    const [employee, update] = useState({
        fullName: "",
        locationsId: "",
        startDate: "",
        payRate: 0,
        userId: ""

    })
    const navigate = useNavigate()


    const handleSubmitButtonClick = (event) => {
        event.preventDefault()
        // "name": "Everlasting Gobstopper",
        //     "productTypesId": 3,
        //     "type": "Jaw Breaker",
        //     "price": 2.25
        const currentDate = new Date()

        // Create athe object to be sent to the api
        const employeeToSendToApi = {
            fullName: employee.fullName,
            locationsId: employee.locationsId,
            startDate: currentDate.toDateString(),
            payRate: employee.payRate,
            // usersId: employee.users.id
        }

        return fetch(`http://localhost:8088/employees`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToApi)
        })
            .then(res => res.json())
            .then((employee) => {
                // Once the employee is added, create an object for the user resource
                const userToSendToApi = {
                    // userId: newEmployee.id, // Use the newly created employee's ID
                    fullName: employee.fullName,
                    isStaff: true
                    // Add any other relevant user information here
                };

                // Second, add the user information to the users resource
                return fetch(`http://localhost:8088/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userToSendToApi)
                });
            })
            .then((res) => res.json())
            .then(() => {
                // After both API calls are successful, you can update the employees array and users array in your local state if needed.
                // For example, if you're using the 'employees' state to store all employees, you can update it here:
                // setEmployees([...employees, employeeToSendToApi]);
                // ...any other updates you need to make...

                // Finally, navigate to the appropriate page, like the employees list.
                navigate("/employees");
            });
        // .then(() => {
        //     navigate("/employees")
        // });

    };


    return (
        <form className="productForm">
            <h2 className="productForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        value={employee.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.fullName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>Location:</div>
                    {locations.map((location) => (

                        <div key={location.id} className="radio">
                            <label>
                                <input
                                    type="radio"
                                    value={location.id}
                                    // checked={locationloyee.locationsId === location.locationsId}
                                    onChange={(event) => {
                                        const copy = { ...employee }
                                        copy.locationsId = parseInt(event.target.value)
                                        update(copy)
                                    }}
                                />
                                {location.address}
                            </label>
                        </div>

                    ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="start date">Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="Start Date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Pay Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Pay Rate"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.payRate = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            {
                <button
                    onClick={(clickEvent) => handleSubmitButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Submit New Employee
                </button>
            }
        </form>
    )
}
