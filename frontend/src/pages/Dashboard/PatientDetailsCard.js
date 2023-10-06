import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
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
	backgroundColor: "#8a94bd",
	borderRadius: "20px",
};

const CardHeaderTextStyle = {
	fontSize: "2.125rem",
	fontWeight: 800,
	mr: 1,
	mt: 1.75,
	mb: 0.75,
	fontFamily: "Helvetica Neue",
};

const CardInfoTextStyle = {
	fontSize: "1.000rem",
	fontWeight: 400,
	mr: 1,
	mt: 1.75,
	mb: 0.75,
	fontFamily: "Helvetica Neue",
};

// ===========================|| DASHBOARD DEFAULT - PATIENT DETAILS CARD ||=========================== //

const PatientDetailCard = ({ isLoading }) => {
	const theme = useTheme();

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
				<CardWrapper
					border={false}
					content={false}
					style={{
						color: "White",
						backgroundColor: "#001670",
					}}
				>
					<Box sx={{ p: 2.25 }}>
						<Grid container direction="column">
							<Grid item>
								<Grid
									container
									justifyContent="center"
									spacing={gridSpacing}
								>
									<Grid item>
										<Box
											component="img"
											sx={{
												height: 250,
												width: 250,
												maxHeight: { xs: 250, md: 250 },
												maxWidth: { xs: 250, md: 250 },
											}}
											alt="Patient Photo"
											src={PatientPhoto}
										></Box>
									</Grid>
									{/* <Grid item>
										<Avatar
											variant="rounded"
											sx={{
												...theme.typography
													.commonAvatar,
												...theme.typography
													.mediumAvatar,
												backgroundColor:
													theme.palette.secondary
														.dark,
												color: theme.palette
													.secondary[200],
												zIndex: 1,
											}}
											aria-controls="menu-earning-card"
											aria-haspopup="true"
											onClick={handleClick}
										>
											<MoreHorizIcon fontSize="inherit" />
										</Avatar>
										<Menu
											id="menu-earning-card"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
											variant="selectedMenu"
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "right",
											}}
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
										>
											<MenuItem onClick={handleClose}>
												<GetAppTwoToneIcon
													sx={{ mr: 1.75 }}
												/>{" "}
												Import Card
											</MenuItem>
											<MenuItem onClick={handleClose}>
												<FileCopyTwoToneIcon
													sx={{ mr: 1.75 }}
												/>{" "}
												Copy Data
											</MenuItem>
											<MenuItem onClick={handleClose}>
												<PictureAsPdfTwoToneIcon
													sx={{ mr: 1.75 }}
												/>{" "}
												Export
											</MenuItem>
											<MenuItem onClick={handleClose}>
												<ArchiveTwoToneIcon
													sx={{ mr: 1.75 }}
												/>{" "}
												Archive File
											</MenuItem>
										</Menu>
									</Grid> */}
								</Grid>
							</Grid>
							<Grid item>
								<Grid
									container
									justifyContent="center"
									alignItems="center"
									spacing={gridSpacing}
								>
									<Grid>
										<Typography sx={CardHeaderTextStyle}>
											Brandon Chiu Wei Le
										</Typography>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12}>
								<Grid container>
									<Grid
										item
										lg={4}
										md={4}
										sm={4}
										xs={4}
										align="center"
										p={1}
									>
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
												<PersonIcon fontSize="inherit" />
											</Avatar>
										</Grid>
										<Grid item>
											<Typography
												sx={CardHeaderTextStyle}
											>
												Basic Details
											</Typography>
										</Grid>
										<Grid item style={CardStyle} p={1}>
											<Typography sx={CardInfoTextStyle}>
												Height: 178cm
											</Typography>
											<Typography sx={CardInfoTextStyle}>
												Weight: 74.3kg
											</Typography>
											<Typography sx={CardInfoTextStyle}>
												Blood Type: A+
											</Typography>
										</Grid>
									</Grid>
									<Grid
										item
										lg={4}
										md={4}
										sm={4}
										xs={4}
										align="center"
										p={1}
									>
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
												<MedicationIcon fontSize="inherit" />
											</Avatar>
										</Grid>
										<Grid>
											<Typography
												sx={CardHeaderTextStyle}
											>
												Medication
											</Typography>
										</Grid>
										<Grid item style={CardStyle} p={1}>
											<Typography sx={CardInfoTextStyle}>
												Prinivil: 20mg, Once a day
											</Typography>
											<Typography sx={CardInfoTextStyle}>
												Metformin: 500mg, Twice a day
											</Typography>
										</Grid>
									</Grid>
									<Grid
										item
										lg={4}
										md={4}
										sm={4}
										xs={4}
										align="center"
										p={1}
									>
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
												<MedicalInformationIcon fontSize="inherit" />
											</Avatar>
										</Grid>
										<Grid>
											<Typography
												sx={CardHeaderTextStyle}
											>
												Medical Condition
											</Typography>
										</Grid>
										<Grid item style={CardStyle} p={1}>
											<Typography sx={CardInfoTextStyle}>
												High Blood Pressure
											</Typography>
											<Typography sx={CardInfoTextStyle}>
												Type II Diabetes
											</Typography>
											<Typography sx={CardInfoTextStyle}>
												Allergic to Ibuprofen
											</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
							{/* <Grid item sx={{ mb: 1.25 }}>
								<Typography
									sx={{
										fontSize: "1rem",
										fontWeight: 500,
										color: theme.palette.secondary[200],
									}}
								>
									Total Earning
								</Typography>
							</Grid> */}
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
