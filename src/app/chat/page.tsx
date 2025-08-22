"use client";

import { sendMessage, startChat } from "@/api/chat/chat.api";
import { IMessage, IStartChatResponse } from "@/interface/auth/chat.interface";
import { useEffect, useState } from "react";

export default function ChatUserPage() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Khởi tạo chat khi trang mở
  useEffect(() => {
    const initChat = async () => {
      setLoading(true);
      try {
        const res: { data: IStartChatResponse } = await startChat({ message: "Xin chào" });
        setRoomId(res.data.room._id);
        setMessages([res.data.newMessage]);
      } catch (err) {
        console.error("Lỗi khởi tạo chat:", err);
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, []);

  // Gửi tin nhắn
  const handleSend = async () => {
    if (!newMessage.trim() || !roomId) return;
    try {
      const res = await sendMessage({
        roomId,
        content: newMessage,
        senderId: "user", // hoặc ID thực tế nếu có đăng nhập
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Gửi tin nhắn thất bại:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="bg-white rounded shadow p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">Trò chuyện với nhà thuốc</h2>
        {loading ? (
          <p>Đang khởi tạo cuộc trò chuyện...</p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex ${
                  msg.senderType === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.senderType === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-4 py-2 rounded border"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
