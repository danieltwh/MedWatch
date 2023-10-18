import React from "react";

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
import SettingsIcon from '@mui/icons-material/Settings';
import MedicationIcon from "@mui/icons-material/Medication";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

import FitbitModal from "./FitbitModal";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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

const CardStyle = {
	color: "White",
	backgroundColor: "#b39ddb",
	borderRadius: "10px",
};

const CardHeaderTextStyle = {
	fontSize: {
		lg: "1.5rem",
		md: "1.5rem",
		sm: "1.5rem",
		xs: "1rem",
	},
	fontWeight: 800,
	mr: 1,
	mt: 0,
	mb: 1,
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
	fontSize: "1rem",
	fontWeight: 400,
	mr: 1,
	mt: 0.5,
	mb: 0.5,
};

const CardLinkStyle = {
	fontSize: {
		lg: "0.75rem",
		md: "0.75rem",
		sm: "0.75rem",
		xs: "0.5rem",
	},
	fontWeight: 800,
	textDecoration: "underline",
	mr: 1,
	mt: 0,
	mb: 1,
	cursor: "pointer",
	color: "#ffc107",
};

const ChildPatientList = (props) => {
	const [openFitbit, setOpenFitbit] = useState(true);
	const handleFitbitOpen = () => setOpenFitbit(true);
	const handleFitbitClose = () => setOpenFitbit(false);

	const nav = useNavigate();

	let theme = useTheme();
	theme = responsiveFontSizes(theme);

	const goto = () => {
		nav("/dashboard", { replace: true });
	};

	return (
		<>
			<FitbitModal open={openFitbit} handleClose={handleFitbitClose} />
			<CardWrapper border={false} content={false}>
				<Box sx={{ p: 2.25 }}>
					<Grid container direction="column">
						<Grid item>
							<Grid container justifyContent="center">
								<Grid item>
									<Box
										component="img"
										sx={{
											height: 150,
											width: 150,
											maxHeight: { xs: 250, md: 250 },
											maxWidth: { xs: 250, md: 250 },
											borderRadius: "50%",
										}}
										alt="Patient Photo"
										src={props.data.avatar}
									></Box>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Typography sx={CardHeaderTextStyle}>
									{props.data.name}
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Typography sx={CardSubHeaderTextStyle}>
									{props.data.age} years old
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<Grid container justifyContent="center">
								<Typography
									sx={CardLinkStyle}
									onClick={() => goto("/dashboard")}
								>
									Go to Dashboard
								</Typography>
								<Grid item>
									<Button
										sx={{
											cursor: "pointer",
											...theme.typography.smallAvatar,
											backgroundColor:
												theme.palette.secondary[200],
											color: theme.palette.secondary.dark,
										}}
										startIcon={<SettingsIcon />}
										onClick={handleFitbitOpen}
									>
										Device
									</Button>
									<IconButton />
								</Grid>
							</Grid>
						</Grid>
						{/* Basic Details */}
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
									<Avatar
										sx={{
											cursor: "pointer",
											...theme.typography.smallAvatar,
											backgroundColor:
												theme.palette.secondary[200],
											color: theme.palette.secondary.dark,
										}}
									>
										<PersonIcon fontSize="inherit" />
									</Avatar>
								</Grid>
								<Grid item p={2}>
									<Typography sx={CardInfoHeaderTextStyle}>
										Basic Details
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={CardStyle} p={2}>
							<Typography sx={CardInfoTextStyle}>
								<b>Height: </b>
								{props.data.height}
							</Typography>
							<Typography sx={CardInfoTextStyle}>
								<b>Weight: </b>
								{props.data.weight}
							</Typography>
							<Typography sx={CardInfoTextStyle}>
								<b>Blood Type: </b>
								{props.data.blood_type}
							</Typography>
						</Grid>
						{/* Medical Condition */}
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
									<Avatar
										sx={{
											cursor: "pointer",
											...theme.typography.smallAvatar,
											backgroundColor:
												theme.palette.secondary[200],
											color: theme.palette.secondary.dark,
										}}
									>
										<MedicalInformationIcon fontSize="inherit" />
									</Avatar>
								</Grid>
								<Grid item p={2}>
									<Typography sx={CardInfoHeaderTextStyle}>
										Medical Condition
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={CardStyle} p={2}>
							{props.data.medical_condition.map((item) => {
								return (
									<Typography sx={CardInfoTextStyle}>
										<b>{item}</b>
									</Typography>
								);
							})}
						</Grid>
						{/* Medication */}
						<Grid item>
							<Grid container alignItems="center">
								<Grid item>
									<Avatar
										sx={{
											cursor: "pointer",
											...theme.typography.smallAvatar,
											backgroundColor:
												theme.palette.secondary[200],
											color: theme.palette.secondary.dark,
										}}
									>
										<MedicationIcon fontSize="inherit" />
									</Avatar>
								</Grid>
								<Grid item p={2}>
									<Typography sx={CardInfoHeaderTextStyle}>
										Medication
									</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item style={CardStyle} p={2}>
							{props.data.medication.map((item) => {
								return (
									<Typography sx={CardInfoTextStyle}>
										<b>{item.name}: </b> {item.count},{" "}
										{item.freq}
									</Typography>
								);
							})}
						</Grid>
					</Grid>
				</Box>
			</CardWrapper>
		</>
	);
};

export default ChildPatientList;
