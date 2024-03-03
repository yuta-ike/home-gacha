import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FormSelectItem } from "../components/FormSelectItem";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "../components/ui/button";

export const Route = createLazyFileRoute('/form2')({
  component: Form2,
})

function Form2() {
  const [value, setValue] = useState("")
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  return (
  <div className="flex flex-col gap-y-2 px-2 py-4">
    <ArrowLeft className="size-5 text-gray-700"onClick={() => navigate({
        to: "/form1",
      })} />
    <div className="text-gray-800 text-[18px] font-bold mt-2">相手の興味分野を選んでください</div>
    <div className="text-gray-400 text-xs">ソフトスキルのマッチする相手を探しましょう！</div>
    <div className="w-[85%] mt-6 flex flex-col gap-y-10 items-center justify-center mx-auto">
      <div className="flex flex-col gap-y-2 items-center w-full justify-center">
      <FormSelectItem value="frontend" label="技術のプロフェッショナル" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="backend" label="プロダクトの成長" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="infra" label="マネジメント" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="designer" label="お客様の声を聞く" selectedValue={value} setValue={setValue} />
      </div>
    </div>
    <div className="absolute bottom-8 w-[85%] left-1/2 right-1/2 -translate-x-1/2">
      <Button disabled={loading} className="rounded-full w-full" onClick={() => {
        setLoading(true)
        setTimeout(() => {
          navigate({
            to: "/matching",
          })
        }, 1000)
      }}>
        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}マッチングする</Button>
    </div>
  </div>
  )
}
