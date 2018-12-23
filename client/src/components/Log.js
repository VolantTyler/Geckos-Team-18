import React, { Component } from "react";
import { HeaderTextStyle } from "../components/styled-components/headerStyles";
import { addLog, editLog, goBack } from "../reduxors/actions/logActions";
import { connect } from "react-redux";
import { TextField } from "./common/TextField";
import { isEmpty } from "../helpers/isEmpty";
import { withRouter } from "react-router-dom";
import { returnDate } from "../helpers/time";

import { FormStyle } from "./styled-components/logStyles";

const initialState = {
  title: "",
  dateStart: "",
  dateEnd: "",
  shiftStart: "",
  shiftEnd: "",
  comments: "",
  pageState: "",
  checked: false,
  errors: {}
};
class Log extends Component {
  state = initialState;

  handleChange = e => {
    const { errors } = this.state;
    if (!isEmpty(errors)) {
      this.setState({ errors: {} });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.type === "new") {
      this.setState(initialState);
    }
  };

  componentWillMount = () => {
    let doTheStateDance;
    if (isEmpty(this.props.log)) {
      doTheStateDance = initialState;
    } else if (!isEmpty(this.props.log)) {
      const {
        title,
        dateStart,
        dateEnd,
        checked,
        shiftStart,
        shiftEnd,
        comments
      } = this.props.log;
      doTheStateDance = {
        title,
        dateStart: returnDate(dateStart),
        dateEnd: dateEnd !== null ? returnDate(dateEnd) : "",
        shiftStart,
        shiftEnd,
        comments,
        checked,
        pageState: "edit"
      };
    }
    this.setState(doTheStateDance);
  };

  handleSubmit = e => {
    const { addLog, editLog, log } = this.props;
    e.preventDefault();
    const {
      title,
      dateStart,
      dateEnd,
      checked,
      shiftEnd,
      shiftStart,
      comments,
      pageState
    } = this.state;
    if (pageState === "edit") {
      editLog(
        {
          title,
          dateStart,
          dateEnd,
          checked,
          shiftStart,
          shiftEnd,
          comments
        },
        log._id,
        this.props.history
      );
    } else {
      addLog(
        {
          title,
          dateStart,
          dateEnd,
          checked,
          shiftStart,
          shiftEnd,
          comments
        },
        this.props.history
      );
    }

    this.setState(initialState);
  };

  handleRedirect = () => {
    const { goBack, history } = this.props;
    this.setState(initialState);
    goBack("drafts", history);
  };

  handleCheck = e => {
    this.setState({
      checked: e.target.checked
    });
  };

  render() {
    const {
      title,
      dateStart,
      dateEnd,
      shiftStart,
      shiftEnd,
      comments,
      pageState,
      checked
    } = this.state;
    const { errors } = this.props;
    const isEnabled = title !== "" && dateStart !== "";
    const header = pageState === "edit" ? "Edit" : "New";
    return (
      <>
        <HeaderTextStyle>{header} Log</HeaderTextStyle>

        <FormStyle
          onSubmit={this.handleSubmit}
          style={{ width: "80%", maxWidth: "1000px", margin: "0 auto" }}>
          <div className="form-group mb-0" style={{ gridArea: "title" }}>
            <TextField
              name="title"
              autoFocus
              className="form-control"
              handleChange={this.handleChange}
              value={title}
              type="text"
              placeholder="Enter a title for your work log..."
              inputType="input"
              error={errors.title}
            />
            <input
              id="time-checkbox"
              name="checkbox"
              type="checkbox"
              defaultChecked={checked}
              onChange={this.handleCheck}
            />
            <label htmlFor="time-checkbox">
              <small>Does this log span more than one day?</small>
            </label>
          </div>
          <div
            style={{
              gridArea: "time"
            }}>
            <TextField
              name="dateStart"
              handleChange={this.handleChange}
              value={dateStart}
              type="date"
              inputType="input"
              error={errors.dateStart}
              info={"Enter shift start date"}
            />

            <TextField
              name="dateEnd"
              handleChange={this.handleChange}
              value={dateEnd}
              type="date"
              inputType="input"
              error={errors.date}
              disabled={!checked}
              info={"Enter shift end date"}
            />
            <TextField
              name="shiftStart"
              type="time"
              inputType="input"
              handleChange={this.handleChange}
              value={shiftStart}
              style={{ height: "48px" }}
              error={errors.shiftStart}
              info={"Enter shift start time"}
            />
            <TextField
              name="shiftEnd"
              type="time"
              inputType="input"
              handleChange={this.handleChange}
              value={shiftEnd}
              style={{ height: "48px" }}
              info={"Enter shift end time"}
            />
          </div>

          <div className="form-row" style={{ gridArea: "message" }}>
            <div style={{ width: "100%", height: "100%" }}>
              <TextField
                rows={!checked ? 8 : 10}
                name="comments"
                className="form-control"
                inputType="textarea"
                handleChange={this.handleChange}
                value={comments}
                placeholder="Leave a note!"
              />
            </div>
          </div>
          <div style={{ margin: "0", gridArea: "buttons" }}>
            <button
              className={!isEnabled ? "btn btn-light" : "btn btn-info"}
              style={{ marginRight: "5px", width: "80px" }}
              type="submit">
              Save
            </button>

            <button
              type="button"
              onClick={this.handleRedirect}
              className="btn btn-secondary mx-4 my-4"
              style={{ marginLeft: "5px" }}>
              Go Back
            </button>
          </div>
        </FormStyle>
      </>
    );
  }
}

Log.defaultProps = {
  type: "new"
};

const mapStateToProps = state => {
  const { auth, errors } = state;
  const { log } = state.log;
  return { auth, errors, log };
};

export default connect(
  mapStateToProps,
  { addLog, editLog, goBack }
)(withRouter(Log));
