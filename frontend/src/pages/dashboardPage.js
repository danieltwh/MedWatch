import '../App.css';
import { useState, useEffect } from "react";
import Chart from "chart.js/auto"

import { 
  heartrate as heartrateAPI
} from '../api/api';

import LineChart from '../components/LineChart';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';



function DashboardPage() {
  const [heartRateData, setHeartRateData] = useState([]);


  const fetchData = async () => {
    let userHeartRate = await heartrateAPI().catch(error => {
      console.log('There was an error', error);
    });
    setHeartRateData(userHeartRate);
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    <div className="App">
      {/* <ResponsiveAppBar /> */}
      <div>
        <Line data ={{
          labels: heartRateData.map(data => {
            let luxonDate = DateTime.fromJSDate(data.time);
            return luxonDate.toFormat("hh:mm:ss")
          }),
          datasets: [
            {
              label: "Heart Rate",
              data: heartRateData.map(data => data.value)
            }
          ],
          borderColor: "black",
          borderWidth: 2
        }} options={lineChartOptions} />
      </div>
      <div>
      {/* {JSON.stringify(heartRateData)} */}
      </div>

      {/* <LineChart chartData={heartRateData} /> */}

     
      
    </div>
  );
}

export default DashboardPage;
