// I need to create and export a function
// import useState, useEffect and useNavigation from react
// I will need to check if the user is an employee(only employees can add products) by checking the application key against the user isStaff property
// Use form fields
// Set up the default properties to send to the api

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    const [productTypes, setProductTypes] = useState([])
    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(res => res.json())
                .then((productTypesArray) => {
                    setProductTypes(productTypesArray)
                })
        },
        []
    )
    const [product, update] = useState({
        name: "",
        productTypesId: 0,
        price: 0

    })
    const navigate = useNavigate()


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // "name": "Everlasting Gobstopper",
        //     "productTypesId": 3,
        //     "type": "Jaw Breaker",
        //     "price": 2.25

        // Create athe object to be sent to the api
        const productToSendToApi = {
            name: product.name,
            productTypesId: product.productTypesId,
            price: product.price
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToApi)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            });

    };


    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Name of candy"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div>Type:</div>
                    {productTypes.map((productType) => {
                        return (
                            <div key={productType.id} className="radio">
                                <label>
                                    <input
                                        type="radio"
                                        value={productType.id}
                                        checked={product.productTypesId === productType.id}
                                        onChange={(event) => {
                                            const copy = { ...product }
                                            copy.productTypesId = parseInt(event.target.value)
                                            update(copy)
                                        }}
                                    />
                                    {productType.category}
                                </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of candy"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = { ...product }
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            {
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Submit Product
                </button>
            }
        </form>
    )
}


// if (!kandyUserObject.staff) {
    //     return null;
    // }

// "name": "Everlasting Gobstopper",
//     "productTypesId": 3,
//     "type": "Jaw Breaker",
//     "price": 2.25