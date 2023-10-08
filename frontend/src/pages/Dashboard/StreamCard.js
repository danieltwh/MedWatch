import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { styled, useTheme, responsiveFontSizes } from "@mui/material/styles";
import {
	Avatar,
	Box,
	Grid,
	Menu,
	MenuItem,
	Typography,
	Collapse,
	CardActions,
	CardContent,
} from "@mui/material";

// import AspectRatio from "@mui/joy/AspectRatio";

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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TvIcon from "@mui/icons-material/Tv";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import HeartRateLineChart from "./HeartRateLineChart";
import VideoPage from "../videoPage";

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

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const StreamCard = ({ isLoading }) => {
	let theme = useTheme();
	theme = responsiveFontSizes(theme);

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
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
								<Grid
									container
									alignItems="center"
									justifyContent="space-between"
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
													<TvIcon fontSize="inherit" />
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
													Live Stream
												</Typography>
											</Grid>
										</Grid>
									</Grid>
									{/* Stream Button */}
									<Grid item>
										<Grid container>
											<CardActions disableSpacing>
												<ExpandMore
													expand={expanded}
													onClick={handleExpandClick}
													aria-expanded={expanded}
													aria-label="show more"
												>
													<ExpandMoreIcon
														style={{
															color: "#ffffff",
														}}
													/>
												</ExpandMore>
											</CardActions>
										</Grid>
									</Grid>
								</Grid>
								{/* Stream - Collapse/Expand */}
								<Grid item>
									<Grid container alignItems="center">
										<Collapse
											in={expanded}
											timeout="auto"
											unmountOnExit
										>
											<CardContent>
												<Grid item>
													<Grid
														container
														alignItems="center"
													>
														<VideoPage />
													</Grid>
												</Grid>
											</CardContent>
										</Collapse>
									</Grid>
								</Grid>
								{/* END Stream - Collapse/Expand */}
							</Grid>
						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

StreamCard.propTypes = {
	isLoading: PropTypes.bool,
};

export default StreamCard;
