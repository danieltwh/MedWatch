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
import EarningIcon from "static/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

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

const StepsCard = ({ isLoading }) => {
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
											<DirectionsWalkIcon fontSize="inherit" />
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
											4,376 steps
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
									Steps Taken
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
									Need 5,624 more steps to complete 10,000
									steps.
								</Typography>
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

StepsCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default StepsCard;
