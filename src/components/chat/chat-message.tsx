import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import type { IMessage } from "@/interface/auth/chat.interface"

interface ChatMessageProps {
  message: IMessage
  isCurrentUser?: boolean
}

export function ChatMessage({ message, isCurrentUser = false }: ChatMessageProps) {
  const isUser = message.senderType === "user"
  const isOwn = isCurrentUser && isUser

  return (
    <div className={cn("flex gap-2 mb-4", isOwn ? "justify-end" : "justify-start")}>
      {!isOwn && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">{isUser ? "U" : "S"}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[70%]", isOwn && "items-end")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2 break-words",
            isOwn ? "bg-blue-500 text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md",
          )}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        <div className={cn("flex items-center gap-2 mt-1", isOwn ? "flex-row-reverse" : "flex-row")}>
          <span className="text-xs text-gray-500">{format(new Date(message.createdAt), "HH:mm", { locale: vi })}</span>

          {!isUser && (
            <Badge variant="secondary" className="text-xs">
              Hỗ trợ
            </Badge>
          )}
        </div>
      </div>

      {isOwn && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className="bg-blue-500 text-white text-xs">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
