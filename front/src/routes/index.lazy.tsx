import { createLazyFileRoute } from '@tanstack/react-router';
import { useGachaStatus } from '../hooks/useGachaStatus';
import { useGachaStart } from '../hooks/useGachaStart';
import { Background } from '../lib/Background';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
 const { status, fetchStatus} = useGachaStatus();
  const { startGacha } = useGachaStart(fetchStatus);
  

  return (
    <div className="p-2">
      <div className="-z-10">
        <Background />
      </div>
      <div className="z-10 relative">
        <h3>Welcome Home!</h3>
        <button onClick={startGacha}>ガチャを開始する</button>
        {status.isLoading ? <p>Loading...</p> : status.error ? <p>Error: {status.error}</p> : status.data ? <p>ガチャのステータス: {status.data.status}</p> : null}
      </div>
    </div>
  )
}

