// Create and export a function that will show the employee only the inventory
// Filter the product inventory(using .filter) down when an employee clicks the Top Priced button
// I wil need useState and useEffect and maybe useNavigate
// I will need a button and a click event listener


import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./Products.css"
export const ProductList = ({ searchTermState }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isSearchResults, setIsSearchResults] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user");
    const kandyUserObject = JSON.parse(localKandyUser);
    const navigate = useNavigate()

    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })

            setFilteredProducts(searchedProducts)
            setIsSearchResults(searchedProducts.length > 0)
        },
        [searchTermState]
    )

    useEffect(() => {
        fetch("http://localhost:8088/products?_expand=productTypes")
            .then(res => res.json())
            .then(productsArray => {
                setProducts(productsArray);
                setFilteredProducts(productsArray);
            })
    }, []);

    const handleFilterTopPriced = () => {
        const topPricedProducts = products.filter(product => product.price > 2);
        setFilteredProducts(topPricedProducts);
    };
    const handleAddButtonClick = () => {
        // event.preventDefault()
        navigate("/products/new")
    };
    return (
        <>
            {kandyUserObject.staff && (
                <button onClick={handleFilterTopPriced}>Top Priced</button>
            )}

            <h2>List of Products</h2>
            <article className="products">
                {filteredProducts.map((product) => {
                    // const productType = product.productTypes;
                    return (
                        <section className="product" key={`product--${product.id}`}>
                            <header>{product.name}</header>
                            <footer>${Number(product.price).toFixed(2)} each</footer>
                            {!isSearchResults && product.productTypes && (
                                <footer>Type of candy is {product.productTypes.category}</footer>
                            )}
                        </section>
                    );
                })}



            </article>
            {kandyUserObject.staff && (
                <button onClick={handleAddButtonClick} className="btn btn-primary">
                    Add Product
                </button>
            )}

        </>
    );
};


//     {
//         <button
//             onClick={handleAddButtonClick}
//             className="btn btn-primary">
//             Add Product
//         </button>
//     }
// </>
// );
// };
