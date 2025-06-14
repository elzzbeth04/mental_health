"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Heart, Shield, Clock, Sparkles } from "lucide-react"

export default function MentalHealthChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [isTyping, setIsTyping] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [teddyBears, setTeddyBears] = useState([
    { id: 1, x: 10, y: 20, delay: 0 },
    { id: 2, x: 85, y: 15, delay: 2 },
    { id: 3, x: 20, y: 70, delay: 4 },
    { id: 4, x: 75, y: 80, delay: 1 },
    { id: 5, x: 50, y: 45, delay: 3 },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isLoading) {
      setIsTyping(true)
    } else {
      setIsTyping(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false)
    }
  }, [messages])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
      inputRef.current?.focus()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: suggestion },
    } as any
    handleInputChange(syntheticEvent)
    setTimeout(() => {
      const submitEvent = new Event("submit") as any
      submitEvent.preventDefault = () => {}
      handleSubmit(submitEvent)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-teal-50 via-lavender-50 to-sage-50 relative overflow-hidden">
      {/* Animated Background Elements with Teddy Bears */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-lavender-200/20 to-pink-200/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-sage-200/20 to-pink-200/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-pink-200/20 to-lavender-200/20 rounded-full blur-xl animate-pulse-gentle"></div>

        {/* Floating Teddy Bears */}
        {teddyBears.map((bear) => (
          <div
            key={bear.id}
            className="absolute text-2xl animate-teddy-float opacity-60 hover:opacity-100 transition-opacity duration-300"
            style={{
              left: `${bear.x}%`,
              top: `${bear.y}%`,
              animationDelay: `${bear.delay}s`,
            }}
          >
            🧸
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-pink-200/30 sticky top-0 z-10 animate-slide-down">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-rose-400 to-lavender-400 rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle">
              <Heart className="w-6 h-6 text-white animate-heartbeat" />
            </div>
            <div className="animate-fade-in">
              <h1 className="text-xl font-semibold bg-gradient-to-r from-pink-700 via-rose-700 to-lavender-700 bg-clip-text text-transparent">
                MindfulChat
              </h1>
              <p className="text-sm text-pink-600">Your compassionate AI companion</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-lg animate-teddy-bounce">🧸</span>
              <Sparkles className="w-5 h-5 text-pink-400 animate-twinkle" />
            </div>
          </div>
        </div>
      </header>

      {/* Trust Indicators */}
      <div className="max-w-4xl mx-auto px-4 py-3 animate-fade-in-up">
        <div className="flex items-center justify-center gap-8 text-xs text-pink-600">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full backdrop-blur-sm hover:bg-pink-50/70 transition-all duration-300 hover:scale-105">
            <Shield className="w-3 h-3 text-pink-500" />
            <span>Private & Secure</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full backdrop-blur-sm hover:bg-pink-50/70 transition-all duration-300 hover:scale-105">
            <Clock className="w-3 h-3 text-rose-500" />
            <span>24/7 Available</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded-full backdrop-blur-sm hover:bg-pink-50/70 transition-all duration-300 hover:scale-105">
            <Heart className="w-3 h-3 text-pink-400" />
            <span>Judgment-Free</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <main className="max-w-4xl mx-auto px-4 pb-32">
        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 min-h-[600px] flex flex-col animate-scale-in">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {showWelcome && (
              <div className="text-center py-12 animate-fade-in-up relative">
                {/* Teddy bears around welcome message */}
                <div className="absolute top-4 left-8 text-3xl animate-teddy-bounce opacity-40">🧸</div>
                <div
                  className="absolute top-8 right-12 text-2xl animate-teddy-bounce opacity-40"
                  style={{ animationDelay: "1s" }}
                >
                  🧸
                </div>
                <div
                  className="absolute bottom-8 left-16 text-2xl animate-teddy-bounce opacity-40"
                  style={{ animationDelay: "2s" }}
                >
                  🧸
                </div>
                <div
                  className="absolute bottom-4 right-8 text-3xl animate-teddy-bounce opacity-40"
                  style={{ animationDelay: "0.5s" }}
                >
                  🧸
                </div>

                <div className="w-20 h-20 bg-gradient-to-br from-pink-100 via-rose-100 to-lavender-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-gentle shadow-lg relative">
                  <Bot className="w-10 h-10 text-pink-600 animate-pulse-gentle" />
                  <span className="absolute -top-2 -right-2 text-lg animate-teddy-bounce">🧸</span>
                </div>
                <h2 className="text-3xl font-semibold bg-gradient-to-r from-pink-700 via-rose-700 to-lavender-700 bg-clip-text text-transparent mb-3 animate-fade-in">
                  Welcome to MindfulChat
                </h2>
                <p className="text-pink-600 max-w-md mx-auto leading-relaxed mb-8 animate-fade-in-delayed">
                  I'm here to listen and support you. Feel free to share what's on your mind - this is a safe,
                  confidential space for you to express yourself. 🧸💕
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {[
                    "I'm feeling anxious today",
                    "I need someone to talk to",
                    "Help me manage stress",
                    "I'm having trouble sleeping",
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-5 py-3 bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 text-pink-700 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg border border-pink-200/50 animate-fade-in-stagger backdrop-blur-sm relative"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {suggestion}
                      {index === 0 && <span className="ml-1">🧸</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-message-appear ${message.role === "user" ? "justify-end" : "justify-start"}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-rose-400 to-lavender-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-gentle relative">
                    <Bot className="w-5 h-5 text-white" />
                    <span className="absolute -top-1 -right-1 text-xs">🧸</span>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-pink-500 via-rose-500 to-lavender-500 text-white ml-auto hover:scale-[1.02]"
                      : "bg-white/80 backdrop-blur-sm border border-pink-200/30 text-pink-800 hover:bg-white/90"
                  }`}
                >
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div key={`${message.id}-${i}`} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </div>
                        )
                      default:
                        return null
                    }
                  })}
                </div>

                {message.role === "user" && (
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-lavender-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-gentle">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 via-rose-400 to-lavender-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse-gentle relative">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute -top-1 -right-1 text-xs">🧸</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-pink-200/30 rounded-2xl px-5 py-4 shadow-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce-typing"></div>
                    <div
                      className="w-2 h-2 bg-rose-400 rounded-full animate-bounce-typing"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-lavender-400 rounded-full animate-bounce-typing"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-pink-200/30 animate-slide-up">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={onSubmit} className="flex gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Share what's on your mind... 🧸💕"
                className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border border-pink-300/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent shadow-lg transition-all duration-300 placeholder-pink-500 hover:bg-white/90 focus:bg-white/95"
                disabled={isLoading}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg opacity-30">🧸</span>
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-lavender-500 text-white rounded-2xl hover:from-pink-600 hover:via-rose-600 hover:to-lavender-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 font-medium"
            >
              <Send className="w-4 h-4 animate-pulse-gentle" />
              Send
            </button>
          </form>

          <p className="text-xs text-pink-500 text-center mt-3 animate-fade-in-delayed">
            This is not a substitute for professional mental health care. If you're in crisis, please contact emergency
            services. 🧸💕
          </p>
        </div>
      </div>
    </div>
  )
}
