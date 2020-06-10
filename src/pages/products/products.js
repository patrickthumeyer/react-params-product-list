import React from "react";
import "./products.css";
import data from "../../data/products.json";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import queryString from "query-string";
import arrowUp from "../../images/arrow-up.svg";
import arrowDown from "../../images/arrow-down.svg";

const sortProducts = (products, sortingOrder) => {
  if (sortingOrder === "asc")
    return [...products].sort((a, b) => a.price - b.price);
  if (sortingOrder === "dsc")
    return [...products].sort((a, b) => b.price - a.price);
  return [...products];
};

class Products extends React.Component {
  state = {
    initialArray: [...data],
    productsArray: [...data],
    filterTerm: "",
  };

  componentDidMount() {
    let parse = queryString.parse(this.props.location.search);
    this.setState({
      productsArray: sortProducts(this.state.productsArray, parse.sort),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      let parse = queryString.parse(this.props.location.search);
      this.setState({
        productsArray: parse.sort
          ? sortProducts(this.state.productsArray, parse.sort)
          : this.state.initialArray,
      });
    }
  }

  setSortingOrder = (order = "") => {
    this.props.history.replace({
      pathname: "/products",
      search: order ? `?sort=${order}` : "",
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      filterTerm: e.target.value,
    });
  };

  render() {
    const parsed = queryString.parse(this.props.location.search);
    return (
      <>
        <section className="products-header">
          <div className="button-container">
            <button
              onClick={() => this.setSortingOrder()}
              className="reset-button"
            >
              Reset
            </button>
            <button
              onClick={() => this.setSortingOrder("asc")}
              className="sort-ascending-button"
            >
              Sort
            </button>
            <button
              onClick={() => this.setSortingOrder("dsc")}
              className="sort-descending-button"
            >
              Sort
            </button>
          </div>
          <div className="filter-container">
            <label htmlFor="filter">
              <span>Filter by name or description</span>
            </label>
            <input
              type="text"
              name="filter"
              id="filter"
              placeholder="Type name or description here"
              onChange={this.onChangeHandler}
            />
          </div>
        </section>
        <ul>
          <div className="button-list-wrapper">
            <button
              onClick={this.props.history.goBack}
              className="arrow"
            ></button>
            <h2 className="product-list-header">Product List</h2>
            {parsed.sort === "asc" ? (
              <p className="asc-dsc-label">ascending</p>
            ) : parsed.sort === "dsc" ? (
              <p className="asc-dsc-label">descending</p>
            ) : (
              ""
            )}
          </div>
          <li className="list-header">
            <h3>NAME</h3>
            <h3>DESCRIPTION</h3>
            <div className="price-column-headline-container">
              <h3 className="price-column-headline">
                PRICE
                {parsed.sort === "asc" ? (
                  <img src={arrowUp} alt="arrowUp" />
                ) : parsed.sort === "dsc" ? (
                  <img src={arrowDown} alt="arrowUp" />
                ) : (
                  ""
                )}
              </h3>
            </div>
          </li>
          {this.state.productsArray
            .filter(
              (product) =>
                product.name
                  .toLowerCase()
                  .includes(this.state.filterTerm.toLowerCase()) ||
                product.shortDescription
                  .toLowerCase()
                  .includes(this.state.filterTerm.toLowerCase())
            )
            .map((product) => {
              return (
                <Link
                  key={product.id}
                  //   to={{ pathname: `products/${product.slug}` }}
                  to={`products/${product.slug}`}
                >
                  <li className="list-item">
                    <p>{product.name}</p>
                    <p>{product.shortDescription}</p>
                    <p>
                      <NumberFormat
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={"."}
                        suffix={"€"}
                        decimalSeparator={","}
                        decimalScale={"2"}
                        fixedDecimalScale={"true"}
                      />
                    </p>
                  </li>
                </Link>
              );
            })}
        </ul>
      </>
    );
  }
}

export default Products;
