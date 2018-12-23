import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { LoadAndDelete } from "./common/LoadAndDelete";
import { returnDateCard, getTime, getDiff } from "../helpers/time";
import { CardStyles } from "./componentStyles/tableStyles";
import { prepSend } from "../reduxors/actions/logActions";
import { connect } from "react-redux";

class CardComponent extends Component {
  handlePrepSend = id => {
    const { history } = this.props;
    this.props.prepSend(id, history);
  };
  render() {
    const { log, handleEdit, handleDelete, activeId } = this.props;
    return (
      <CardStyles>
        <Card className="card">
          <CardContent>
            <Typography className="title" color="textSecondary" gutterBottom>
              {log.title}
            </Typography>
            <Typography variant="h6" component="h4">
              {log.dateStart && returnDateCard(log.dateStart, log.shiftStart)}
              {log.dateEnd ? (
                <span> to {returnDateCard(log.dateEnd, log.shiftEnd)}</span>
              ) : null}
            </Typography>
            <Typography className="pos" color="textSecondary">
              {getTime(log.shiftStart)} to{" "}
              {log.shiftEnd !== "" ? getTime(log.shiftEnd) : "In Progress"}
            </Typography>
            {log.shiftEnd !== "" ? (
              getDiff(
                { startTime: log.shiftStart, startDay: log.dateStart },
                {
                  endTime: log.shiftEnd,
                  endDay: log.dateEnd !== null ? log.dateEnd : log.dateStart
                },
                "card"
              )
            ) : (
              <Typography className="pos" color="textSecondary">
                Finish the log to track your completed hours!
              </Typography>
            )}
          </CardContent>
          <CardActions className="actions">
            <Button size="small" onClick={() => handleEdit(log._id)}>
              Edit Log
            </Button>
            {activeId === log._id ? (
              <LoadAndDelete />
            ) : (
              <Button onClick={() => handleDelete(log._id)}>Delete Log</Button>
            )}
            <Button size="small" onClick={() => this.handlePrepSend(log._id)}>
              Send Log
            </Button>
          </CardActions>
        </Card>
      </CardStyles>
    );
  }
}

export default connect(
  null,
  { prepSend }
)(withRouter(CardComponent));
