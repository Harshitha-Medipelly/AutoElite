import { useEffect, useRef, useState } from "react";

import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Trash2,
  CarFront,
  BarChart3,
  PackageSearch,
  MessageCircle,
  Users,
  CalendarDays,
  ShoppingCart,
} from "lucide-react";

import "./AIChatbot.css";

/* =========================================================
   AUTOELITE AI CHATBOT
   ========================================================= */

function AIChatbot() {
  /* =======================================================
     STATE
     ======================================================= */

  const [open, setOpen] = useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        id: 1,
        role: "assistant",
        text:
          "Hello! I'm AutoElite AI. I can help you with inventory, vehicles, sales, customers, appointments, test drives, purchases and dealership performance.",
      },
    ]);

  const messagesEndRef =
    useRef(null);

  const inputRef =
    useRef(null);


  /* =======================================================
     AUTO SCROLL
     ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [
    messages,
    loading,
  ]);


  /* =======================================================
     FOCUS INPUT WHEN OPENED
     ======================================================= */

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [open]);


  /* =======================================================
     SEND MESSAGE TO FASTAPI
     ======================================================= */

  const sendMessage = async (
    customMessage = null
  ) => {
    const text =
      customMessage !== null
        ? customMessage.trim()
        : message.trim();

    if (!text || loading) {
      return;
    }


    /* -----------------------------------------------------
       ADD USER MESSAGE
       ----------------------------------------------------- */

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: text,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");

    setLoading(true);


    /* -----------------------------------------------------
       CONNECT TO FASTAPI BACKEND
       ----------------------------------------------------- */

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: text,
          }),
        }
      );


      /* ---------------------------------------------------
         CHECK HTTP RESPONSE
         --------------------------------------------------- */

      if (!response.ok) {
        let errorMessage =
          `Backend returned ${response.status}`;

        try {
          const errorData =
            await response.json();

          if (errorData?.detail) {
            errorMessage =
              errorData.detail;
          }
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(
          errorMessage
        );
      }


      /* ---------------------------------------------------
         READ JSON RESPONSE
         --------------------------------------------------- */

      const data =
        await response.json();


      /* ---------------------------------------------------
         GET AI RESPONSE
         --------------------------------------------------- */

      const aiResponse =
        data?.response ||
        data?.answer ||
        data?.message;


      if (!aiResponse) {
        throw new Error(
          "The backend returned an empty response."
        );
      }


      /* ---------------------------------------------------
         ADD AI MESSAGE
         --------------------------------------------------- */

      setMessages((current) => [
        ...current,

        {
          id: Date.now() + 1,
          role: "assistant",
          text: aiResponse,
        },
      ]);
    }


    /* -----------------------------------------------------
       ERROR
       ----------------------------------------------------- */

    catch (error) {
      console.error(
        "AutoElite AI error:",
        error
      );

      setMessages((current) => [
        ...current,

        {
          id: Date.now() + 1,
          role: "assistant",
          text:
            "I couldn't connect to the AutoElite backend. Please make sure FastAPI is running on port 8000.",
          error: true,
        },
      ]);
    }


    /* -----------------------------------------------------
       STOP LOADING
       ----------------------------------------------------- */

    finally {
      setLoading(false);
    }
  };


  /* =======================================================
     ENTER KEY
     ======================================================= */

  const handleKeyDown = (
    event
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      sendMessage();
    }
  };


  /* =======================================================
     CLEAR CHAT
     ======================================================= */

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text:
          "Chat cleared. How can I help you with your dealership?",
      },
    ]);

    setMessage("");
  };


  /* =======================================================
     QUICK PROMPTS
     ======================================================= */

  const quickPrompts = [
    {
      label:
        "Inventory insights",

      icon: PackageSearch,

      text:
        "Give me the inventory status",
    },

    {
      label:
        "Sales performance",

      icon: BarChart3,

      text:
        "Show sales performance",
    },

    {
      label:
        "Vehicle insights",

      icon: CarFront,

      text:
        "Show popular vehicles",
    },

    {
      label:
        "Customers",

      icon: Users,

      text:
        "Give me the customer overview",
    },

    {
      label:
        "Appointments",

      icon: CalendarDays,

      text:
        "Show appointment status",
    },

    {
      label:
        "Purchases",

      icon: ShoppingCart,

      text:
        "Show pending purchases",
    },
  ];


  /* =======================================================
     OPEN CHAT
     ======================================================= */

  const openChat = () => {
    setOpen(true);
  };


  /* =======================================================
     CLOSE CHAT
     ======================================================= */

  const closeChat = () => {
    setOpen(false);
  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <>
      {/* ===================================================
          FLOATING AI BUTTON
          =================================================== */}

      {!open && (
        <button
          type="button"
          onClick={openChat}
          className="ai-floating-button"
          aria-label="Open AutoElite AI"
          title="Open AutoElite AI"
        >
          <span className="ai-floating-glow" />

          <span className="ai-floating-icon">
            <Sparkles size={21} />
          </span>

          <span className="ai-floating-label">
            AutoElite AI
          </span>

          <span className="ai-online-dot" />
        </button>
      )}


      {/* ===================================================
          CHAT WINDOW
          =================================================== */}

      {open && (
        <div
          className="ai-chat-window"
          role="dialog"
          aria-label="AutoElite AI Chat"
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="ai-chat-header">

            <div className="ai-chat-header-left">

              <div className="ai-chat-avatar">
                <Sparkles size={19} />
              </div>

              <div>
                <div className="ai-chat-title">
                  AutoElite AI
                </div>

                <div className="ai-chat-status">
                  <span />
                  AI Dealership Copilot
                </div>
              </div>

            </div>


            {/* HEADER ACTIONS */}

            <div className="ai-chat-header-actions">

              <button
                type="button"
                onClick={clearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="ai-header-button"
              >
                <Trash2 size={15} />
              </button>


              <button
                type="button"
                onClick={closeChat}
                title="Close AutoElite AI"
                aria-label="Close AutoElite AI"
                className="ai-header-button"
              >
                <X size={18} />
              </button>

            </div>

          </div>


          {/* =================================================
              INTRO SECTION

              Only shown when there are no user messages.
              ================================================= */}

          {messages.length === 1 && (
            <div className="ai-intro">

              <div className="ai-intro-icon">
                <Bot size={24} />
              </div>

              <h3>
                How can I help?
              </h3>

              <p>
                Ask me about your dealership,
                inventory, customers, sales,
                purchases or performance.
              </p>

            </div>
          )}


          {/* =================================================
              QUICK PROMPTS
              ================================================= */}

          {messages.length === 1 && (
            <div className="ai-quick-prompts">

              {quickPrompts.map(
                (prompt) => {
                  const Icon =
                    prompt.icon;

                  return (
                    <button
                      key={prompt.label}
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        sendMessage(
                          prompt.text
                        )
                      }
                      className="ai-quick-button"
                    >
                      <Icon size={15} />

                      <span>
                        {prompt.label}
                      </span>
                    </button>
                  );
                }
              )}

            </div>
          )}


          {/* =================================================
              MESSAGE AREA
              ================================================= */}

          <div className="ai-messages">

            {messages.map(
              (item) => (
                <div
                  key={item.id}
                  className={`
                    ai-message-row
                    ${
                      item.role ===
                      "user"
                        ? "user-message"
                        : "assistant-message"
                    }
                  `}
                >

                  {/* AI AVATAR */}

                  {item.role ===
                    "assistant" && (
                    <div className="ai-message-avatar">
                      <Sparkles size={14} />
                    </div>
                  )}


                  {/* MESSAGE */}

                  <div
                    className={`
                      ai-message
                      ${
                        item.error
                          ? "ai-message-error"
                          : ""
                      }
                    `}
                  >
                    {item.text}
                  </div>


                  {/* USER AVATAR */}

                  {item.role ===
                    "user" && (
                    <div className="user-message-avatar">
                      <User size={14} />
                    </div>
                  )}

                </div>
              )
            )}


            {/* =================================================
                TYPING INDICATOR
                ================================================= */}

            {loading && (
              <div className="ai-message-row assistant-message">

                <div className="ai-message-avatar">
                  <Sparkles size={14} />
                </div>

                <div className="ai-message ai-typing">

                  <span />
                  <span />
                  <span />

                </div>

              </div>
            )}


            <div
              ref={messagesEndRef}
            />

          </div>


          {/* =================================================
              INPUT AREA
              ================================================= */}

          <div className="ai-input-area">

            <div className="ai-input-wrapper">

              <textarea
                ref={inputRef}
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Ask AutoElite AI..."
                rows={1}
                disabled={loading}
                className="ai-input"
                aria-label="Ask AutoElite AI"
              />


              {/* SEND BUTTON */}

              <button
                type="button"
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  !message.trim() ||
                  loading
                }
                className="ai-send-button"
                aria-label="Send message"
                title="Send message"
              >
                <Send size={17} />
              </button>

            </div>


            {/* INPUT FOOTER */}

            <div className="ai-input-footer">

              <span>
                <MessageCircle
                  size={11}
                />

                AI Dealership Copilot
              </span>

              <span>
                Enter to send
              </span>

            </div>

          </div>

        </div>
      )}
    </>
  );
}


export default AIChatbot;
