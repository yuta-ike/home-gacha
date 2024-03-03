import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { FormSelectItem } from "../components/FormSelectItem";
import { ArrowLeft } from "lucide-react";
import { Progress } from "../components/ui/progress"

export const Route = createLazyFileRoute('/form2')({
  component: Form2,
})

function Form2() {
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  return (
  <div className="flex flex-col gap-y-2 px-2 py-4">
    <ArrowLeft className="size-5 text-gray-700"onClick={() => navigate({
        to: "/form1",
      })} />
    <div className="text-gray-800 text-xl font-bold mt-2">興味分野を選んでください</div>
    <div className="text-gray-400 text-xs">ソフトスキルのマッチする相手を探しましょう！</div>
    <div className="w-[85%] mt-6 flex flex-col gap-y-10 items-center justify-center mx-auto">
      <div className="flex flex-col gap-y-2 items-center w-full justify-center">
        <FormSelectItem value="frontend" label="技術のプロフェッショナル" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="backend" label="プロダクトの成長" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="infra" label="マネジメント" selectedValue={value} setValue={setValue} />
        <FormSelectItem value="designer" label="お客様の声を聞く" selectedValue={value} setValue={setValue} />
      </div>
      <Button className="rounded-full w-full" onClick={() => navigate({
        to: "/matching",
      })}>次へ</Button>
    </div>
  </div>
  )
}
