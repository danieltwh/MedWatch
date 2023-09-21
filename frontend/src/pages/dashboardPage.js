import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto"

import { 
  heartrate as heartrateAPI
} from '../api/api';

import LineChart from '../components/LineChart';
import { Line } from 'react-chartjs-2';
import { DateTime } from 'luxon';



function DashboardPage() {
  const [heartRateData, setHeartRateData] = useState([]);

  const nav = useNavigate();

  const fetchData = async () => {
    let userHeartRate = await heartrateAPI().catch(error => {
      console.log('There was an error', error);
    });
    if (userHeartRate.status == 200) {
      setHeartRateData(userHeartRate.body);
    } else if (userHeartRate.status == 401) {
      // Logout
      localStorage.removeItem("authenticated");
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");
      nav("/", {replace: true})
    }
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
