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
          Date : { moment(stock.date_utc).format('DD-MM-YYYY') }
          {' '}
          {' '}
          <br />
          <br />
          <img style={{width: '100px', height: '100px'}} src={stock.links.patch.small} alt='' />
          <br />
          <br />
          Success_landing: <div style={{ color: 'cyan'}}>{stock.cores.map((core) => {
            if(core.landing_success === true){
              return <p>true</p>
            }

            if(core.landing_success === false){
              return <p>false</p>
            }
            if(core.landing_success === null){
              return <p>null</p>
            }  
          })}</div>
        </h4>
      </Link>
    </div>
  );
}

Stock.propTypes = {
  stock: PropTypes.string.isRequired,
  styling: PropTypes.func.isRequired,
};
export default Stock;

/* eslint-enable */
