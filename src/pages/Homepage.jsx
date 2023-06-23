import React, { useState } from "react";
import "./homePage.css"; // Import the CSS file
import { Data } from "../data/Data";

const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredProducts = Data.filter((product) =>
    Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA < columnB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const arrowIcon = sortOrder === "asc" ? "▲" : "▼";

  return (
    <div className="product-table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortColumn === "id" && <span>{arrowIcon}</span>}
            </th>
            <th onClick={() => handleSort("productName")}>
              Product Name{" "}
              {sortColumn === "productName" && <span>{arrowIcon}</span>}
            </th>
            <th onClick={() => handleSort("productWeight")}>
              Product Weight{" "}
              {sortColumn === "productWeight" && <span>{arrowIcon}</span>}
            </th>
            <th onClick={() => handleSort("price")}>
              Price {sortColumn === "price" && <span>{arrowIcon}</span>}
            </th>
            <th onClick={() => handleSort("calories")}>
              Calories {sortColumn === "calories" && <span>{arrowIcon}</span>}
            </th>
            <th onClick={() => handleSort("ingredients")}>
              Ingredients{" "}
              {sortColumn === "ingredients" && <span>{arrowIcon}</span>}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.productWeight}</td>
              <td>{product.price}</td>
              <td>{product.calories}</td>
              <td>{product.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
