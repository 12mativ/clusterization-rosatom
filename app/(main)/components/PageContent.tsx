'use client'

import Box from '@/components/Box'
import Button from '@/components/Button'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useRouter} from 'next/navigation'
import {BsFiletypeJson} from 'react-icons/bs'
import {useState} from 'react'
import toast from 'react-hot-toast'
import ScatterVisualization from '@/components/ScatterVisualization'
import BubbleVisualization from '@/components/BubbleVisualization'
import HistogramVisualization from '@/components/HistogramVisualization'
import AnswerForm from '@/components/AnswerForm'
import {useClusterFileMutation, useClusterTextHistMutation} from "@/redux/services/ClusterApi";

/*const scatterData = [
  {
    clusterId: 1,
    clusterName: 'Кластер 1',
    dataPoints: [
      {x: 2, y: 20},
      {x: 4, y: 20},
      {x: 6, y: 20},
      {x: 6, y: 20.1},
      {x: 6, y: 20.05},
      {x: 6, y: 20.3},
      {x: 6.2, y: 24},
      {x: 6.1, y: 24.21},
      {x: 6, y: 26.12321},
      {x: 6.23, y: 20.3412},
      {x: 6.445, y: 20},
      {x: 6.1223, y: 20.4545},
    ],
  },
  {
    clusterId: 2,
    clusterName: 'Кластер 2',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 3,
    clusterName: 'Кластер 3',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 4,
    clusterName: 'Кластер 4',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 5,
    clusterName: 'Кластер 5',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 6,
    clusterName: 'Кластер 6',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 7,
    clusterName: 'Кластер 7',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 7,
    clusterName: 'Кластер 7',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
  {
    clusterId: 8,
    clusterName: 'Кластер 8',
    dataPoints: [
      {x: 1, y: 2},
      {x: 3, y: 4.1},
      {x: 3, y: 4.2},
      {x: 3.1, y: 4},
      {x: 3.2, y: 4},
    ],
  },
]*/

/*const bubbleData = [
  {
    chartName: 'Кластер 1',
    xValues: [1],
    yValues: [10],
    markerSizes: [20],
    markerColors: ['blue'],
    textLabels: ['Кластер 1'],
  },
  {
    chartName: 'Кластер 2',
    xValues: [54],
    yValues: [50],
    markerSizes: [100],
    markerColors: ['red'],
    textLabels: ['Кластер 2'],
  },
  {
    chartName: 'Кластер 3',
    xValues: [43],
    yValues: [200],
    markerSizes: [60],
    markerColors: ['green'],
    textLabels: ['Кластер 3'],
  },
  {
    chartName: 'Кластер 4',
    xValues: [43],
    yValues: [345],
    markerSizes: [23],
    markerColors: ['purple'],
    textLabels: ['Кластер 4'],
  },
]*/

export const revalidate = 0

const PageContent = () => {
  const router = useRouter()

  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [histData, setHistData] = useState()
  const [scatterData, setScatterData] = useState()
  const [bubbleData, setBubbleData] = useState()
  const [fileData, setFileData] = useState()
  const [clusterFile, {data, error: histError, isLoading: histIsLoading}] = useClusterFileMutation()

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        toast.error('Вы должны прикрепить файл')
      }

      const file = event.target?.files[0]
      const formData = new FormData();
      formData.append('fileInput', file);
      console.log(formData)
      const fileObj = await clusterFile(formData)
      setFileData(fileObj)

    } catch (error) {
      toast.error('Ошибка при загрузке файла')
    } finally {
      setSubmitted(true)
      setUploading(false)
    }
  }

  return !submitted ? (
    <div className='w-full flex items-center justify-center p-2'>
      <div className='flex flex-col gap-y-6 w-full md:w-[75%]'>
        <Button
          onClick={() => router.back()}
          className='self-start w-[150px] flex gap-x-2 items-center justify-center'
        >
          <AiOutlineArrowLeft size={22} />
          <p className='text-lg'>Назад</p>
        </Button>
        <Box className='pb-4'>
          <form method="post" encType="multipart/form-data">
            <label
              htmlFor='single'
              className='flex flex-col items-center justify-center gap-y-2'
            >
              <BsFiletypeJson size={70} />
              <div className='flex items-center justify-center gap-x-2 bg-emerald-500 p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'>
                <p>Загрузите ваш .json файл</p>
              </div>
            </label>

            <input
              onChange={uploadFile}
              className='hidden'
              type='file'
              id='single'
              accept='.json'
              disabled={uploading}
            />
          </form>


          <p className='py-4 text-xl'>Или...</p>

          <AnswerForm
            setHistData={setHistData}
            setSubmitted={setSubmitted}
            setScatterData={setScatterData}
            setBubbleData={setBubbleData}
          />
        </Box>
      </div>
    </div>
  ) : (
    <div className='flex w-full justify-center p-2'>
      <div className='flex flex-col gap-y-4 w-full md:w-[75%]'>
        <Button
          onClick={() => setSubmitted(false)}
          className='self-start w-[150px] flex gap-x-2 mb-2 items-center justify-center'
        >
          <AiOutlineArrowLeft size={22} />
          <p className='text-lg'>Назад</p>
        </Button>
        {
          fileData ? (
            <>
              <div className='w-full'>
                <ScatterVisualization chartData={fileData.data['points']} />
              </div>

              <div className='w-full'>
                <BubbleVisualization chartData={fileData.data['bubbles']} />
              </div>

              <div className='w-full'>
                <HistogramVisualization chartData={fileData.data['hist']} />
              </div>
            </>
          ) : (
            <>
              <div className='w-full'>
                <ScatterVisualization chartData={scatterData.data} />
              </div>

              <div className='w-full'>
                <BubbleVisualization chartData={bubbleData.data} />
              </div>

              <div className='w-full'>
                <HistogramVisualization chartData={histData.data} />
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default PageContent
