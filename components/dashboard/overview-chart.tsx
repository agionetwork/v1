import { ResponsiveLine } from "@nivo/line"
import { Card } from "@/components/ui/card"

interface OverviewChartProps {
  data: {
    id: string
    data: Array<{
      x: string | number
      y: number
    }>
  }[]
}

export function OverviewChart({ data }: OverviewChartProps) {
  return (
    <Card className="col-span-4">
      <div className="h-[400px] w-full p-6">
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "rgb(0, 0, 0)",
                  strokeWidth: 1,
                },
              },
              ticks: {
                line: {
                  stroke: "rgb(0, 0, 0)",
                  strokeWidth: 1,
                },
                text: {
                  fill: "rgb(0, 0, 0)",
                },
              },
              legend: {
                text: {
                  fill: "rgb(0, 0, 0)",
                },
              },
            },
            grid: {
              line: {
                stroke: "rgb(0, 0, 0)",
                strokeWidth: 0.5,
                strokeOpacity: 0.1,
              },
            },
            legends: {
              text: {
                fill: "rgb(0, 0, 0)",
              },
            },
          }}
          yFormat=" >-.2f"
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Value",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={["rgb(37, 99, 235)"]}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </Card>
  )
} 