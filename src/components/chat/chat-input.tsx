"use client"

import { useState, type KeyboardEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Nhập tin nhắn...",
  className,
}: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={cn("flex gap-2 p-4 border-t bg-white", className)}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={disabled ? "Đang gửi..." : placeholder}
        disabled={disabled}
        className="flex-1 rounded-full border-gray-200 focus:border-blue-500"
      />

      <Button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        size="icon"
        className="rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
      >
        {disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      </Button>
    </div>
  )
}
