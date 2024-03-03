import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useGachaStatus } from '../hooks/useGachaStatus';
import { useGachaStart } from '../hooks/useGachaStart';
import { Button } from '../components/ui/button';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
 const { fetchStatus} = useGachaStatus();
	const { startGacha } = useGachaStart(fetchStatus);
  const navigate = useNavigate()


  return (
    <div className="p-2 flex flex-col items-center h-[100dvh] justify-center gap-[100px]">
      <img src="GACHATTE.png" alt="gachatte" className="w-[200px]"/>
      <img src="capsules.png" alt="gachatte" className="max-w-[min(90%,300px)]"/>
      <div className="w-full flex flex-col gap-6">
        <Button className="rounded-full w-full py-6" size="lg" onClick={() => navigate({
          to: "/form2",
        })}>登録する</Button>
        <Button className="rounded-full w-full py-6" size="lg" onClick={() => startGacha()}>ガチャを回す</Button>
      </div>
      {/* {status.isLoading ? <p>Loading...</p> : status.error ? <p>Error: {status.error}</p> : status.data ? <p>ガチャのステータス: {status.data.status}</p> : null} */}
    </div>
  )
}
