const toggleBtn = document.getElementById("chat-toggle-btn");
const chatWindow = document.getElementById("chat-window");
const closeBtn = document.getElementById("chat-close-btn");
const messagesEl = document.getElementById("chat-messages");
const inputEl = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send-btn");

// تولید و ذخیره sessionId در localStorage
let sessionId = localStorage.getItem("chat-session-id");
if (!sessionId) {
  sessionId = "session-" + Date.now(); // می‌تونی اینو با UUID هم عوض کنی
  localStorage.setItem("chat-session-id", sessionId);
}

function addMessage(text, className) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", className);
  msgDiv.textContent = text;
  messagesEl.appendChild(msgDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function showTypingIndicator() {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("typing-indicator");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  messagesEl.appendChild(typingDiv);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

toggleBtn.addEventListener("click", () => {
  if (chatWindow.style.display === "flex") {
    chatWindow.classList.remove("show");
    setTimeout(() => {
      chatWindow.style.display = "none";
    }, 300);
  } else {
    chatWindow.style.display = "flex";
    setTimeout(() => {
      chatWindow.classList.add("show");
      inputEl.focus();
    }, 10);
  }
});

closeBtn.addEventListener("click", () => {
  chatWindow.classList.remove("show");
  setTimeout(() => {
    chatWindow.style.display = "none";
  }, 300);
});

async function sendQuestion() {
  const question = inputEl.value.trim();
  if (!question) return;

  addMessage(question, "user-msg");
  inputEl.value = "";
  showTypingIndicator();

  try {
    const response = await fetch("https://n8n-pgnwdezq.eu-central-1.clawcloudrun.com/webhook/da219939-6b99-4710-ab6f-371b1f6d3436", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        sessionId, // 👈 این خط اضافه شده
      }),
    });
    const data = await response.json();

    setTimeout(() => {
      hideTypingIndicator();
      addMessage(data.answer || "متأسفم، پاسخی دریافت نشد.", "bot-msg");
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      hideTypingIndicator();
      addMessage("خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.", "bot-msg");
    }, 1000);
  }
}

sendBtn.addEventListener("click", sendQuestion);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendQuestion();
  }
});

document.addEventListener("click", (e) => {
  if (!chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
    if (chatWindow.style.display === "flex") {
      chatWindow.classList.remove("show");
      setTimeout(() => {
        chatWindow.style.display = "none";
      }, 300);
    }
  }
});
