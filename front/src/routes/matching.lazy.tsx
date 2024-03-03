import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { GachaCard } from '../components/GachaGard';
import { mockUsers } from '../mock/users';
import { Button } from '../components/ui/button';

export const Route = createLazyFileRoute('/matching')({
  component: Matching,
})


function Matching() {
  const navigate = useNavigate()

  return <div className="flex flex-col gap-y-2 px-4 py-4">
    <div className='flex items-end'>
      <img src="/GACHATTE.png" alt="GACHATTE" className="w-[75%] block"/>
      <span className='text-xl font-bold text-right text-gray-700 mb-1'>しました</span>
    </div>
    <img src="/gacha.png" alt="ガチャ" className="block w-[80%] mx-auto"/>
    <div className='flex flex-col gap-y-2'>
      <div className='flex items-end'>
        <img src="/GACHATTE.png" alt="GACHATTE" className="w-[35%] block -mr-1"/>
        <span className='text-md font-bold text-right text-gray-700'>した相手</span>
      </div>
      <GachaCard user={mockUsers[0]} />
    </div>
    <div className='mt-4'><Button size="lg" className='rounded-full w-full' onClick={() => navigate({
      to: "/",
    })}>次へ</Button></div>
  </div>
}
