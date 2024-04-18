import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function PaidChart({fees}) {
const chartdata = fees.map(fee => ({
    studentName : fee.sno.sname,
    amountPaid : fee.submitfee
}));

  return (
    <BarChart
      xAxis={[
        {
            id: 'studentName',
            data: chartdata.map(data => data.studentName),
            scaleType: 'band',
        },
      ]}
      series={[
        {
          
          data: chartdata.map(data => data.amountPaid)
        },
      ]}
      width={500}
      height={300}
    />
  );
}