import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Box } from "@mui/material";

import IconButton from "@mui/material/IconButton";

// project imports
import PatientDetailsCard from "./PatientDetailsCard";
import CaloriesCard from "./CaloriesCard";
import SleepDurationCard from "./SleepDurationCard";
import StepsCard from "./StepsCard";
import StreamCard from "./StreamCard";
import { gridSpacing } from "shared/constant";

import { useDispatch, useSelector } from "react-redux";
import HeartRateLineChart from "./HeartRateLineChart";
import ActivityLineChart from "./ActivityLineChart";

import Parent from "./archive/Parent";
import { selectPatients } from "features/patientsSlice";

// HARD CODED DATA
import patientListData from "pages/patientListData";

// ==============================|| DEFAULT DASHBOARD ||============================== //

let isInitial = true;

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const Dashboard = () => {
	const location = useLocation();
	const { state } = location;

	const patients = useSelector(selectPatients);

	const [isLoading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const [patient, setPatient] = useState({
		id: -1,
		avatar: "/images/avatars/wolf.png",
		name: "fake1",
		age: 90,
		height: 1.88,
		weight: 80,
		blood_type: "A",
		medication: [
			{ name: "Prinivil", count: "20mg", freq: "once a day" },
			{ name: "Metformin", count: "500mg", freq: "twice a day" },
		],
		medical_condition: [
			"High Blood Pressure",
			"Type II Diabetes",
			"Allergic to Ibuprofen",
		],
		nok_contact: {
			name: "Chiu Tien Le",
			relationship: "Son",
			phone_number: "+6591234567",
		},
	});

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		setLoading(false);
		// console.log(state)

		if (isInitial) {
			isInitial = false;
			if (state && state.patientId) {
				var currPatient = patients.data.find(currPatient => currPatient.id === state.patientId);
				// console.log(currPatient);
				let data = {
					...patientListData[currPatient.id % patientListData.length],
					name: `${currPatient.firstName} ${currPatient.lastName}`,
					id: currPatient.id
				}
				console.log(data)
				setPatient(data);
			} else if (patients.data && patients.data.length > 0) {
				console.log("Default to patient index 0");
				
				var currPatient = patients.data[0];

				let data = {
					...patientListData[currPatient.id % patientListData.length],
					name: `${currPatient.firstName} ${currPatient.lastName}`,
					id: currPatient.id
				}
				
				console.log(data)
				setPatient(data);
			}
		}
		
	}, [state]);

	const theme = useTheme();

	const nav = useNavigate();
	const dispatch = useDispatch();

	var lineChartOptions = {
		scales: {
			x: {
				ticks: {
					maxRotation: 90,
					minRotation: 90,
				},
			},
		},
	};

	const curPatientCode = () => {
		let data = (patient && patient.id) ? {
			...patient
		} : {
			...patientListData[0],
			id: 0
		}
		return <PatientDetailsCard isLoading={isLoading} data={data} />
	};

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
				{/* Introduction Card  */}
				<Grid item lg={9} md={9} sm={9} xs={12}>
					<Grid container spacing={gridSpacing}>
						{/* Steps and Calories Metrics Cards  */}
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<CaloriesCard isLoading={isLoading} patientId={patient.id} />
								</Grid>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<SleepDurationCard isLoading={isLoading} />
								</Grid>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<StepsCard isLoading={isLoading} patientId={patient.id}/>
								</Grid>
							</Grid>
						</Grid>
						{/* Stream Card  */}
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item xs={12} md={12}>
									<StreamCard isLoading={isLoading} />
								</Grid>
							</Grid>
						</Grid>
						{/* Heartrate Card  */}
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item xs={6} md={6}>
									<HeartRateLineChart patientId={patient.id} />
								</Grid>
								<Grid item xs={6} md={6}>
									<ActivityLineChart patientId={patient.id} />
								</Grid>
							</Grid>
						</Grid>
						{/* <Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item xs={6} md={6}>
									<Parent />
								</Grid>
							</Grid>
						</Grid> */}
					</Grid>
				</Grid>
				<Grid item lg={3} md={3} sm={3} xs={12}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									{/* <PatientDetailsCard isLoading={isLoading} /> */}
									{curPatientCode()}
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Box>
		// </Container>
	);
};

export default Dashboard;
