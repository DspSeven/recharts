// Write your code here
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {days} = props
  console.log(days)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={days}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="dose1" name="dose1" fill="#1f77b4" barSize="20%" />
          <Bar dataKey="dose2" name="dose2" fill="#1f77b4" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationCoverage
