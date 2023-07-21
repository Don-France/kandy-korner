// This will be the parent contain so the ProductSearc and Product components ca share state

import { useState } from "react"
import { ProductSearch } from "./ProductSearch.js"

import { ProductList } from "./Products.js"


export const ProductsContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <ProductSearch setterFunction={setSearchTerms} />
        < ProductList searchTermState={searchTerms} />


    </>
}