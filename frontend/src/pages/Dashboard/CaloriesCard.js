import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";

// material-ui
import { styled, useTheme, responsiveFontSizes } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonMetricsCard from "ui-component/cards/Skeleton/MetricsCard";
import { gridSpacing } from "shared/constant";

// assets
import EarningIcon from "static/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useSelector } from "react-redux";
import { selectCalories } from "features/caloriesSlice";

import { caloriesTotal as caloriesTotalAPI } from "features/api";

import { usePageVisibility } from "components/usePageVisibility";

// const CardWrapper = styled(MainCard)(({ theme }) => ({
// 	backgroundColor: "#fff",
// 	color: theme.palette.secondary.dark,
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
// 		background: theme.palette.secondary[800],
// 		borderRadius: "50%",
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
// 		width: 210,
// 		height: 210,
// 		background: theme.palette.secondary[800],
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

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: "#ffffff",
	color: theme.palette.primary.dark,
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
		background: theme.palette.primary[800],
		borderRadius: "50%",
		zIndex: 1,
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
		zIndex: 1,
		width: 210,
		height: 210,
		background: theme.palette.primary[800],
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

let isInitial = true;

const CaloriesCard = ({ isLoading, patientId}) => {
	let theme = useTheme();
	theme = responsiveFontSizes(theme);

	const [anchorEl, setAnchorEl] = useState(null);
	const [totalCalories, setTotalCalories] = useState(0);

	const isPageVisible = usePageVisibility();
	const timerIdRef = useRef(null);
	const [isPollingEnabled, setIsPollingEnabled] = useState(true);

	// const calories = useSelector(selectCalories)

	const fetchTotalCalories = async () => {
		var userCalories = await caloriesTotalAPI(patientId);
		if (userCalories.status != 200 && !userCalories.body && !userCalories.body.value) {
			console.log("Server down")
			return
		}
		var userTotalCalories = userCalories.body.value;
		// console.log(userCalories)
		setTotalCalories(userTotalCalories)
	}

	useEffect(() => {
		// console.log(patientId)
		// if (isInitial) {
		// 	// console.log(heartrate.status);
		// 	isInitial = false;
		// 	if(patientId < 0) {
		// 		return;
		// 	}
		// 	fetchTotalCalories();
		// }

		if(patientId < 0) {
			return;
		}
		fetchTotalCalories();

	}, [patientId]);

	// Polling data
	useEffect(() => {
		const startPolling = () => {
			timerIdRef.current = setInterval(fetchTotalCalories, 20000);
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
								<Grid container alignItems="center">
									<Grid item>
										<Avatar
											sx={{
												cursor: "pointer",
												...theme.typography.smallAvatar,
												backgroundColor:
													theme.palette.primary[200],
												color: theme.palette.primary
													.dark,
											}}
										>
											<WhatshotIcon fontSize="inherit" />
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
											{totalCalories} kcal
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item sx={{ mb: 1.25 }}>
								<Typography
									sx={{
										fontSize: "1rem",
										fontWeight: 800,
										// color: theme.palette.secondary[200],
										color: "#1e88e5",
									}}
								>
									Calories Burned
								</Typography>
							</Grid>
							<Grid item sx={{ mb: 1.25 }}>
								<Typography
									sx={{
										fontSize: "1rem",
										fontWeight: 500,
										// color: theme.palette.secondary[200],
										color: "#1e88e5",
									}}
								>
									Calories burned is in the normal
									range.
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

CaloriesCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default CaloriesCard;
