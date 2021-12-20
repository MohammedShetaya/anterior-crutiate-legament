import React , {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/ArrowDownward';
import KeyboardArrowUpIcon from '@material-ui/icons/ArrowUpward';
import { format} from 'date-fns'
import axios from 'axios';

import {
  DateTimePicker,
} from '@material-ui/pickers';

import 
{FormControl,
 InputLabel,
 Select,
 Grid,
 Button,
 MenuItem,
 TextField,
 } 
from '@material-ui/core'; 

import SearchIcon from "@material-ui/icons/Search";



export default function SearchResults (props) {
    
  
  const [searchFilters , setSearchFilters] = useState(
    {
      from : "",
      to: "",
      departure_time: new Date(),
      return_time: new Date(),
      flight_class: "",
      adults: 0 ,
      childs:0
    }
  );
  
  const [searchResults , setSearchResults] = useState ([]);
  
    const getSearchResults =  (e) => {
      setSearchResults([]);

      let encodedSearchTerms = encodeURIComponent(JSON.stringify(searchFilters));

      axios.get(`http://localhost:8000/api/user/SearchFlights?searchFilters=${encodedSearchTerms}`)
           .then((r) => {
              setSearchResults(r.data);
           }) ;
    };

    return (

            <Grid container>

            <Paper style={{padding:"1.5%", backgroundColor:"#F1F1F1"}} >
            
            <TextField id="filled-basic"
              value={searchFilters.from} 
              label="From" style={{width:"15%", margin:"0.7%"}}
              variant="standard"
              onChange = {(e) => setSearchFilters({...searchFilters, from: e.target.value})}  

              />
            <TextField id="filled-basic"
              value={searchFilters.to}
              label="To"
              style={{width:"15%", margin:"0.7%"}}
              variant="standard"
              onChange = {(e) => setSearchFilters({...searchFilters, to: e.target.value})}  

              />

            <DateTimePicker 
            value={searchFilters.departure_time} 
            label="Departure"  
            style={{width:"17%", margin:"0.7%"}} 
            onChange = {(e) => setSearchFilters({...searchFilters, departure_time: e})} 
            />

            <DateTimePicker 
            value={searchFilters.return_time} 
            label="Return" style={{width:"17%", margin:"0.7%"}} 
            onChange = {(e) => setSearchFilters({...searchFilters, return_time: e})} 

            />

            <FormControl style={{width:"9%",margin:"0.7%"}}>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                value={searchFilters.flight_class}
                label="Class"
                onChange = {(e) => setSearchFilters({...searchFilters, flight_class: e.target.value})}  
                >
                <MenuItem value={"First"}>First</MenuItem>
                <MenuItem value={"Business"}>Business</MenuItem>
                <MenuItem value={"Economy"}>Economy</MenuItem>
              </Select>
            </FormControl>




            <TextField 
            id="filled-basic" 
            value={searchFilters.adults} 
            label="Adults" 
            style={{width:"6%",margin:"0.7%"}} 
            variant="standard"
            onChange = {(e) => setSearchFilters({...searchFilters, adults: e.target.value})}  
            />
            <TextField 
            id="filled-basic" 
            value={searchFilters.childs} 
            label="Childs" 
            style={{width:"6%",margin:"0.7%"}} 
            variant="standard" 
            onChange = {(e) => setSearchFilters({...searchFilters, childs: e.target.value})} 
            />

            <IconButton aria-label="delete" size="large"style={{marginTop:"1%"}} onClick={getSearchResults}>
            <SearchIcon fontSize="inherit" />
            </IconButton>

            </Paper> 

            <hr style = {{marginTop:"20px"}}/>

              <CollapsibleTable return_time={searchFilters.return_time} flight_class = {searchFilters.flight_class} adults={searchFilters.adults} childs = {searchFilters.childs} searchResults = {searchResults}/>

            </Grid>
    ) ;
}











function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const [returnFlights , setReturnFlights] = React.useState([]) ;

  const getReturnFlights = (e) => {
    if (!open){
      let encodedSearchTerms = encodeURIComponent(JSON.stringify(
        {
          from:  row.to,
          to: row.from,
          departure_time: row.arrival_time,
          flight_class: props.flight_class,
          adults: props.adults,
          childs: props.childs
        }       
      ));
        /*
      console.log({
        from: row.from,
        to: row.to,
        departure_time: props.return_time ,
        flight_class: props.flight_class,
        adults: props.adults,
        childs: props.childs
      }       );
      */
      axios.get(`http://localhost:8000/api/user/SearchFlights?searchFilters=${encodedSearchTerms}`)
           .then((r) => {
             //console.log(r);
            setReturnFlights(r.data);

           }) ;
    }
    else{
      setReturnFlights([]);
    }

    setOpen(!open) ;
  };
 
  const redirecrCheckOut = (e) => {
      // here to handle the redirect to the check out page and pass the two id's of departure and return 
      console.log(e.t); 

  }
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={getReturnFlights}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.flight_number}
        </TableCell>
        <TableCell align="left">{row.from}</TableCell>
        <TableCell align="left">{row.to}</TableCell>
        <TableCell align="left">{format(Date.parse(row.departure_time),"PPPPp")}</TableCell>
        <TableCell align="left">{format(Date.parse(row.arrival_time),"PPPPp")}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, marginTop:"5px" }}>
              <Typography variant="h6" gutterBottom component="div">
                Return Flights
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                      <TableCell align="left" component="th" scope="row">Flight Number</TableCell>
                      <TableCell align="right">From</TableCell>
                      <TableCell align="right">To</TableCell>
                      <TableCell align="right">Departure</TableCell>
                      <TableCell align="right">Arrival</TableCell>
                      <TableCell align="right"></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {returnFlights.map((returnRow) => (
                    <TableRow key={returnRow._id}>
                      <TableCell align="left">{returnRow.flight_number}</TableCell>
                      <TableCell align="right">{returnRow.from}</TableCell>
                      <TableCell align="right">{returnRow.to}</TableCell>
                      <TableCell align="right">{format(Date.parse(returnRow.departure_time),"PPPPp")}</TableCell>
                      <TableCell align="right">{format(Date.parse(returnRow.arrival_time),"PPPPp")}</TableCell>
                       <TableCell align="right">
                        <Link
                          to={{
                            pathname: "/flightsSummary",
                            state: {departure_id: row._id,
                                    arrival_id : returnRow._id,
                                    flight_class: props.flight_class,
                                    adults: props.adults,
                                    children: props.childs,

                            }
                          }}
                        >
                          <button className="btn btn-secondary">Continue</button>
                        </Link>
                      </TableCell>
                       
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>  
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    flight_number: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    departure_time: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired,

    returnFlights: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        flightNumber: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        departure: PropTypes.string.isRequired,
        arrival: PropTypes.string.isRequired,
      }),
    ).isRequired,

    price: PropTypes.number.isRequired,
    }).isRequired,
};



function CollapsibleTable(props) {
  return (
   

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell/>
                      <TableCell align="left">Flight Number</TableCell>
                      <TableCell align="left">From</TableCell>
                      <TableCell align="left">To</TableCell>
                      <TableCell align="left">Departure</TableCell>
                      <TableCell align="left">Arrival</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.searchResults.map((row) => (
                      <Row id={row._id}
                      return_time = {props.return_time} flight_class = {props.flight_class} adults={props.adults} childs = {props.childs}
                      row={row} />
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>


  );
}


const res = [{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
},
{
  _id : "123412341234123412341234",
  flight_number: "AEWF55",
  from: "CAIK",
  to:"RGREG",
  arrival_time: new Date(),
  departure_time: new Date(),
  economy : 50,
  business: 20,
  first: 15
}];