// Write your code here
// Write your code here
import {ResponsiveContainer, Pie, PieChart, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {age} = props
  console.log(age)
  return (
    <div>
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="55%"
            cy="40%"
            data={age}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#f54394" />
            <Cell name="45-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByAge
