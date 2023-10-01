import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'shared/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';


import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto"

import {
  heartrate as heartrateAPI
} from 'features/api';

import { heartrateActions, selectHeartrate } from 'features/heartrateSlice';

import LineChart from 'components/LineChart';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';


const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

let isInitial = true;

const HeartRateLineChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
  const theme = useTheme();
  const customization = ['24h', '6h', '1h', '30min']

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);



  // MedWatch Code
  const nav = useNavigate();
  const dispatch = useDispatch();

  const heartrate = useSelector(selectHeartrate);

  const fetchHeartrateData = async () => {
    let userHeartRate = await heartrateAPI().catch(error => {
      console.log('There was an error', error);
    });
    if (userHeartRate.status == 200) {
      // setHeartRateData(userHeartRate.body);
      dispatch(heartrateActions.set(userHeartRate.body));
    } else if (userHeartRate.status == 401) {
      // Logout
      localStorage.removeItem("authenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");
      nav("/", { replace: true })
    }
  }

  useEffect(() => {
    if (isInitial) {
      // console.log(heartrate.status);
      isInitial = false;
      fetchHeartrateData();
    }
  }, [dispatch])

  var lineChartOptions = {
    scales: {
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 90
        }
      }
    }
  }


  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Heart Rate</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">90 BPM</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {/* <Chart {...chartData} /> */}
              <Line data={{
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
              }} options={lineChartOptions} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

HeartRateLineChart.propTypes = {
  isLoading: PropTypes.bool
};

export default HeartRateLineChart;
