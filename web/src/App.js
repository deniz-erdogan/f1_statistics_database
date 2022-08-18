import React, {useState, useEffect} from 'react';

import Header from './header';
import Intro from './intro'

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Button, Box, Typography, TextField, Divider, InputAdornment, MenuItem} from '@mui/material';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function POST(path, data) {
	return fetch(`http://localhost:5000${path}`,
	  	{
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
	  	}
	)
}

function GET(path){
	return fetch(`http://localhost:5000${path}`,
		{
			method: 'GET'
		}
	)
}

const q3_columns = [
	{field: 'Pitstopcount', headerName: 'Pitstop Count', type: 'number', width: 150},
	{field: 'AVG(position_order)', headerName: 'Average Position Order', type: 'number', width: 250},
];

const q4_columns = [
	{field: 'Pitstopcount', headerName: 'Pitstop Count', type: 'number', width: 150},
	{field: 'AVG(position_order)', headerName: 'Average Position Order', type: 'number', width: 250},
];

const q5_columns = [
	{field: 'nationality', headerName: 'Nationality', width: 150},
	{field: 'TotalDriverswhoNeverWon', headerName: 'Total Drivers Who never Won', type: 'number', width: 250},
];

const q6_columns = [
	{field: 'forename', headerName: 'First Name', width: 150},
	{field: 'surname', headerName: 'Last Name', width: 150},
];

const q7_columns = [
	{field: 'forename', headerName: 'First Name', width: 150},
	{field: 'surname', headerName: 'Last Name', width: 150},
	{field: 'nationality', headerName: 'Nationality', width: 150},
];

const q8_columns = [
	{field: 'surname', headerName: 'Last Name', width: 150},
	{field: 'AVG(PITSTOP.duration)', headerName: 'Average Pitstop Duration', type: 'number', width: 250},
];

const q9_columns = [
	{field: 'surname', headerName: 'Last Name', width: 150},
	{field: 'AVG(RESULTS.position_order)', headerName: 'Average Position Order', type: 'number', width: 250},
];

const q10_columns = [
	{field: 'driver_id', headerName: 'Driver ID', type: 'number', width: 150},
	{field: 'forename', headerName: 'First Name', width: 150},
	{field: 'surname', headerName: 'Last Name', width: 150},
	{field: 'year', headerName: 'Year', width: 150},
	{field: 'nationality', headerName: 'Nationality', width: 150},
];

const q11_columns = [
	{field: 'TeamName', headerName: 'Team Name', width: 150},
	{field: 'nationality', headerName: 'Nationality', width: 150},
	{field: 'BestPosition', headerName: 'Best Position', width: 150},
	{field: 'FirstYear', headerName: 'First Year', width: 150},
	{field: 'LastYear', headerName: 'Last Year', width: 150},
];

const q12_columns = [
	{field: 'forename', headerName: 'First Name', width: 150},
	{field: 'surname', headerName: 'Last Name', width: 150},
	{field: 'TotalPoints', headerName: 'Total Points', width: 150},
];

