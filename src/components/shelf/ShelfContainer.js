import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';
import { addProduct } from '../../actions/floatCartActions';

import Product from './Product';
import Filter from './Filter';
import ShelfContainerHeader from './ShelfContainerHeader';
import Clearfix from '../Clearfix';


class ShelfContainer extends Component {

  componentWillMount() {
    this.props.fetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, sort } = nextProps;

    if (filters !== this.props.filters){
      this.handleFilter(filters);
    }
    if (sort !== this.props.sort) {
      this.handleSort(sort);
    }
  }

  handleFilter = (filters) => {
    this.props.fetchProducts(filters);
  }

  handleSort = (sort) => {
    this.props.fetchProducts(this.props.filters, sort);
  }

  render() {
    const { products } = this.props;

    const p = products.map(p => {
      return (
        <Product
          product={p}
          addProduct={this.props.addProduct}
          key={p.id}
        />
      );
    });

    return (
      <React.Fragment>
        <Filter />  
        <div className="shelf-container">
          <ShelfContainerHeader productsLength={products.length}/>
          {p}
          <Clearfix />
        </div>
        <Clearfix />
      </React.Fragment>
    )

  }
}

ShelfContainer.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sort: PropTypes.string,
}

const mapStateToProps = state => ({
  products: state.products.items,
  filters: state.filters.items,
  sort: state.sort.item,
})

export default connect(mapStateToProps, { fetchProducts, addProduct })(ShelfContainer);