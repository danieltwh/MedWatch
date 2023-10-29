import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// material-ui
import { styled, useTheme, responsiveFontSizes } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonMetricsCard from "ui-component/cards/Skeleton/MetricsCard";
import { gridSpacing } from "shared/constant";

// assets
import PatientPhoto from "static/images/patientPicture.jpg";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import Child from "./ChildPatientList";
import PatientList from "../PatientList";

import PatientPicture from "static/images/patients/index";

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.dark,
	color: "#fff",
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

// ===========================|| DASHBOARD DEFAULT - PATIENT DETAILS CARD ||=========================== //

const PatientDetailCard = ({ isLoading }) => {
	let theme = useTheme();
	theme = responsiveFontSizes(theme);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const data = {
		// avatar: "https://i.imgur.com/oflMA1gb.jpg",
		avatar: PatientPicture.profilePicture_01,
		name: "Brandon Chiu",
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
	};

	return <>{isLoading ? <SkeletonMetricsCard /> : <Child data={data} />}</>;
};

PatientDetailCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default PatientDetailCard;
