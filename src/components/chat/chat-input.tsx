// #region version 1
// "use client"

// import { useState, type KeyboardEvent } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Send, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface ChatInputProps {
//   onSendMessage: (message: string) => void
//   disabled?: boolean
//   placeholder?: string
//   className?: string
// }

// export function ChatInput({
//   onSendMessage,
//   disabled = false,
//   placeholder = "Nhập tin nhắn...",
//   className,
// }: ChatInputProps) {
//   const [message, setMessage] = useState("")

//   const handleSend = () => {
//     if (message.trim() && !disabled) {
//       onSendMessage(message.trim())
//       setMessage("")
//     }
//   }

//   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSend()
//     }
//   }

//   return (
//     <div className={cn("flex gap-2 p-4 border-t bg-white", className)}>
//       <Input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={handleKeyPress}
//         placeholder={disabled ? "Đang gửi..." : placeholder}
//         disabled={disabled}
//         className="flex-1 rounded-full border-gray-200 focus:border-blue-500"
//       />

//       <Button
//         onClick={handleSend}
//         disabled={disabled || !message.trim()}
//         size="icon"
//         className="rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"
//       >
//         {disabled ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
//       </Button>
//     </div>
//   )
// }
//#endregion
"use client";

import { useState, useRef, type KeyboardEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Paperclip, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  enableFileUpload?: boolean;
  enableEmoji?: boolean;
  maxLength?: number;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Nhập tin nhắn...",
  className,
  enableFileUpload = false,
  enableEmoji = false,
  maxLength = 1000,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = useCallback(() => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      setIsTyping(false);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [message, disabled, onSendMessage]);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
      setIsTyping(value.length > 0);

      // Auto-resize textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          120
        )}px`;
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file);
      // You can extend this to handle different file types
    }
  };

  const insertEmoji = (emoji: string) => {
    const newMessage = message + emoji;
    if (newMessage.length <= maxLength) {
      setMessage(newMessage);
      textareaRef.current?.focus();
    }
  };

  const commonEmojis = ["😊", "😂", "❤️", "👍", "👎", "🙏", "💊", "🏥"];

  return (
    <div className={cn("bg-white border-t", className)}>
      {/* Emoji panel (if enabled) */}
      {enableEmoji && (
        <div className="px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Biểu cảm:</span>
            <div className="flex gap-1">
              {commonEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => insertEmoji(emoji)}
                  className="h-8 w-8 p-0 hover:bg-blue-50"
                  disabled={disabled}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main input area */}
      <div className="p-4">
        <div className="flex items-end gap-2">
          {/* File upload buttons */}
          {enableFileUpload && (
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                disabled={disabled}
                title="Đính kèm file"
              >
                <Paperclip className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 w-8 text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                disabled={disabled}
                title="Gửi hình ảnh"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Message input */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={disabled ? "Đang gửi..." : placeholder}
              disabled={disabled}
              className={cn(
                "min-h-[44px] max-h-[120px] resize-none rounded-lg border-gray-200 focus:border-blue-500 pr-12",
                "transition-all duration-200",
                isTyping && "border-blue-300"
              )}
              style={{ paddingRight: "48px" }}
            />

            {/* Character counter */}
            {message.length > maxLength * 0.8 && (
              <div
                className={cn(
                  "absolute bottom-2 right-12 text-xs",
                  message.length >= maxLength ? "text-red-500" : "text-gray-400"
                )}
              >
                {message.length}/{maxLength}
              </div>
            )}
          </div>

          {/* Send button */}
          <Button
            onClick={handleSend}
            disabled={disabled || !message.trim() || message.length > maxLength}
            size="icon"
            className={cn(
              "h-11 w-11 rounded-lg transition-all duration-200",
              "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300",
              message.trim() && !disabled && "scale-105 shadow-lg"
            )}
          >
            {disabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>

          {/* Hidden file input */}
          {enableFileUpload && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          )}
        </div>

        {/* Help text */}
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
          <span>
            {disabled
              ? "Đang gửi tin nhắn..."
              : "Nhấn Enter để gửi, Shift + Enter để xuống dòng"}
          </span>

          {isTyping && !disabled && (
            <span className="text-blue-500 animate-pulse">Đang nhập...</span>
          )}
        </div>
      </div>
    </div>
  );
}
