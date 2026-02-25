// ChartToggle.jsx
import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { name: "00:00", value: 120 },
  { name: "01:00", value: 200 },
  { name: "02:00", value: 150 },
  { name: "03:00", value: 300 },
  { name: "04:00", value: 180 },
  { name: "05:00", value: 150 },
  { name: "06:00", value: 110 },
  { name: "07:00", value: 60 },
  { name: "08:00", value: 280 },
];

export default function ChartToggle() {
  const [type, setType] = useState("line"); // "line" | "bar" | "area"

  const common = (
    <>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />
    </>
  );

  return (
    <div style={{ width: "100%", height: 320 }}>
      <div style={{ marginBottom: 8 }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="area">Area</option>
        </select>
      </div>

      <ResponsiveContainer>
        {type === "line" && (
          <LineChart data={sampleData}>
            {common}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              dot
            />
          </LineChart>
        )}

        {type === "bar" && (
          <BarChart data={sampleData}>
            {common}
            <Bar dataKey="value" barSize={20} />
          </BarChart>
        )}

        {type === "area" && (
          <AreaChart data={sampleData}>
            {common}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              fillOpacity={0.3}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
