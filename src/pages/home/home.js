import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import data from "../../data/products.json";
import NumberFormat from "react-number-format";

class Home extends React.Component {
  state = {
    topProducts: [],
  };

  componentDidMount() {
    const sortedProducts = data
      .sort((a, b) => {
        return a.price < b.price ? 1 : -1;
      })
      .slice(0, 4);
    this.setState({
      topProducts: [...this.state.topProducts, ...sortedProducts],
    });
  }

  render() {
    console.log(this.state.topProducts);

    return (
      <section>
        <div className="header-wrapper">
          <h1 className="headline">Welcome, visitor!</h1>
          <Link to="/products">
            <div className="productsLinkButton">Go to products</div>
          </Link>
        </div>
        <section className="top-product">
          {this.state.topProducts.map((product) => {
            return (
              <section className="price-wrapper">
                <Link
                  key={product.id}
                  to={{ pathname: `products/${product.slug}` }}
                >
                  <div>
                    <p className="top-product-name">
                      {product.name}
                      <p className="top-product-price">
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
                    </p>
                  </div>
                </Link>
              </section>
            );
          })}
        </section>
      </section>
    );
  }
}

export default Home;
