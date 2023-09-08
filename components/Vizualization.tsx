import React from 'react';
import Plot from 'react-plotly.js';
import Box from "@/components/Box";
import Button from "@/components/Button";

interface DataPoint {
    x: number;
    y: number;
}

interface Cluster {
    clusterId: number;
    clusterName: string;
    dataPoints: DataPoint[];
}

interface ClusterVisualizationProps {
    chartData: Cluster[];
}

const saveImage = () => {
    const plotlyGraph = document.querySelector('.js-plotly-plot') as HTMLElement;
    const svgData = plotlyGraph.querySelector('svg')?.outerHTML;

    if (svgData) {
        const blob = new Blob([svgData], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cluster-visualization.svg'; // Установите желаемое имя файла
        a.click();
        URL.revokeObjectURL(url);
    }

}

function ClusterVisualization({chartData}: ClusterVisualizationProps) {
    const data = chartData.map((cluster) => ({
        x: cluster.dataPoints.map((point) => point.x),
        y: cluster.dataPoints.map((point) => point.y),
        mode: 'markers',
        type: 'scatter',
        name: cluster.clusterName,
    }));

    const plotConfig = {
        displayModeBar: false, // Отображение панели инструментов
        displaylogo: false, // Скрытие логотипа Plotly
    };

    return (
        <div className='flex w-full h-full items-center justify-center'>
            <Box className='w-[90%] md:w-[75%]'>
                <Plot
                    className='w-full'
                    data={data}
                    layout={{
                        title: 'Визуализация кластеров',
                        xaxis: {title: 'X-ось'},
                        yaxis: {title: 'Y-ось'},
                    }}
                    config={plotConfig}
                />

                <Button onClick={saveImage} className='w-[170px] mb-2'>Сохранить как .svg</Button>
            </Box>
        </div>
    );
}

export default ClusterVisualization;
