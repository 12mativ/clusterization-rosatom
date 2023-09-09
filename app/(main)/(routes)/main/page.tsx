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
import Input from '../../../../components/Input'
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import toast from 'react-hot-toast'
import ScatterVisualization from "@/components/ScatterVisualization";
import BubbleVisualization from "@/components/BubbleVisualization";
import HistogramVisualization from "@/components/HistogramVisualization";
import PageContent from "@/app/(main)/components/PageContent";

export default function Home() {
  return <PageContent />
}


/*
return isLoading ? (
  <div className='h-full w-full flex items-center justify-center'>
    <p className='text-3xl'>Loading...</p>
  </div>
) : (
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
        <BsFiletypeCsv size={70} />
        <label
          className='flex items-center justify-center gap-x-2 bg-emerald-500 p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'
          htmlFor='single'
        >
          <p>Загрузите ваш .csv файл</p>
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
          Введите ваш ответ
        </label>
        <Input
          id='name'
          placeholder='Ваш ответ'
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.currentTarget.value)}
        />
        <Button
          onClick={() => handleAddAnswer(currentAnswer)}
          className='self-end flex items-center justify-center gap-x-2 h-12 md:h-12 w-[170px] mb-2'
        >
          <p>Добавить ответ</p>
          <AiOutlinePlusCircle size={22} />
        </Button>

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
                    const newAnswers = answers.filter(a => a.id !== answer.id)
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
)*/
