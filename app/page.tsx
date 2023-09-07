import Button from '@/components/Button'
import Link from 'next/link'
import Box from '@/components/Box'
import {MdOutlineStart} from 'react-icons/md'

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Box className='w-[90%] md:w-[75%]'>
        <p className='w-[90%] md:w-[75%] text-center text-xl'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
          dolore fugiat iste magni modi neque officiis quae, quaerat soluta
          voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Amet excepturi facilis harum ipsum possimus quos, voluptate! Alias
          eius neque rem.
        </p>

        <Link href='/main' className='mb-2'>
          <Button className='w-[170px] flex items-center justify-center gap-x-3'>
            <p className='text-xl'>Старт</p>
            <MdOutlineStart size={25} />
          </Button>
        </Link>
      </Box>
    </div>
  )
}
