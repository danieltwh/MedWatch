import { useEffect, useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Container, Grid, Collapse, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

// project imports
import EarningCard from "./EarningCard";
import PatientDetailsCard from "./PatientDetailsCard";
import CaloriesCard from "./CaloriesCard";
import SleepDurationCard from "./SleepDurationCard";
import StepsCard from "./StepsCard";
import StreamCard from "./StreamCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "shared/constant";

import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

import { heartrate as heartrateAPI } from "features/api";

import { heartrateActions, selectHeartrate } from "features/heartrateSlice";

import LineChart from "components/LineChart";
import { Line } from "react-chartjs-2";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import HeartRateLineChart from "./HeartRateLineChart";
import ActivityLineChart from "./ActivityLineChart";


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
	const [isLoading, setLoading] = useState(true);
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		setLoading(false);
	}, []);

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
									<CaloriesCard isLoading={isLoading} />
								</Grid>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<SleepDurationCard isLoading={isLoading} />
								</Grid>
								<Grid item lg={4} md={4} sm={4} xs={12}>
									<StepsCard isLoading={isLoading} />
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
									<HeartRateLineChart />
								</Grid>
								<Grid item xs={6} md={6}>
									<ActivityLineChart />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item lg={3} md={3} sm={3} xs={12}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item lg={12} md={12} sm={12} xs={12}>
									<PatientDetailsCard isLoading={isLoading} />
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
