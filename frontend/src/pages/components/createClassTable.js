
import React, { useState } from "react";
import {
  Box, Button, Snackbar, Table,
  TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DoneIcon from "@material-ui/icons/Done";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import './createClassTable.css';
import { Grid, FormLabel, FormControl, RadioGroup, Radio, FormControlLabel } from "@mui/material";




function createClassTableComponent() {

  // Defining a state named rows
  // which we can update by calling on setRows function
  const [rows, setRows] = useState([
    { firstname: "John", lastname: "Smith", email: "example@student.edu", class: "GUI" }
  ]);

  // Initial states
  const [open, setOpen] = React.useState(false);
  const [isEdit, setEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [time, setTime] = React.useState('');
  const [day, setDay] = React.useState('');

  // Function For closing the alert snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Function For adding new row object
  const handleAdd = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1, firstname: "",
        lastname: "", city: ""
      },
    ]);
    setEdit(true);
  };

  // Function to handle save
  const handleSave = () => {
    setEdit(!isEdit);
    setRows(rows);
    console.log("saved : ", rows);
    setDisable(true);
    setOpen(true);
  };

  // The handleInputChange handler can be set up to handle
  // many different inputs in the form, listen for changes 
  // to input elements and record their values in state
  const handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
  };


  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item>
        <Box sx={{px:3, display:'inline'}}>
          <FormControl>
            <FormLabel id="Days">Day</FormLabel>
            <RadioGroup
              defaultValue="Monday"
              value={day}
              onChange={handleDayChange}
            >
              <FormControlLabel value="Monday" control={<Radio />} label="Monday" />
              <FormControlLabel value="Tuesday" control={<Radio />} label="Tuesday" />
              <FormControlLabel value="Wednesday" control={<Radio />} label="Wednesday" />
              <FormControlLabel value="Thursday" control={<Radio />} label="Thursday" />
              <FormControlLabel value="Friday" control={<Radio />} label="Friday" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box  sx={{px:3, display:'inline'}}>
          <FormControl>
            <FormLabel id="Times">Time</FormLabel>
            <RadioGroup
              defaultValue="2:30pm-4:20pm"
              value={time}
              onChange={handleTimeChange}
            >
              <FormControlLabel value="2:30pm-4:20pm" control={<Radio />} label="2:30pm-4:20pm" />
              <FormControlLabel value="4:30pm-6:20pm" control={<Radio />} label="4:30pm-6:20pm" />
              <FormControlLabel value="6:30pm-8:20pm" control={<Radio />} label="6:30pm-8:20pm" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <br></br>
      <br></br>
    
      <TableBody>
  <Grid
                container
                justifyContent="center"
                alignItems="center"
            >
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          className="snackbar"
        >
          <Alert onClose={handleClose} severity="success">
            Students added!
          </Alert>
        </Snackbar>
          <div>
            {isEdit ? (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD STUDENT
                </Button>
                {rows.length !== 0 && (
                  <Button align="" onClick={handleSave}>
                    <DoneIcon />
                    SAVE
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <Button onClick={handleAdd}>
                  <AddBoxIcon onClick={handleAdd} />
                  ADD STUDENT
                </Button>
              </div>
            )}
          </div>
          <br></br>
        <TableRow align=""> </TableRow>

        <Table
          className="studentTable"
          size="large"
          aria-label="add student table"
        >

          <TableBody fullWidth>
            {rows.map((row, i) => {
              return (
                <div id="studentsTable">
                  <TableRow>
                    {isEdit ? (
                      <div>
                        <TableCell>
                          <input
                            value={row.firstname}
                            name="firstname"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            value={row.lastname}
                            name="lastname"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            value={row.email}
                            name="email"
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            name="class"
                            value={row.class}
                            onChange={(e) => handleInputChange(e, i)}
                          >
                            <option value=""></option>
                            <option value="GUI">GUI</option>
                            <option value="Database">Database</option>
                          </select>
                        </TableCell>

                      </div>
                    ) : (
                      <div id="addedStudents">
                        <TableCell>
                          {row.firstname}
                        </TableCell>
                        <TableCell >
                          {row.lastname}
                        </TableCell>
                        <TableCell >
                          {row.email}
                        </TableCell>
                        <TableCell >
                          {row.class}
                        </TableCell>
                      </div>
                    )}
                  </TableRow>
                </div>
              );
            })}
          </TableBody>
        </Table>
        <div justify="center">
          <br></br>
          {isEdit ? (
            <Button disabled>Submit</Button>
          ) : (
            <Button textAlign="center">Submit</Button>
          )}
        </div>
        </Grid>
      </TableBody >
      
    </Grid>
  );
}

export default createClassTableComponent;