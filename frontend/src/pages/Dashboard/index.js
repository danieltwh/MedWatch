import { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";

// project imports
import EarningCard from "./EarningCard";
import PatientDetailsCard from "./PatientDetailsCard";
import CaloriesCard from "./CaloriesCard";
import SleepDurationCard from "./SleepDurationCard";
import StepsCard from "./StepsCard";
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

// ==============================|| DEFAULT DASHBOARD ||============================== //

let isInitial = true;

const Dashboard = () => {
	const [isLoading, setLoading] = useState(true);
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
				padding: "20px",
				borderTopLeftRadius: "12px",
				borderTopRightRadius: "12px",
			}}
		>
			<Grid container spacing={gridSpacing}>
				{/* Introduction Card  */}
				<Grid item xs={12}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<PatientDetailsCard isLoading={isLoading} />
					</Grid>
				</Grid>
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
						{/* <Grid item lg={4} md={12} sm={12} xs={12}>
							<Grid container spacing={gridSpacing}>
								<Grid item sm={6} xs={12} md={6} lg={12}>
									<TotalIncomeDarkCard
										isLoading={isLoading}
									/>
								</Grid>
								<Grid item sm={6} xs={12} md={6} lg={12}>
									<TotalIncomeLightCard
										isLoading={isLoading}
									/>
								</Grid>
							</Grid>
						</Grid> */}
					</Grid>
				</Grid>
				{/* Heartrate Card  */}
				<Grid item xs={12}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={6} md={6}>
							{/* <TotalGrowthBarChart isLoading={isLoading} /> */}
							<HeartRateLineChart />
							{/* <Line data={{
                labels: heartrate.data.map(data => {
                  let luxonDate = DateTime.fromJSDate(new Date(data.time));
                  return luxonDate.toFormat("hh:mm:ss")
                }),
                datasets: [
                  {
                    label: "Heart Rate",
                    data: heartrate.data.map(data => data.value)
                  }
                ],
                borderColor: "black",
                borderWidth: 2
              }} options={lineChartOptions} /> */}
						</Grid>
						<Grid item xs={6} md={6}>
							<HeartRateLineChart />
						</Grid>
						{/* <Grid item xs={12} md={4}>
							<PopularCard isLoading={isLoading} />
						</Grid> */}
					</Grid>
				</Grid>
			</Grid>
		</Box>
		// </Container>
	);
};

export default Dashboard;
