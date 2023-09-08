'use client'

import Vizualization from "@/components/Vizualization";

const obj =
    [
        {
            "clusterId": 1,
            "clusterName": "Кластер 1",
            "dataPoints": [
                {"x": 2, "y": 3},
                {"x": 4, "y": 5},
                {"x": 6, "y": 7}
            ]
        },
        {
            "clusterId": 2,
            "clusterName": "Кластер 2",
            "dataPoints": [
                {"x": 1, "y": 2},
                {"x": 3, "y": 4.1},
                {"x": 3, "y": 4.2},
                {"x": 3.1, "y": 4},
                {"x": 3.2, "y": 4},
            ]
        }
    ]


const VizualizationPage = () => {
    return (
        <Vizualization chartData={obj}/>
    )
}

export default VizualizationPage