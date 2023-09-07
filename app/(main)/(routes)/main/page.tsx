'use client'
import {useGetUsersQuery} from '@/redux/services/UserApi'
import Box from '@/components/Box'
import Button from '@/components/Button'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import {useRouter} from 'next/navigation'
import {BsFiletypeCsv} from "react-icons/bs";

export default function Home() {
  const {isLoading, isFetching, data: user, error} = useGetUsersQuery(null)
  const router = useRouter()
  return isLoading ? (
    <div className='h-full w-full flex items-center justify-center'>
      <p className='text-3xl'>Loading...</p>
    </div>
  ) : (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='flex flex-col gap-y-6 w-[90%] md:w-[75%]'>
        <Button
          onClick={() => router.back()}
          className='self-start w-[150px] flex gap-x-2 items-center justify-center'
        >
          <AiOutlineArrowLeft size={22} />
          <p className='text-lg'>Назад</p>
        </Button>
        <Box>
          <BsFiletypeCsv size={70}/>
          <label
            className='flex items-center justify-center gap-x-2 bg-emerald-500 p-3 text-black font-bold rounded-full mt-2 hover:cursor-pointer hover:opacity-75 transition'
            htmlFor='single'
          >
            <p>Загрузите ваш .csv файл</p>
          </label>

          <input className='hidden' type='file' id='single' accept='.csv' />
          {/*TODO remove comment*/}
          {/*{user.map((user) => {
            return <p key={user.id}>{user.name}</p>
          })}*/}
        </Box>
      </div>
    </div>
  )
}
