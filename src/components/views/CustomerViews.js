import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationLists.js"
import { ProductList } from "../products/Products.js"
import { ProductForm } from "../products/ProductForm.js"
import { ProductsContainer } from "../products/ProductsContainer.js"


export const CustomerViews = () => {
    return <>

        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner Candies</h1>
                    <div>Your one-stop-shop to get all your candy!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={<LocationsList />} />
                <Route path="products" element={<ProductsContainer />} />

                <Route path="products" element={<ProductList />} />

            </Route>
        </Routes>


    </>
}

