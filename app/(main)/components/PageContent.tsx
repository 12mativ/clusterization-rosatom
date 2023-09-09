'use client'

import {useClusterTextMutation} from '@/redux/services/ClusterApi'
import Box from '@/components/Box'
import Button from '@/components/Button'
import {
  AiFillDelete,
  AiOutlineArrowLeft,
  AiOutlinePlusCircle,
} from 'react-icons/ai'
import {useRouter} from 'next/navigation'
import {BsArrowUpRight, BsFiletypeCsv} from 'react-icons/bs'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import toast from 'react-hot-toast'
import ScatterVisualization from '@/components/ScatterVisualization'
import BubbleVisualization from '@/components/BubbleVisualization'
import HistogramVisualization from '@/components/HistogramVisualization'
import Input from "@/components/Input";

interface Answer {
  id: string
  text: string
}

const scatterData = [
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
]

const bubbleData = [
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
]

const histogramData = {
  Cluster1: 10,
  Cluster2: 15,
  Cluster3: 22,
  Cluster4: 30,
  Cluster5: 18,
  Cluster6: 25,
  Cluster8: 28,
  Cluster9: 28,
  Cluster10: 28,
  Cluster11: 28,
  Cluster12: 28,
  Cluster13: 28,
  Cluster14: 28,
  Cluster15: 28,
  Cluster16: 28,
  Cluster17: 28,
  Cluster18: 28,
  Cluster19: 28,
  Cluster20: 28,
  Cluster21: 28,
  Cluster22: 28,
  Cluster23: 28,
  Cluster24: 28,
  Cluster25: 28,
  Cluster26: 28,
  Cluster27: 28,
  Cluster28: 28,
}

const PageContent = () => {
  const router = useRouter()
  const [clusterText, {data, error, isLoading}] = useClusterTextMutation()

  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleAddAnswer = () => {
    if (currentAnswer.length === 0) {
      return
    }
    setAnswers((prevState) => [
      ...prevState,
      {id: uuidv4(), text: currentAnswer},
    ])
    setCurrentAnswer('')
  }

  const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        toast.error('Вы должны прикрепить файл')
      }

      setTimeout(() => {
        const file = event.target?.files[0]
        console.log(file)
      }, 3000)
    } catch (error) {
      toast.error('Ошибка при загрузке файла')
    } finally {
      setSubmitted(true)
      setUploading(false)
    }
  }

  const sendAnswers = async () => {
    if (answers.length !== 0) {
      const data = await clusterText(answers)
      console.log(data)
      return setSubmitted(true)
    } else {
      return toast.error('Вы должны добавить хотя бы один ответ')
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
          <label
            htmlFor='single'
            className='flex flex-col items-center justify-center gap-y-2'
          >
            <BsFiletypeCsv size={70} />
            <div className='flex items-center justify-center gap-x-2 bg-emerald-500 p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'>
              <p>Загрузите ваш .csv файл</p>
            </div>
          </label>

          <input
            onChange={uploadFile}
            className='hidden'
            type='file'
            id='single'
            accept='.csv'
            disabled={uploading}
          />

          <p className='py-4 text-xl'>Или...</p>

          <label className='self-start text-md' htmlFor='name'>
            Введите ваш ответ:
          </label>
          <Input
            id='name'
            placeholder='Ваш ответ'
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.currentTarget.value)}
          />
          <div className='self-end flex flex-col gap-y-3 md:flex-row md:gap-x-3'>
            <Button
              onClick={handleAddAnswer}
              className='self-end flex items-center justify-center gap-x-2 h-12 md:h-12 w-[170px] mb-2'
            >
              <p className='font-semibold'>Добавить ответ</p>
              <AiOutlinePlusCircle size={24} />
            </Button>
            <Button
              onClick={sendAnswers}
              className='self-end flex items-center justify-center gap-x-2 bg-emerald-500 border-emerald-500 [box-shadow:0_10px_0_0_#128a62,0_10px_0_0_#128a62] h-12 w-[190px] md:h-12 mb-2'
            >
              <p className='font-semibold'>Отправить ответы</p>
              <BsArrowUpRight size={22} />
            </Button>
          </div>

          <div className='flex flex-col gap-y-4 self-start w-full'>
            {answers.map((answer) => {
              return (
                <div
                  key={answer.id}
                  className='flex flex-col justify-between bg-neutral-100 bg-opacity-30 rounded-xl p-4'
                >
                  <p>{answer.text}</p>
                  <button
                    className='
                      self-end
                      flex
                      items-center
                      justify-center
                      gap-x-2
                      bg-emerald-500
                      p-3 text-black
                      font-bold
                      rounded-full
                      mt-2
                      hover:cursor-pointer
                      hover:opacity-75
                      transition
                    '
                    onClick={() => {
                      const newAnswers = answers.filter(
                        (a) => a.id !== answer.id
                      )
                      setAnswers(newAnswers)
                    }}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              )
            })}
          </div>
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
        <div className='w-full'>
          <ScatterVisualization chartData={scatterData} />
        </div>

        <div className='w-full'>
          <BubbleVisualization chartData={bubbleData} />
        </div>

        <div className='w-full'>
          <HistogramVisualization chartData={histogramData} />
        </div>
      </div>
    </div>
  )
}

export default PageContent
