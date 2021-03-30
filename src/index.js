import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th class="category" colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    console.log(filterText, '==filterText===')
    let rows = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.id.indexOf(filterText) === -1) {
        console.log("Not found " + filterText)
        return;
      } else {
        console.log("found " + filterText)
        // rows.push(
        //   <ProductRow
        //     product={product}
        //     key={product.name}
        //   />
        // );
        rows = <div>{product.name}</div>
        // return (
        //   <div>{rows}</div>
        // );
      }




      // rows.push(
      //   <ProductRow
      //     product={product}
      //     key={product.name}
      //   />
      // );
      // lastCategory = product.category;
    });

    return (
      rows.length === 0 ? <div>empty</div> : <div>{rows}</div>
    )
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
    // this.state = {
    //   filterText: ''
    // }
  }

  handleFilterTextChange(e) {
    console.log("Text changed: " + e.target.value)
    // console.log(e.key)
    // console.log(e.target.value)
    e.key === 'Enter' && e.preventDefault()
    this.props.onFilterTextChange(e.target.value);

    // this.setState({ filterText: '' })
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
          onKeyPress={e => e.key === 'Enter' && e.preventDefault()}
        />
        {/* <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p> */}
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    // filterText.preventDefault()
    this.setState({
      filterText: filterText
    });
  }

  handleInStockChange(inStockOnly) {
    this.setState({
      inStockOnly: inStockOnly
    })
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          // filterText={"cuong"}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: '0013130167' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];


const STUDENTS = [
  {
    id: '0013130167',
    name: 'Le Pham huy Cuong'
  },
  {
    id: '0013119271',
    name: 'Huynh Nhat Hao'
  },
  {
    id: '0013182738',
    name: 'Ngo Van Khai'
  },
]

ReactDOM.render(
  <FilterableProductTable products={STUDENTS} />,
  document.getElementById('root')
);

