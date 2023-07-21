// export a function for LocationList
// Import and invoke the useStae and useEffect react hooks
// 

import { useEffect, useState } from "react"

export const LocationsList = () => {
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
    return <><h2>List of Locations</h2>
        <article className="locations">
            {locations.map(
                (location) => {
                    return <section className="location" key={`location--${location.id}`}>
                        <header>{location.address}</header>
                        <footer> Building size:{location.squareFootage} sqft </footer>
                    </section>
                }
            )}
        </article></>
}