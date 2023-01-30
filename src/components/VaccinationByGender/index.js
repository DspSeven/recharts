// Write your code here
// Write your code here
import {ResponsiveContainer, Pie, PieChart, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {gender} = props
  console.log(gender)
  return (
    <div>
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            cx="55%"
            cy="40%"
            data={gender}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Others" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
