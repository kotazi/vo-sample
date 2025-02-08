"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const generateRandomData = () => {
  return ["1月", "2月", "3月", "4月", "5月", "6月"].map(() => Math.floor(Math.random() * 1000) + 500)
}

export default function Dashboard() {
  const [data, setData] = useState(generateRandomData())
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setData(generateRandomData())
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const chartData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "売上 (万円)",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">月次売上推移</h2>
        <div className="flex items-center space-x-2">
          <Switch id="live-mode" checked={isLive} onCheckedChange={setIsLive} />
          <Label htmlFor="live-mode">ライブモード</Label>
        </div>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Bar data={chartData} />
      </motion.div>
      <p className="mt-4 text-sm text-gray-600">※ このデータはデモ用にランダムに生成されています。</p>
    </div>
  )
}

