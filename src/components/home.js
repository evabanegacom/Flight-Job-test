/* eslint-disable */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Stock from "./stock";
import ReactPaginate from "react-paginate";
import moment from 'moment';
import { getStocks, searchFilter } from "../actions/actions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };
  }

  handlePageClick = ({ selected: selectedPage }) => {
    this.setState({
      currentPage: selectedPage,
      search: "",
    });
  };

  handleSearches = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  componentDidMount() {
    const { actions } = this.props;
    const stocks = actions.getStocks();
    return stocks;
  }

  render() {
    const { stocks } = this.props;
    const PER_PAGE = 20;
    const offset = this.state.currentPage * PER_PAGE;
    const pageCount = Math.ceil(stocks.length / PER_PAGE);
    const styling = {
      width: "24%",
      background: "purple",
      cursor: "pointer",
      margin: "auto",
      border: "1px solid gray",
    };
    const stockList = stocks ? (
      stocks
        .slice(offset, offset + PER_PAGE)
        .map((stock) => (
          <Stock stock={stock} styling={styling} key={Math.random()} />
        ))
    ) : (
      <p>loading...</p>
    );

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="search..."
          onChange={this.handleSearches}
          style={{ width: '300px', height: '30px', borderRadius: '10px', background: 'blue', outline: 'none', border: 'none', marginTop: '20px', color: '#FFFFFF'}}
        />
        { stocks.filter((val) => {
          if(this.state.search === ''){
            return null
          } else if (val.name.toLocaleLowerCase().includes(this.state.search)){
            return val
          }
        }).map((val) => {
          return (
            <div style={{ textAlign: 'center', border: '1px solid grey', background: 'blue', color: '#FFFFFF', borderRadius: '10px', padding: '10px'}}>
              <p>{val.name}</p>
              <p>{ moment(val.date_utc).format('DD-MM-YYYY') }</p>
            </div>
          )
        })}
        <div className="stocks">{stockList}</div>
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stocks: state.stockReducer.stocks,
});

Home.propTypes = {
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getStocks }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
/* eslint-enable */
