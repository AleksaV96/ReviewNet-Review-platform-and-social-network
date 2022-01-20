import React from 'react'
import { Pie } from 'react-chartjs-2';


function PieChart(props) {

  return (
    <div style={{marginTop:"1cm"}}>
      <Pie data={props.data}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  )
}

export default PieChart;