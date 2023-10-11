import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from "@mui/material";

// third-party
import Chart from "react-apexcharts";

// project imports
import MainCard from "ui-component/cards/MainCard";
import SkeletonMetricsCard from "ui-component/cards/Skeleton/MetricsCard";
import { gridSpacing } from "shared/constant";

import ChartDataMonth from "./chart-data/total-order-month-line-chart";

// assets
import EarningIcon from "static/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import HotelIcon from "@mui/icons-material/Hotel";

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: theme.palette.primary.dark,
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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const SleepDurationCard = ({ isLoading }) => {
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
											<HotelIcon fontSize="inherit" />
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
											5.4 Hours
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item sx={{ mb: 1.25 }}>
								<Grid container alignItems="center">
									<Grid item xs={6}>
										<Grid container alignItems="center">
											<Grid item>
												<Typography
													sx={{
														fontSize: "1rem",
														fontWeight: 800,
														// color: theme.palette.secondary[200],
														color: "#ffffff",
													}}
												>
													Sleep Duration
												</Typography>
											</Grid>
											<Grid item xs={12}>
												<Typography
													sx={{
														fontSize: "1rem",
														fontWeight: 500,
														// color: theme.palette.secondary[200],
														color: "#ffffff",
													}}
												>
													Brandon need to take a break
													and have more rest.
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									<Grid item xs={6}>
										<Chart {...ChartDataMonth} />
									</Grid>
									{/* <Grid item xs={12}>
										<Typography
											sx={{
												fontSize: "1rem",
												fontWeight: 500,
												// color: theme.palette.secondary[200],
												color: "White",
											}}
										>
											Brandon need to take a break and
											have more rest.
										</Typography>
									</Grid> */}
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

SleepDurationCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default SleepDurationCard;
