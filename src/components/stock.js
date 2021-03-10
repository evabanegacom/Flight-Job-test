import React from 'react';
import { Link } from 'react-router-dom';
/* eslint-disable */
import PropTypes from 'prop-types';
import moment from 'moment';


function Stock({ stock, styling }) {
  return (
    <div style={styling}>
      <Link to='' key={stock.symbol} className="link-decor">
        <h4>
          {' '}
          Name: { stock.name }
          <br />
          <br />
          Time : { moment(stock.date_utc).format('DD-MM-YYYY') }
          {' '}
          {' '}
          <br />
          <br />
          <img style={{width: '100px', height: '100px'}} src={stock.links.patch.small} alt='' />
          <br />
          <br />
          Success_landing:
        </h4>
      </Link>
      <p className="stockprice">{stock.price}</p>
    </div>
  );
}

Stock.propTypes = {
  stock: PropTypes.string.isRequired,
  styling: PropTypes.func.isRequired,
};
export default Stock;

/* eslint-enable */
