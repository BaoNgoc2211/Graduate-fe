"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatSocket } from "@/hooks/chat.hooks";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

interface ChatBoxProps {
  userId?: string;
  className?: string;
  defaultMinimized?: boolean;
}

export function ChatBox({
  userId = "user-123",
  className,
  defaultMinimized = true,
}: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(!defaultMinimized);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ✅ Định nghĩa callback cố định không đổi
  const handleNewMessage = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const {
    currentRoom,
    messages,
    isLoading,
    isSending,
    isConnected,
    startChat,
    sendMessage,
  } = useChatSocket({
    userId,
    onNewMessage: handleNewMessage,
  });

  // Auto scroll when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!currentRoom) {
      await startChat(message);
    } else {
      await sendMessage(message);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <Card className="w-80 h-96 flex flex-col shadow-xl border-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-blue-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Hỗ trợ khách hàng</h3>
              <div className="flex items-center gap-1">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isConnected ? "bg-green-400" : "bg-red-400"
                  )}
                />
                <span className="text-xs opacity-90">
                  {isConnected ? "Đang hoạt động" : "Không kết nối"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <ScrollArea className="flex-1 p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Đang kết nối...</p>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="font-medium text-gray-900 mb-1">
                      Chào mừng bạn!
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Chúng tôi sẵn sàng hỗ trợ bạn về các sản phẩm thuốc
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      Nhắn tin để bắt đầu
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message._id}
                      message={message}
                      isCurrentUser={message.sender === userId}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isSending || isLoading}
              placeholder={
                !currentRoom
                  ? "Nhập tin nhắn để bắt đầu..."
                  : "Nhập tin nhắn..."
              }
            />
          </>
        )}
      </Card>
    </div>
  );
}
