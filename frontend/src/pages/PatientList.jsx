// Settings.js
import React from "react";
import styles from "./patientlist.module.css";
import arrow_left from "static/images/arrow_left.svg";
import arrow_right from "static/images/arrow_right.svg";
import arrow_down from "static/images/arrow_down.svg";
import logo_black from "static/images/logo_black.png";
import search from "static/images/search.svg";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Collapse, Typography, Box } from "@mui/material";

import MainCard from "ui-component/cards/MainCard";
import SkeletonMetricsCard from "ui-component/cards/Skeleton/MetricsCard";
import { gridSpacing } from "shared/constant";

import Child from "pages/Dashboard/ChildPatientList";
import PatientListDetails from "./PatientListDetails";
import PatientDetailsCard from "pages/Dashboard/PatientDetailsCard";
import patientListData from "./patientListData";

import { patientList as patientListAPI } from "features/api";

import { patientsActions, selectPatients } from "features/patientsSlice";
import { authActions } from "features/authSlice";
import { logout as logoutLocalStorage } from "features/auth";

let isInitial = true;

const CardWrapper = styled(MainCard)(({ theme }) => ({
	// backgroundColor: theme.palette.secondary.dark,
	backgroundColor: "#ffffff",
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

const CardStyle = {
	color: "#4527a0",
	// backgroundColor: "#b39ddb",
	backgroundColor: "#e3e8ef",
	borderRadius: "10px",
	width: "16vw",
	height: "14vw",
	alignItems: "center",
	justifyContent: "space-evenly",
	cursor: "pointer",
	mt: "1vw",
	// mb: "2vh",
	boxShadow: "0px 2px 14px rgba(35,29,94,.5)",
};

const CardSelectedStyle = {
	color: "#e3e8ef",
	backgroundColor: "#4527a0",
	// backgroundColor: "#e3e8ef",
	borderRadius: "10px",
	width: "16vw",
	height: "14vw",
	alignItems: "center",
	justifyContent: "space-evenly",
	cursor: "pointer",
	mt: "1vw",
	boxShadow: "0px 2px 14px rgba(35,29,94,.5)",
};

const CardHeaderTextStyle = {
	fontSize: {
		lg: "2.0rem",
		md: "2.0rem",
		sm: "2.0rem",
		xs: "1.5rem",
	},
	fontWeight: 800,
	ml: 2,
	mr: 2,
	mt: 2,
	mb: 2,
};

const CardSubHeaderTextStyle = {
	fontSize: {
		lg: "1.25rem",
		md: "1.25rem",
		sm: "1.25rem",
		xs: "0.875rem",
	},
	fontWeight: 500,
	mr: 1,
	mt: 0,
	mb: 1,
};

const CardInfoHeaderTextStyle = {
	fontSize: {
		lg: "1.25rem",
		md: "1.25rem",
		sm: "1.25rem",
		xs: "0.875rem",
	},
	fontWeight: 800,
	mr: 1,
	mt: 1.25,
	mb: 1.25,
};

const CardInfoTextStyle = {
	fontSize: "1.125rem",
	fontWeight: 800,
	mr: 1,
	mt: 0.5,
	mb: 0.5,
	textAlign: "center",
};

// ===========================|| PATIENT LIST ||=========================== //

function PatientList() {
	const dispatch = useDispatch();
	const nav = useNavigate();

	const patients = useSelector(selectPatients);

	const theme = useTheme();

	let [page, setPage] = useState(0);
	let [patientList2, setPatientList] = useState([]);
	let [curPatient, setCurPatient] = useState(null);

	const startIdx = page * 12;
	const endIdx = Math.min((page + 1) * 12, patientList2.length);
	const curPatientList = patientList2.slice(startIdx, endIdx);

	//patient info related API, use dummy variables for now
	// const patients = async () => {
	//     let patientList = fetchPatientList().catch(error => {
	//         console.log('Get patient list error', error);
	//     });

	//     dispatch(patientListActions.set(patienList));
	// }
	const fetchPatientData = async () => {
		let patientList = await patientListAPI().catch((error) => {
			console.log("There was an error", error);
		});
		console.log(patientList);
		if (patientList.status == 200) {
			dispatch(patientsActions.set(patientList.body));
		} else if (patientList.status == 401) {
			// Unauthorized
			logoutLocalStorage();
			dispatch(authActions.logout());
			nav("/login", {replace: true})
		}


		let patientData = patientListData;

		// 拿取假資料的過程
		let pl = [];
		for (let i = 0; i < 56; i++) {
			pl.push(JSON.parse(JSON.stringify(patientData[i % 6])));
			pl[i].index = i;
			pl[i].name += "-" + pl[i].index;
		}
		setPatientList(pl);
		console.log("setPatientList", patientList);
	};

	useEffect(() => {
		if (isInitial) {
			// console.log(heartrate.status);
			isInitial = false;
			fetchPatientData();
		}
	}, [dispatch]);


	function selectPatient(patient) {
		setCurPatient(patient);
		// console.log(curPatient)
	}

	// const goto = () => {
	// 	nav("/dashboard", { replace: true });
	// };

	const curPatientCode = () => {
		if (!curPatient) return;
		// return <Child data={curPatient} />;
		let data = {
			...patientListData[curPatient.id % patientListData.length],
			name: `${curPatient.firstName} ${curPatient.lastName}`,
			id: curPatient.id
		}
		// return <Child data={data} />;
		return <PatientListDetails data={data} />;
	};

	const pageTo = (id) => {
		console.log("pageTo", id);
		if (id < 0 || id * 12 >= patientList2.length) return;
		setPage(id);
	};

	function pagesCode() {
		const pageCount = patientList2.length / 12;
		let code = [];
		for (let i = 0; i < pageCount; i++) {
			if (i === page) code.push(styles.pageDotSelected);
			else code.push(styles.pageDot);
		}
		return code.map((c, idx) => (
			<div className={c} onClick={() => pageTo(idx)}></div>
		));
	}

	return (
		// <Container>
		<Box
			sx={{
				bgcolor: theme.palette.grey[100],
				height: "100%",
				margin: "20px 10px 0px 10px",
				padding: "80px 20px 20px 20px",
				borderTopLeftRadius: "12px",
				borderTopRightRadius: "12px",
			}}
		>
			<Grid container spacing={gridSpacing}>
				{/* Patient List */}
				<Grid item lg={9} md={9} sm={9} xs={12}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<CardWrapper border={false} content={false}>
								<Box sx={{ p: 2.25 }}>
									<Grid container direction="column">
										<Grid item>
											<Grid container>
												<Typography
													sx={CardHeaderTextStyle}
												>
													Patient List
												</Typography>
											</Grid>
										</Grid>
										<Grid item>
											<Grid
												container
												justifyContent="space-between"
											>
												{patients.data.map((patient) =>
											(
														<Grid
															item
															style={(!curPatient || curPatient.id !== patient.id ) ? CardStyle : CardSelectedStyle}
															p={3}
															mt={2}
															onClick={() =>
																selectPatient(
																	patient
																	// patientList2[patient.id % patientList2.length]
																	// patientListData[patient.id % patientListData.length]
																)
															}
															key={patient.id}
														>
															<Grid
																container
																justifyContent="center"
															>
																<Grid item>
																	<Box
																		component="img"
																		className={
																			styles.avatar
																		}
																		src={
																			// patient.avatar
																			patientListData[patient.id % patientListData.length].avatar
																		}
																		alt="avatar"
																	></Box>
																</Grid>
															</Grid>
															<Grid
																container
																justifyContent="center"
															>
																<Grid item>
																	<Typography
																		sx={
																			CardInfoTextStyle
																		}
																	>
																		{
																			// patient.name
																			`${patient.firstName} ${patient.lastName}`
																		}
																	</Typography>
																</Grid>
															</Grid>
														</Grid>
													) 
												)}
											</Grid>
											{/* Page Navigator */}
											<Grid
												container
												justifyContent="center"
											>
												<Grid
													item
													className={styles.pageLine}
												>
													<Box
														component="img"
														src={arrow_left}
														onClick={() =>
															pageTo(page - 1)
														}
														alt="arrow"
													></Box>
													{pagesCode()}
													<Box
														component="img"
														src={arrow_right}
														onClick={() =>
															pageTo(page + 1)
														}
														alt="arrow"
													></Box>
												</Grid>
											</Grid>
										</Grid>
									</Grid>
								</Box>
							</CardWrapper>
						</Grid>
					</Grid>
				</Grid>
				{/* Bio Panel */}
				<Grid item lg={3} md={3} sm={3} xs={12}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									{curPatientCode()}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default PatientList;
