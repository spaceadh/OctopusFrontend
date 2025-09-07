import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { data } from './data'

export function Overview() {
  return (
    <div className="bg-base-200 rounded-xl p-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="hsl(var(--base-content) / 0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--base-content) / 0.5)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
            className="fill-[rgb(212,175,55)]"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}