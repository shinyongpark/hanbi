import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HanbiPlanner() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult("")
    setError(null)

    try {
      const res = await fetch("http://localhost:8000/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setResult(data.response)
    } catch (err) {
      setError("서버 요청에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="예: 2박 3일 전주, 자연 중심, 혼자"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "생성 중..." : "일정 생성"}
        </Button>
      </form>

      {result && (
        <Card className="mt-6">
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </CardContent>
        </Card>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  )
}