export default function App() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	);

	// q0
	const [q0_forename, q0_set_forename] = useState('Lewis');
	const [q0_surname, q0_set_surname] = useState('Hamilton');
	const [q0_res, q0_set_res] = useState(null);

	// q1
	const [q1_raceid, q1_set_raceid] = useState(1009);
	const [q1_driverid, q1_set_driverid] = useState(1);
	const [q1_res, q1_set_res] = useState(null);
	// q2
	const [q2_firstdriverid, q2_set_firstdriverid] = useState(1);
	const [q2_seconddriverid, q2_set_seconddriverid] = useState(830);
	const [q2_raceid, q2_set_raceid] = useState(1009);
	const [q2_res, q2_set_res] = useState(null);
	// q3
	const [q3_raceid, q3_set_raceid] = useState(1000);
	const [q3_res, q3_set_res] = useState(null);
	// q4
	const [q4_circuit_ref, q4_set_circuit_ref] = useState('Istanbul Park');
	const [q4_res, q4_set_res] = useState(null);
	// q5
	const [q5_position, q5_set_position] = useState(2);
	const [q5_res, q5_set_res] = useState(null);
	// q6
	const [q6_nationality, q6_set_nationality] = useState('British');
	const [q6_res, q6_set_res] = useState(null);

	// q7
	const [q7_year, q7_set_year] = useState(2014);
	const [q7_res, q7_set_res] = useState(null);

	// q8
	const [q8_raceid, q8_set_raceid] = useState(1002);
	const [q8_res, q8_set_res] = useState(null);

	// q9
	const [q9_year, q9_set_year] = useState(2001);
	const [q9_res, q9_set_res] = useState(null);

	// q10
	const [q10_res, q10_set_res] = useState(null);

	// q11
	const [q11_res, q11_set_res] = useState(null);

	// q12
	const [q12_won_count, q12_set_won_count] = useState(100);
	const [q12_res, q12_set_res] = useState(null);

	// q13
	const [q13_driver_surname, q13_set_driver_surname] = useState('Hamilton');
	const [q13_circuit_ref, q13_set_circuit_ref] = useState('Istanbul Park');
	const [q13_res, q13_set_res] = useState(null);

	const [circuits, set_circuits] = useState(null);
	const [nationality, set_nationality] = useState(null);
	//var circuits = null;

	if(circuits === null){
		GET('/circuits')
		.then((response) => {
			if(response.ok){
				return response.json();
			}
		})
		.then((data0) => {
			data0 = JSON.parse(data0);
			if(nationality === null){
				GET('/nationality')
				.then((response) => {
					if(response.ok){
						return response.json();
					}
				})
				.then((data) => {
					data = JSON.parse(data);
					set_circuits(data0);
					set_nationality(data);
				});
			}
		});
	}

	

	return (
		
    <ThemeProvider theme={theme}>
      <CssBaseline />
		<Header theme={theme} />
		<Intro />

		<Box>
			<Divider variant='middle'>Query 0</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Get driver id from surname and forename
				</Typography>

				<TextField
					label="Surname"
					helperText="Please enter"
					value={q0_surname}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q0_set_surname(e.target.value);}}
				/>

				<TextField
					label="Forename"
					helperText="Please enter"
					value={q0_forename}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q0_set_forename(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/get_driver_id', 
						JSON.stringify({surname : q0_surname, forename : q0_forename}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							q0_set_res(data[0]['driver_id']);
						});
				}}>Get Driver ID</Button>
			</Box>
			<Box paddingLeft={2} paddingTop={3}>
				{q0_res !== null && 
					<TextField 
						label='Driver ID'
						InputProps={{
							readOnly: true,
						}}
						defaultValue={q0_res}
					/>
				}
			</Box>
		</Box>
		
		<Box>
			<Divider variant='middle'>Query 1</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Average lap time of a driver for a given race (in seconds)
				</Typography>

				<TextField
					label="Race id"
					helperText="Please enter"
					type="number"
					value={q1_raceid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q1_set_raceid(e.target.value);}}
				/>

				<TextField
					label="Driver id"
					helperText="Please enter"
					type="number"
					value={q1_driverid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q1_set_driverid(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/find_average_laptime_by_race_id_and_driver_id', 
						JSON.stringify({race_id : q1_raceid, driver_id : q1_driverid}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							q1_set_res(data[0]['AVG(LAP.milliseconds)/1000']);
						});
				}}>find_average_laptime_by_race_id_and_driver_id</Button>
			</Box>
			<Box paddingLeft={2} paddingTop={3}>
				{q1_res !== null && 
					<TextField 
						label='Avg Lap Time'
						InputProps={{
							readOnly: true,
							endAdornment: <InputAdornment position="end">sec</InputAdornment>
						}}
						defaultValue={q1_res}
					/>
				}
			</Box>
		</Box>

		<Box>
			<Divider variant='middle'>Query 2</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Average pace difference between two drivers (in seconds)
				</Typography>

				<TextField
					label="First driver id"
					helperText="Please enter"
					type="number"
					value={q2_firstdriverid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q2_set_firstdriverid(e.target.value);}}
				/>

				<TextField
					label="second_driver_id"
					helperText="Please enter"
					type="number"
					value={q2_seconddriverid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q2_set_seconddriverid(e.target.value);}}
				/>

				<TextField
					label="Race id"
					helperText="Please enter"
					type="number"
					value={q2_raceid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q2_set_raceid(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/average_pace_difference_by_race', 
						JSON.stringify({race_id : q2_raceid, first_driver_id : q2_firstdriverid, second_driver_id : q2_seconddriverid}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							console.log(data);
							q2_set_res(data[0]['AVG(lap1.milliseconds - lap2.milliseconds) / 1000']);
						});
				}}>average_pace_difference_by_race</Button>
			</Box>
			<Box paddingLeft={2} paddingTop={2}>
				{q2_res !== null && 
					<TextField 
						label='Avg Pace Diff'
						InputProps={{
							readOnly: true,
							endAdornment: <InputAdornment position="end">sec</InputAdornment>
						}}
						defaultValue={q2_res}
					/>
				}
			</Box>
		</Box>

		<Box>
			<Divider variant='middle'>Query 3</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a race, average results of drivers grouped by the number of pitstops
				</Typography>

				<TextField
					label="Race id"
					helperText="Please enter"
					type="number"
					value={q3_raceid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q3_set_raceid(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/average_race_results_by_pitstop_single_race', 
						JSON.stringify({race_id : q3_raceid}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q3_set_res(data);
						});
				}}>average_race_results_by_pitstop_single_race</Button>
				
			</Box>

			{q3_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 300, width: '50%' }}>
					<DataGrid
						rows={q3_res}
						columns={q3_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 4</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a circuit, average results of drivers grouped by the number of pitstops for all races done on that circuit
				</Typography>

				{circuits !== null &&
					<TextField
						label="Circuit"
						select
						helperText="Please enter"
						value={q4_circuit_ref}
						sx={{paddingRight: '7px', width: '250px'}}
						onChange={(e) => {q4_set_circuit_ref(e.target.value);}}
					>
						{
							circuits.map((option) => (
								<MenuItem key={option.circuit_ref} value={option.circuit_ref}>
									{option.circuit_ref}
								</MenuItem>
							))
						}
					</TextField>
				}

				<Button variant="outlined" onClick={() => {
					POST('/average_race_results_by_pitstop_all_races_at_circuit', 
						JSON.stringify({circuit_ref : q4_circuit_ref}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q4_set_res(data);
						});
				}}>average_race_results_by_pitstop_all_races_at_circuit</Button>
			</Box>

			{q4_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 300, width: '50%' }}>
					<DataGrid
						rows={q4_res}
						columns={q4_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}

		</Box>

		<Box>
			<Divider variant='middle'>Query 5</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a position, find the number of drivers who have never finished a race in that position grouped by nationality
				</Typography>

				<TextField
					label="Position"
					helperText="Please enter"
					value={q5_position}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q5_set_position(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/find_countries_wins', 
						JSON.stringify({position : 2}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q5_set_res(data);
						});
				}}>find_countries_wins</Button>

			</Box>
			{q5_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '50%' }}>
					<DataGrid
						rows={q5_res}
						columns={q5_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 6</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a nationality, display names and surnames of drivers from that nation
				</Typography>

				{nationality !== null &&
					<TextField
						label="Nationality"
						select
						helperText="Please enter"
						value={q6_nationality}
						sx={{paddingRight: '7px', width: '250px'}}
						onChange={(e) => {q6_set_nationality(e.target.value);}}
					>
						{
							nationality.map((option) => (
								<MenuItem key={option.nationality} value={option.nationality}>
									{option.nationality}
								</MenuItem>
							))
						}
					</TextField>
				}

				<Button variant="outlined" onClick={() => {
					POST('/find_country_drivers', 
						JSON.stringify({nationality : q6_nationality}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q6_set_res(data);
						});
				}}>find_country_drivers</Button>
			</Box>
			{q6_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '40%' }}>
					<DataGrid
						rows={q6_res}
						columns={q6_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 7</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a year, return all drivers who scored a podium place in that season.
				</Typography>

				<TextField
					label="Year"
					helperText="Please enter"
					value={q7_year}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q7_set_year(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/find_drivers_who_have_been_in_position', 
						JSON.stringify({year : q7_year}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q7_set_res(data);
							
						});
				}}>find_drivers_who_have_been_in_position</Button>
			</Box>
			{q7_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '40%' }}>
					<DataGrid
						rows={q7_res}
						columns={q7_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 8</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a race, returns average pit stop durations for each driver in that race.
				</Typography>

				<TextField
					label="Race ID"
					helperText="Please enter"
					value={q8_raceid}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q8_set_raceid(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/average_pitstop_of_drivers', 
						JSON.stringify({race_id : q8_raceid}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q8_set_res(data);
						});
				}}>average_pitstop_of_drivers</Button>
			</Box>
			{q8_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '40%' }}>
					<DataGrid
						rows={q8_res}
						columns={q8_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 9</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a year, returns the average race finish position of each driver competing in that season.
				</Typography>

				<TextField
					label="Year"
					helperText="Please enter"
					value={q9_year}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q9_set_year(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/average_position_of_drivers_ascend', 
						JSON.stringify({race_year : q9_year}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q9_set_res(data);
						});
				}}>average_position_of_drivers_ascend</Button>
			</Box>
			{q9_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '40%' }}>
					<DataGrid
						rows={q9_res}
						columns={q9_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 10</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Returns the ids, the names, surnames, year and nationality of all 
					drivers who have a race for a constructor whom they share the same nationality with for each year. 
				</Typography>
				<Button variant="outlined" onClick={() => {
					POST('/the_drivers_for_their_nationality', 
						JSON.stringify({}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q10_set_res(data);
						});
				}}>the_drivers_for_their_nationality</Button>
			</Box>
			{q10_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '80%' }}>
					<DataGrid
						rows={q10_res}
						columns={q10_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 11</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					This query returns the name, nationality, best race finish and the interval they raced in Formula1 of each constructor 
					who never scored a point.
				</Typography>
				<Button variant="outlined" onClick={() => {
					POST('/constructors_with_zero_points', 
						JSON.stringify({}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q11_set_res(data);
						});
				}}>constructors_with_zero_points</Button>
			</Box>
			{q11_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '80%' }}>
					<DataGrid
						rows={q11_res}
						columns={q11_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 12</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Returns the total number of cumulative points of each 
					driver who raced for a constructor which has more than 100 wins to its name.
				</Typography>

				<TextField
					label="Won Count"
					helperText="Please enter"
					value={q12_won_count}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q12_set_won_count(e.target.value);}}
				/>

				<Button variant="outlined" onClick={() => {
					POST('/best_drivers_from_best_constructors', 
						JSON.stringify({won_count : q12_won_count}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							for(let i = 0; i < data.length; i++){
								data[i]['id'] = i;
							}
							q12_set_res(data);
						});
				}}>best_drivers_from_best_constructors</Button>
			</Box>
			{q12_res !== null && 
				<Box paddingLeft={2} paddingTop={3} sx={{ height: 500, width: '80%' }}>
					<DataGrid
						rows={q12_res}
						columns={q12_columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
					/>
				</Box>
			}
		</Box>

		<Box>
			<Divider variant='middle'>Query 13</Divider>
			<Box paddingLeft={2}>
				<Typography
					variant='body1'
					paddingTop={2}
					paddingBottom={3}
					textAlign='center'
				>
					Given a driver surname and circuit name, returns the average lap time of a driver on all races on that circuit.
				</Typography>

				<TextField
					label="Driver Surname"
					helperText="Please enter"
					value={q13_driver_surname}
					sx={{paddingRight: '7px'}}
					onChange={(e) => {q13_set_driver_surname(e.target.value);}}
				/>

				{circuits !== null &&
					<TextField
						label="Circuit"
						select
						helperText="Please enter"
						value={q13_circuit_ref}
						onChange={(e) => {q13_set_circuit_ref(e.target.value);}}
						sx={{paddingRight: '7px', width: '250px'}}
					>
						{
							circuits.map((option) => (
								<MenuItem key={option.circuit_ref} value={option.circuit_ref}>
									{option.circuit_ref}
								</MenuItem>
							))
						}
					</TextField>
				}


				<Button variant="outlined" onClick={() => {
					POST('/average_laptime_by_circuit', 
						JSON.stringify({ driver_surname : q13_driver_surname, circuit_ref : q13_circuit_ref}))
						.then((response) => {
							if(response.ok){
								return response.json();
							}
						})
						.then((data) => {
							console.log(data);
							data = JSON.parse(data);
							q13_set_res(data[0]['AVG(LAP.milliseconds)/1000']);
						});
				}}>average_laptime_by_circuit</Button>
			</Box>
			<Box paddingLeft={2} paddingTop={3}>
				{q13_res !== null && 
					<TextField 
						label='Avg Lap Time'
						InputProps={{
							readOnly: true,
							endAdornment: <InputAdornment position="end">sec</InputAdornment>
						}}
						defaultValue={q13_res}
					/>
				}
			</Box>
		</Box>

    </ThemeProvider>
  );
}
