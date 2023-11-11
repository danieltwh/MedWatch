import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
// import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "shared/constant";

// chart data
import chartData from "./chart-data/total-growth-bar-chart";

import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import 'chartjs-adapter-luxon';

import { heartrate as heartrateAPI } from "features/api";
import { heartrateDetailLevel as heartrateDetailLevelAPI } from "features/api";

import { heartrateActions, selectHeartrate } from "features/heartrateSlice";

import LineChart from "components/LineChart";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";

import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { authActions } from "features/authSlice";
import { logout as logoutLocalStorage } from "features/auth";
import { usePageVisibility } from "components/usePageVisibility";

const status = [
	{
		value: "1min",
		label: "1 Min",
	},
	{
		value: "3min",
		label: "3 Min",
	},
	{
		value: "5min",
		label: "5 Min",
	},
	{
		value: "1hour",
		label: "1 Hour",
	},
	{
		value: "Today",
		label: "Today",

	},
	// {
	// 	value: "month",
	// 	label: "This Month",
	// },
	// {
	// 	value: "year",
	// 	label: "This Year",
	// },
];

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: "#fff",
	color: theme.palette.secondary.dark,
	overflow: "hidden",
	position: "relative",
	"&>div": {
		position: "relative",
		zIndex: 5,
	},
	"&:after": {
		content: '""',
		position: "absolute",
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: "50%",
		top: -85,
		right: -95,
		[theme.breakpoints.down("sm")]: {
			top: -105,
			right: -140,
		},
	},
	"&:before": {
		content: '""',
		position: "absolute",
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: "50%",
		top: -125,
		right: -15,
		opacity: 0.5,
		[theme.breakpoints.down("sm")]: {
			top: -155,
			right: -70,
		},
	},
}));

// const CardWrapper = styled(MainCard)(({ theme }) => ({
// 	backgroundColor: "#ffffff",
// 	color: theme.palette.primary.dark,
// 	overflow: "hidden",
// 	position: "relative",
// 	"&>div": {
// 		position: "relative",
// 		zIndex: 5,
// 	},
// 	"&:after": {
// 		content: '""',
// 		position: "absolute",
// 		width: 210,
// 		height: 210,
// 		background: theme.palette.primary[800],
// 		borderRadius: "50%",
// 		zIndex: 1,
// 		top: -85,
// 		right: -95,
// 		[theme.breakpoints.down("sm")]: {
// 			top: -105,
// 			right: -140,
// 		},
// 	},
// 	"&:before": {
// 		content: '""',
// 		position: "absolute",
// 		zIndex: 1,
// 		width: 210,
// 		height: 210,
// 		background: theme.palette.primary[800],
// 		borderRadius: "50%",
// 		top: -125,
// 		right: -15,
// 		opacity: 0.5,
// 		[theme.breakpoints.down("sm")]: {
// 			top: -155,
// 			right: -70,
// 		},
// 	},
// }));

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

let isInitial = true;

const HeartRateLineChart = ({ isLoading, patientId }) => {
	const [value, setValue] = useState("5min");
	const theme = useTheme();
	const customization = ["24h", "6h", "1h", "30min"];

	const isPageVisible = usePageVisibility();
	const timerIdRef = useRef(null);
	const [isPollingEnabled, setIsPollingEnabled] = useState(true);

	const { navType } = customization;
	const { primary } = theme.palette.text;
	const darkLight = theme.palette.dark.light;
	const grey200 = theme.palette.grey[200];
	const grey500 = theme.palette.grey[500];

	const primary200 = theme.palette.primary[200];
	const primaryDark = theme.palette.primary.dark;
	const secondaryMain = theme.palette.secondary.main;
	const secondaryLight = theme.palette.secondary.light;

	useEffect(() => {
		const newChartData = {
			...chartData.options,
			colors: [primary200, primaryDark, secondaryMain, secondaryLight],
			xaxis: {
				labels: {
					style: {
						colors: [
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
							primary,
						],
					},
				},
			},
			yaxis: {
				labels: {
					style: {
						colors: [primary],
					},
				},
			},
			grid: {
				borderColor: grey200,
			},
			tooltip: {
				theme: "light",
			},
			legend: {
				labels: {
					colors: grey500,
				},
			},
		};

		// do not load chart when loading
		if (!isLoading) {
			ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
		}
	}, [
		navType,
		primary200,
		primaryDark,
		secondaryMain,
		secondaryLight,
		primary,
		darkLight,
		grey200,
		isLoading,
		grey500,
	]);

	// MedWatch Code
	const nav = useNavigate();
	const dispatch = useDispatch();

	const heartrate = useSelector(selectHeartrate);

	const fetchHeartrateData = async () => {

		let userHeartRate = await heartrateDetailLevelAPI(value, patientId).catch((error) => {
			console.log("There was an error", error);
		});

		if(!userHeartRate) {
			console.log("Server Down");
			return ;
		} else if (userHeartRate.status == 200) {
			// setHeartRateData(userHeartRate.body);
			dispatch(heartrateActions.set(userHeartRate.body));
		} else if (userHeartRate.status == 401) {
			// Logout
			// localStorage.removeItem("authenticated");
			// localStorage.removeItem("token");
			// localStorage.removeItem("token_type");
			logoutLocalStorage();
			dispatch(authActions.logout());
			nav("/login", { replace: true });
		}
	};

	useEffect(() => {
		if (isInitial) {
			// console.log(heartrate.status);
			isInitial = false;
			if(patientId < 0) {
				return;
			}
			fetchHeartrateData();
		}
	}, [dispatch]);

	// Refresh Data when value changes
	useEffect(() => {
		if(patientId < 0) {
			return;
		}
		fetchHeartrateData();
	}, [value, patientId])

	// Polling data
	useEffect(() => {
		const startPolling = () => {
			timerIdRef.current = setInterval(fetchHeartrateData, 5000);
		}
		const stopPolling = () => {
			clearInterval(timerIdRef.current);
		}

		if(isPageVisible && isPollingEnabled) {
			startPolling();
		} else {
			stopPolling();
		}

		return () => {
			stopPolling();
		}
	}, [isPageVisible, isPollingEnabled, patientId]);


	const getChartOptions = () => {
		var offset_minutes;
		switch(value) {
			case "1min":
				offset_minutes = 1;
				break;
			case "5min":
				offset_minutes = 5;
				break;
			case "1hour":
				offset_minutes = 60;
				break;
			case "Today":
				offset_minutes = 1440;
				break;
			default:
				offset_minutes = 5
				break;
		}


		// let luxonDate = DateTime.now();
		// let luxonDate = DateTime.fromObject({ year: 2023, month: 10, day: 15, hour: 12, minute: 0, second: 0 });
		let luxonDate = DateTime.now().minus({days:1});

		const endTime = luxonDate
		// const startTime = luxonDate.minus({hours:1});
		const startTime = luxonDate.minus({minutes:offset_minutes});

		// console.log("Here")
		// console.log(startTime, endTime);


		var lineChartOptions = {
			responsive: true,
			scales: {
				x : {
					type: 'time',
					time: {
						unit: 'minute'
					},
					min: startTime.valueOf(),
					max: endTime.valueOf(),
					ticks: {
						maxRotation: 45,
						minRotation: 45,
					}
				},
				y: {
					min: 0,
					max: 250,
					ticks: {
						// forces step size to be 50 units
						stepSize: 10
					}
				}
			},
			maintainAspectRatio: false,
		};

		return lineChartOptions;
	}
	

	// const WhiteBorderTextField = styled(TextField)`
	// 	& label.Mui-focused {
	// 		color: white;
	// 	}
	// 	& .MuiOutlinedInput-root {
	// 		&.Mui-focused fieldset {
	// 			border-color: white;
	// 		}
	// 	}
	// `;

	const WhiteTextField = styled(TextField)({
		"& label.Mui-focused": {
			color: "white",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "white",
		},
		"& .MuiInputLabel-root": {
			color: "white",
		},
		"& .MuiOutlinedInput-input": {
			color: "#5e35b1",
			background: "white",
			fontWeight: 800,
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#5e35b1",
			},
			"&:hover fieldset": {
				borderColor: "#5e35b1",
			},
			"&.Mui-focused fieldset": {
				borderColor: "white",
			},
		},
	});

	return (
		<>
			{isLoading ? (
				<SkeletonTotalGrowthBarChart />
			) : (
				// <MainCard>
				<CardWrapper>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<Grid
								container
								alignItems="center"
								justifyContent="space-between"
							>
								<Grid item>
									<Grid
										container
										direction="column"
										spacing={1}
									>
										<Grid item>
											<Grid container alignItems="center">
												<Grid item>
													<Avatar
														sx={{
															cursor: "pointer",
															...theme.typography
																.smallAvatar,
															backgroundColor:
																theme.palette
																	.secondary[200],
															color: theme.palette
																.secondary.dark,
														}}
													>
														<MonitorHeartIcon fontSize="inherit" />
													</Avatar>
												</Grid>
												<Grid item p={1}>
													<Typography
														sx={{
															fontSize: {
																lg: "1.75rem",
																md: "1.75rem",
																sm: "1.75rem",
																xs: "1.25rem",
															},
															fontWeight: 800,
															mr: 1,
															mt: 1.75,
															mb: 0.75,
														}}
													>
														90 BPM
													</Typography>
												</Grid>
											</Grid>
										</Grid>
										<Grid item>
											<Typography
												sx={{
													fontSize: "1rem",
													fontWeight: 800,
													// color: theme.palette.secondary[200],
													color: "#5e35b1",
												}}
											>
												Heart Rate
											</Typography>
										</Grid>
									</Grid>
								</Grid>
								<Grid item>
									<WhiteTextField
										id="standard-select-currency"
										select
										value={value}
										onChange={(e) => {
												setValue(e.target.value);
											}
										}
									>
										{status.map((option) => (
											<MenuItem
												key={option.value}
												value={option.value}
											>
												{option.label}
											</MenuItem>
										))}
									</WhiteTextField>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sx={{height: "350px"}}>
							{/* <Chart {...chartData} /> */}
							<Line
								data={{
									labels: heartrate.data.map((data) => {
										let luxonDate = DateTime.fromJSDate(
											new Date(data.time)
										);
										// return luxonDate.toFormat("hh:mm:ss");
										return luxonDate
									}),
									datasets: [
										{
											label: "Heart Rate",
											data: heartrate.data.map(
												(data) => data.value
											),
											borderColor: "#5e35b1",
											backgroundColor: "#5e35b1",
										},
									],
									borderColor: "black",
									borderWidth: 2,
								}}
								// options={lineChartOptions}
								options={getChartOptions()}
							/>
						</Grid>
					</Grid>
				</CardWrapper>
				// </MainCard>
			)}
		</>
	);
};

HeartRateLineChart.propTypes = {
	isLoading: PropTypes.bool,
};

export default HeartRateLineChart;
