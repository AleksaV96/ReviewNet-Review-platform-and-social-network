import React from 'react'
import { Bar } from 'react-chartjs-2';


function BarChart(props) {

  return (
    <div>
      <Bar
        data={props.data}
      />
    </div>
  )
}

export default BarChart;