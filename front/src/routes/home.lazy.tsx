import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { PlusIcon, SearchIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { mockUsers } from '../mock/users';
import { GachaCardWithTag } from '../components/GachaCardTag';
import { Button } from '../components/ui/button';

export const Route = createLazyFileRoute('/home')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()

  return (
    <div className="p-4 h-full bg-[#eeeeee] flex flex-col gap-y-8">
      <div className='flex gap-x-2 items-center justify-between mb-8'>
        <div className='text-xl font-bold'>ホーム</div>
        <div className='flex gap-x-2'>
          <UsersIcon className='size-5' />
          <SearchIcon className='size-5' />
          <SettingsIcon className='size-5' />
        </div>
      </div>
      <div className="flex flex-col gap-y-4 grow bg-[#efefef] -px-2">
        <GachaCardWithTag user={mockUsers[0]} />
        <GachaCardWithTag user={mockUsers[1]} />
      </div>
      <div className="absolute bottom-8 w-[85%] left-1/2 right-1/2 -translate-x-1/2">
      <Button className="rounded-full w-full flex gap-x-4" onClick={() => navigate({
          to: "/form1",
        })}>
          <PlusIcon className='size-4' />
          新しい予定を追加</Button>
    </div>
    </div>
  )
}
