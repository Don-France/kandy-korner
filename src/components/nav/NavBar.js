import { EmployeeNav } from "./EmployeeNav.js"
import { CustomerNav } from "./CustomerNav.js"

import "./NavBar.css"

export const NavBar = () => {

    const localKandyUser = localStorage.getItem("kandy_user");
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }

}
