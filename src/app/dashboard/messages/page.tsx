"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

const CONVERSATIONS = [
  { id: "c1", name: "Arif Rahman", country: "🇧🇩", lastMsg: "Can you share more photos?", time: "2h ago", unread: 2, status: "Pickup Scheduled", route: "London → Dhaka" },
  { id: "c2", name: "Fatima Al-Mansouri", country: "🇦🇪", lastMsg: "I've confirmed the booking.", time: "5h ago", unread: 0, status: "In Transit", route: "Dubai → Toronto" },
  { id: "c3", name: "Elif Yıldız", country: "🇹🇷", lastMsg: "Sure, we can negotiate.", time: "1d ago", unread: 1, status: "Requested", route: "Istanbul → NYC" },
];

const MESSAGES_MOCK = [
  { id: 1, sender: "Arif Rahman", text: "Hi, I can carry your item on my July 15 flight. Can you share more photos?", time: "2:14 PM", isMe: false },
  { id: 2, sender: "You", text: "Sure! I'll upload 4 angle photos right away. The item is fully packed in original box with invoice.", time: "2:21 PM", isMe: true },
  { id: 3, sender: "Arif Rahman", text: "Perfect. I've reviewed the photos. Looks good. Can we agree on £40 for carrying fee?", time: "2:45 PM", isMe: false },
  { id: 4, sender: "You", text: "I was thinking £35. Happy to meet in the middle at £37?", time: "2:51 PM", isMe: true },
  { id: 5, sender: "Arif Rahman", text: "Deal at £37. I'll formally accept the booking now.", time: "2:58 PM", isMe: false },
  { id: 6, sender: "🤖 CarryBridge System", text: "Booking B-1042 accepted. Sender to place escrow deposit within 24 hours. Next: schedule pickup and item inspection.", time: "2:59 PM", isMe: false, isSystem: true },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState("c1");
  const [newMsg, setNewMsg] = useState("");

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
        <div className="flex h-full">

          {/* Conversation list */}
          <div className="w-72 border-r border-gray-200 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100">
              <input className="w-full bg-gray-100 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Search conversations..." />
            </div>
            <div className="flex-1 overflow-y-auto">
              {CONVERSATIONS.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelected(conv.id)}
                  className={`px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selected === conv.id ? "bg-blue-50 border-l-2 border-l-blue-500" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {getInitials(conv.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-900 truncate">{conv.name} {conv.country}</span>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{conv.time}</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">{conv.lastMsg}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs">{conv.status}</Badge>
                      </div>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{conv.unread}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white font-bold text-xs">AR</div>
                <div>
                  <div className="font-bold text-sm text-gray-900">Arif Rahman 🇧🇩</div>
                  <div className="text-xs text-gray-500">London → Dhaka · July 15 · Booking B-1042</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="warning">Pickup Scheduled</Badge>
                <Button size="sm" variant="outline">📋 View Booking</Button>
              </div>
            </div>

            {/* Safety reminder */}
            <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 text-xs text-amber-800 flex items-center gap-2">
              🔒 All messages are monitored for safety. Do not share contact details or payment info outside CarryBridge.
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {MESSAGES_MOCK.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  {!msg.isMe && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 mt-1">
                      {msg.isSystem ? "🤖" : "AR"}
                    </div>
                  )}
                  <div className={`max-w-xs md:max-w-md ${msg.isMe ? "items-end" : "items-start"} flex flex-col gap-0.5`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isSystem
                        ? "bg-blue-50 border border-blue-200 text-blue-800 text-xs"
                        : msg.isMe
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-900 rounded-bl-sm"
                    }`}>
                      {msg.isSystem && <div className="font-bold mb-0.5">{msg.sender}</div>}
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Offer buttons */}
            <div className="px-5 py-2 border-t border-gray-100 flex gap-2 overflow-x-auto">
              {["Make Counter Offer", "Accept Booking", "Request Item Photos", "Schedule Pickup"].map((action) => (
                <button key={action} className="flex-shrink-0 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200 transition-colors">
                  {action}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex gap-3 items-end">
                <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">📎</button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Type a message... (Shift+Enter for new line)"
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 max-h-32"
                    rows={1}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); setNewMsg(""); }}}
                  />
                </div>
                <Button size="sm" className="flex-shrink-0 h-10 px-4" disabled={!newMsg.trim()}>Send →</Button>
              </div>
              <div className="text-xs text-gray-400 mt-1.5 ml-10">🌐 Auto-translate available for Arabic, Bangla, Hindi, French, Spanish</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
