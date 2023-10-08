import PropTypes from "prop-types";
import { useState } from "react";

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
	mt: 1.75,
	mb: 0.75,
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

	return (
		<>
			{isLoading ? (
				<SkeletonMetricsCard />
			) : (
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
											src={PatientPhoto}
										></Box>
									</Grid>
								</Grid>
							</Grid>
							<Grid item p={1}>
								<Grid container justifyContent="center">
									<Typography sx={CardHeaderTextStyle}>
										Brandon Chiu Wei Le
									</Typography>
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
													theme.palette
														.secondary[200],
												color: theme.palette.secondary
													.dark,
											}}
										>
											<PersonIcon fontSize="inherit" />
										</Avatar>
									</Grid>
									<Grid item p={2}>
										<Typography
											sx={CardInfoHeaderTextStyle}
										>
											Basic Details
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item style={CardStyle} p={2}>
								<Typography sx={CardInfoTextStyle}>
									<b>Height: </b>178cm
								</Typography>
								<Typography sx={CardInfoTextStyle}>
									<b>Weight: </b>74.3kg
								</Typography>
								<Typography sx={CardInfoTextStyle}>
									<b>Blood Type: </b>A+
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
													theme.palette
														.secondary[200],
												color: theme.palette.secondary
													.dark,
											}}
										>
											<MedicalInformationIcon fontSize="inherit" />
										</Avatar>
									</Grid>
									<Grid item p={2}>
										<Typography
											sx={CardInfoHeaderTextStyle}
										>
											Medical Condition
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item style={CardStyle} p={2}>
								<Typography sx={CardInfoTextStyle}>
									<b>High Blood Pressure</b>
								</Typography>
								<Typography sx={CardInfoTextStyle}>
									<b>Type II Diabetes</b>
								</Typography>
								<Typography sx={CardInfoTextStyle}>
									<b>Allergic to Ibuprofen</b>
								</Typography>
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
													theme.palette
														.secondary[200],
												color: theme.palette.secondary
													.dark,
											}}
										>
											<MedicationIcon fontSize="inherit" />
										</Avatar>
									</Grid>
									<Grid item p={2}>
										<Typography
											sx={CardInfoHeaderTextStyle}
										>
											Medication
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item style={CardStyle} p={2}>
								<Typography sx={CardInfoTextStyle}>
									<b>Prinivil: </b>20mg, Once a day
								</Typography>
								<Typography sx={CardInfoTextStyle}>
									<b>Metformin: </b>500mg, Twice a day
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

PatientDetailCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default PatientDetailCard;
