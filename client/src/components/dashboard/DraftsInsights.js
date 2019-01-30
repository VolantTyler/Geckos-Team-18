import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const DraftsInsights = ({ unsent }) => {
  return (
    <>
      <Link to="/new">
        <br></br>
        <input
          type="button"
          value="New invoice"
          className="btn btn-dark"
        />
        <hr></hr>
      </Link>
      <div>
        <p>You have {unsent.length} unsent logs</p>
      </div>
      <Link to="/drafts">
        <input
          type="button"
          value="View draft invoices"
          className="btn btn-dark"
        />
        <hr></hr>
      </Link>
    </>
  );
};

DraftsInsights.propTypes = {
  unsent: PropTypes.any.isRequired
};
