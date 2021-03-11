/* eslint-disable */

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Stock from "./stock";
import ReactPaginate from "react-paginate";
import moment from 'moment';
import { getFlights } from "../actions/actions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      search: '',
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
    const flights = actions.getFlights();
    return flights;
  }

  render() {
    const { flights } = this.props;
    
    const PER_PAGE = 20;
    const offset = this.state.currentPage * PER_PAGE;
    const pageCount = Math.ceil(flights.length / PER_PAGE);
    const styling = {
      width: "24%",
      background: "purple",
      cursor: "pointer",
      margin: "auto",
      border: "1px solid gray",
    };
    const flightList = flights ? (
      flights.filter((stock) => {
        if(this.state.search === ""){
          return flights.slice(offset, offset + PER_PAGE).map((stock) => (<Stock stock={stock} styling={styling} key={Math.random()} />))
        } else if(stock.name.toLocaleLowerCase().includes(this.state.search)){
          return stock
        }
      })
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
        {/* { flights.filter((val) => {
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
        })} */}
        <div className="stocks">{flightList}</div>
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
  flights: state.flightReducer.flights,
});

Home.propTypes = {
  flight: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ getFlights }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
/* eslint-enable */
