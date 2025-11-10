"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Jul", prestamos: 98, devoluciones: 95 },
  { month: "Ago", prestamos: 112, devoluciones: 108 },
  { month: "Sep", prestamos: 125, devoluciones: 120 },
  { month: "Oct", prestamos: 138, devoluciones: 135 },
  { month: "Nov", prestamos: 145, devoluciones: 140 },
  { month: "Dic", prestamos: 142, devoluciones: 138 },
];

const categoryData = [
  { category: "Literatura", count: 45 },
  { category: "Ciencias", count: 32 },
  { category: "Historia", count: 28 },
  { category: "Matemáticas", count: 24 },
  { category: "Arte", count: 13 },
];

export function ReportCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Préstamos Mensuales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="prestamos"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="Préstamos"
              />
              <Line
                type="monotone"
                dataKey="devoluciones"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                name="Devoluciones"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Préstamos por Categoría</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
                name="Préstamos"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
