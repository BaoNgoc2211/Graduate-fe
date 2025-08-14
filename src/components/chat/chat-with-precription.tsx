"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, FileImage } from "lucide-react";
import type {
  ISendPrescriptionPayload,
  IUpdatePrescriptionPayload,
} from "@/interface/auth/chat.interface";
import { PrescriptionUpload } from "./prescription-upload";
import { useChatWithPrescription } from "@/hooks/chat/useChat.hooks";

interface ChatWithPrescriptionProps {
  roomId: string;
}

export function ChatWithPrescription({ roomId }: ChatWithPrescriptionProps) {
  const [activeTab, setActiveTab] = useState("chat");

  const {
    messagesQuery,
    sendPrescriptionMutation,
    updatePrescriptionMutation,
  } = useChatWithPrescription(roomId);
  console.log("ChatWithPrescription messagesQuery", messagesQuery);

  const handleSendPrescription = useCallback(
    (data: ISendPrescriptionPayload) => {
      sendPrescriptionMutation.mutate(data, {
        onSuccess: () => {
          setActiveTab("chat");
        },
      });
    },
    [sendPrescriptionMutation]
  );

  const handleUpdatePrescription = useCallback(
    (data: IUpdatePrescriptionPayload) => {
      updatePrescriptionMutation.mutate(data, {
        onSuccess: () => {
          setActiveTab("chat");
        },
      });
    },
    [updatePrescriptionMutation]
  );

  const messages = useMemo(
    () => messagesQuery.data?.data || [],
    [messagesQuery.data?.data]
  );

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 data-[state=active]:bg-blue-900 data-[state=active]:text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Chat Messages
            </TabsTrigger>
            <TabsTrigger
              value="prescription"
              className="flex items-center gap-2 data-[state=active]:bg-blue-900 data-[state=active]:text-white"
            >
              <FileImage className="h-4 w-4" />
              Prescription Upload
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900">
                Chat Messages
              </h3>

              <div className="min-h-[400px] max-h-[500px] overflow-y-auto border border-blue-200 rounded-lg p-4 bg-gray-50 scroll-smooth">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
                      message.senderType === "user"
                        ? "bg-blue-100 text-blue-900 ml-auto"
                        : "bg-white text-gray-800 mr-auto border border-blue-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}

                {messagesQuery.isLoading && (
                  <div className="text-center text-blue-600 py-8">
                    Loading messages...
                  </div>
                )}

                {messages.length === 0 && !messagesQuery.isLoading && (
                  <div className="text-center text-gray-500 py-8">
                    No messages yet
                  </div>
                )}
              </div>

              {/* Quick Switch to Prescription */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setActiveTab("prescription")}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  Upload Prescription
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="prescription" className="p-6">
            <PrescriptionUpload
              roomId={roomId}
              onSendPrescription={handleSendPrescription}
              onUpdatePrescription={handleUpdatePrescription}
              isUploading={sendPrescriptionMutation.isPending}
              isUpdating={updatePrescriptionMutation.isPending}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
