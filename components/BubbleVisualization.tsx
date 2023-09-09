'use client'

import React, {useEffect, useRef} from 'react'
import dynamic from 'next/dynamic'
import Box from "@/components/Box";
import Button from "@/components/Button";
import {saveImage} from "@/utils/saveVisualizationFile";

const Plot = dynamic(() => import('react-plotly.js'), {ssr: false})

function BubbleVisualization({chartData}) {
  const data = chartData.map((bubble) => ({
    x: bubble.xValues,
    y: bubble.yValues,
    mode: 'markers',
    marker: {
      size: bubble.markerSizes, // Размеры маркеров (зависят от данных)
      color: bubble.markerColors, // Цвета маркеров (зависят от данных)
      opacity: 0.6, // Прозрачность маркеров
    },
    text: bubble.textLabels, // Текстовые метки для маркеров (зависят от данных)
    type: 'scatter',
    name: bubble.chartName,
  }))

  const plotConfig = {
    displayModeBar: false,
    displaylogo: false,
    responsive: true,
  }

  const chartRef = useRef(null)

  /*const saveImage = () => {
    const plotlyGraph = document.querySelector('.js-plotly-plot') as HTMLElement;
    const svgData = plotlyGraph.querySelector('svg')?.outerHTML;

    if (svgData) {
      const blob = new Blob([svgData], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cluster-visualization.svg';
      a.click();
      URL.revokeObjectURL(url);
    }
  }*/

  return (
    <div className='flex w-full h-full items-center justify-center'>
      <Box id='bubble-chart-div' className='w-full md:w-[75%]'>
        <Plot
          className='w-[98%]'
          data={data}
          layout={{
            title: 'Бабл визуализация',
            xaxis: {title: 'X-ось'},
            yaxis: {title: 'Y-ось'},
          }}
          config={plotConfig}
          divId='bubble-chart-div'
        />

        <Button onClick={() => saveImage('bubble-chart-div', 'bubble-chart.svg')} className='w-[170px] mb-2'>Сохранить как .svg</Button>
      </Box>
    </div>
  )
}

export default BubbleVisualization;