import React from "react";
import "./detailsPage.css";
import data from "../../data/products.json";
import NumberFormat from "react-number-format";

class DetailsPage extends React.Component {
  state = {
    product: "",
    nextSlug: "",
    prevSlug: "",
  };

  previousPage = () => {
    this.props.history.goBack();
  };

  previousProduct = (e) => {
    e.preventDefault();
    this.props.history.replace({
      pathname: `/products/${this.state.prevSlug}`,
    });
  };

  nextProduct = (e) => {
    e.preventDefault();
    this.props.history.replace({
      pathname: `/products/${this.state.nextSlug}`,
    });
  };

  componentDidMount() {
    let currentProduct = data.find((product) => {
      return this.props.match.params.slug === product.slug;
    });
    let index = data.indexOf(currentProduct);
    this.setState({
      product: currentProduct,
      nextSlug: data[index + 1] && data[index + 1].slug,
      prevSlug: data[index - 1] && data[index - 1].slug,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      let currentProduct = data.find((product) => {
        return this.props.match.params.slug === product.slug;
      });
      let index = data.indexOf(currentProduct);
      this.setState({
        product: currentProduct,
        nextSlug: data[index + 1] && data[index + 1].slug,
        prevSlug: data[index - 1] && data[index - 1].slug,
      });
    }
  }

  render() {
    return (
      <section className="details-container">
        <section className="details-header">
          <button
            onClick={this.props.history.goBack}
            className="arrow"
          ></button>
          <h1>{this.state.product.name}</h1>
        </section>
        <img
          className="product-image"
          src={this.state.product.image}
          alt="product"
        />
        <p>{this.state.product.description}</p>
        <p className="price">
          <NumberFormat
            value={this.state.product.price}
            displayType={"text"}
            thousandSeparator={"."}
            suffix={"€"}
            decimalSeparator={","}
            decimalScale={"2"}
            fixedDecimalScale={"true"}
          />
        </p>
        <div className="nav-button-container">
          <div>
            {this.state.prevSlug && (
              <div className="prev-button-container">
                <button
                  onClick={this.previousProduct}
                  className="arrow"
                ></button>
                <span>Previous</span>
              </div>
            )}
          </div>

          <div>
            {this.state.nextSlug && (
              <div className="next-button-container">
                <span>Next</span>
                <button
                  onClick={this.nextProduct}
                  className="arrow arrow-forward"
                ></button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default DetailsPage;
