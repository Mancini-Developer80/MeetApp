import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [allLocations, events]);

  const getData = () => {
    const data = allLocations.map((location) => {
      const count = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(/, | - /)[0];
      return { city, count };
    });
    return data;
  };

  return (
    <ResponsiveContainer width="80%" height={380}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 60,
          left: -30,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="city"
          name="City"
          angle={60}
          interval={0}
          tick={{ dx: 20, dy: 40, fontSize: 10, fill: "#ffffff" }}
        />
        <YAxis
          type="number"
          dataKey="count"
          name="Number od events"
          allowDecimals={false}
          tick={{ fontSize: 14, fill: "#ffffff" }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#ffffff" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;
