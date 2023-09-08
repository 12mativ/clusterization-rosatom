'use client'
import {useGetUsersQuery} from '@/redux/services/UserApi'
import Box from '@/components/Box'
import Button from '@/components/Button'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useRouter} from 'next/navigation'
import {BsFiletypeCsv} from "react-icons/bs";
import Input from "../../../../components/Input";
import {useState} from "react";

export default function Home() {
    const {isLoading, isFetching, data: user, error} = useGetUsersQuery(null)
    const router = useRouter()

    const [answers, setAnswers] = useState<string[]>([])
    const [currentAnswer, setCurrentAnswer] = useState('')

    const handleAddAnswer = (answer: string) => {
        if (answer.length === 0) {
            return
        }
        setAnswers(prevState => [...prevState, currentAnswer])
    }

    return isLoading ? (
        <div className='h-full w-full flex items-center justify-center'>
            <p className='text-3xl'>Loading...</p>
        </div>
    ) : (
        <div className='w-full flex items-center justify-center p-2'>
            <div className='flex flex-col gap-y-6 w-[90%] md:w-[75%]'>
                <Button
                    onClick={() => router.back()}
                    className='self-start w-[150px] flex gap-x-2 items-center justify-center'
                >
                    <AiOutlineArrowLeft size={22}/>
                    <p className='text-lg'>Назад</p>
                </Button>
                <Box className='pb-4'>
                    <BsFiletypeCsv size={70}/>
                    <label
                        className='flex items-center justify-center gap-x-2 bg-emerald-500 p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'
                        htmlFor='single'
                    >
                        <p>Загрузите ваш .csv файл</p>
                    </label>

                    <input className='hidden' type='file' id='single' accept='.csv'/>

                    <p className='py-4 text-xl'>Или...</p>

                    <label className='self-start text-sm' htmlFor='name'>Введите ваш ответ</label>
                    <Input id='name'
                           placeholder='Ваш ответ'
                           value={currentAnswer}
                           onChange={(e) => setCurrentAnswer(e.currentTarget.value)}
                    />
                    <Button
                        onClick={(e) => handleAddAnswer(e.currentTarget.value)}
                        className='self-end h-12 md:h-12 w-[150px] mb-2'
                    >
                        Добавить ответ
                    </Button>

                    <div className='flex flex-col gap-y-4 self-start overflow-hidden w-full'>
                        {answers.map(answer => {
                            return (
                                <div className='bg-neutral-100 bg-opacity-30 rounded-xl p-4'>
                                    {answer}
                                </div>
                            )
                        })}
                    </div>
                </Box>
            </div>
        </div>
    )
}
