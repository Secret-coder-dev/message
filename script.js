
// ==========================================
// A LITTLE SOMETHING FOR YOU
// COMPLETE INTERACTIVE CONFESSION WEBSITE
// ==========================================

// SCREEN MANAGEMENT

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// ==========================================
// WELCOME SCREEN
// ==========================================

const startBtn = document.getElementById("startBtn");
const envelope = document.getElementById("envelope");

startBtn.addEventListener("click", () => {
  envelope.classList.add("opened");

  startBtn.disabled = true;
  startBtn.textContent = "Opening your surprise...";

  setTimeout(() => {
    showScreen("chatScreen");
    startChat();
  }, 900);
});


// ==========================================
// INTERACTIVE CHAT CONVERSATION
// ==========================================

const chatMessages = document.getElementById("chatMessages");
const typing = document.getElementById("typing");
const nextChatBtn = document.getElementById("nextChatBtn");
const chatHint = document.getElementById("chatHint");

const conversation = [

  {
    sender: "recipient",
    name: "A little question",
    message: "Hey! Before anything else, I hope you're having a good day. ♡"
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "I know this might seem a little random, but there's something I've been wanting to tell you."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "I've actually been thinking about how to say this without making things awkward."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "But I guess some things are worth being nervous about, right? Haha."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "Have you ever found yourself getting attached to someone without even planning to?"
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "Someone whose messages you look forward to. Someone who can make an ordinary day feel a little better."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "Well... I think I've found myself in that situation."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "And the funny thing is, I didn't even notice when it started happening."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "It just happened. Slowly, unexpectedly, and probably more naturally than I could ever explain."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "I started looking forward to talking to you. I became curious about your day, your thoughts, and all the little things that make you who you are."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "And eventually, I realized that what I felt wasn't just ordinary admiration anymore."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "I think you already know where this conversation is going... but I still want to say it properly."
  },

  {
    sender: "recipient",
    name: "A little question",
    message: "So, can I tell you something? Something I've been keeping to myself for a while?"
  }

];

let currentMessage = 0;
let isTyping = false;

function startChat() {

  currentMessage = 0;
  chatMessages.innerHTML = "";

  nextChatBtn.disabled = true;
  nextChatBtn.textContent = "Continue →";

  chatHint.textContent = "A little conversation starts here. ♡";

  setTimeout(() => {
    displayNextMessage();
  }, 500);

}

function displayNextMessage() {

  if (isTyping) return;

  if (currentMessage >= conversation.length) {

    nextChatBtn.disabled = false;
    nextChatBtn.textContent = "Read my letter 💌";

    chatHint.textContent =
      "There's something important I want you to know.";

    return;
  }

  isTyping = true;
  nextChatBtn.disabled = true;

  const messageData = conversation[currentMessage];

  typing.classList.add("show");

  const delay = Math.min(
    900 + messageData.message.length * 13,
    2400
  );

  setTimeout(() => {

    typing.classList.remove("show");

    const bubble = document.createElement("div");

    bubble.className =
      `chat-message ${messageData.sender}`;

    const name = document.createElement("span");
    name.className = "sender-name";
    name.textContent = messageData.name;

    const content = document.createElement("div");
    content.textContent = messageData.message;

    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = "just now";

    bubble.appendChild(name);
    bubble.appendChild(content);
    bubble.appendChild(time);

    chatMessages.appendChild(bubble);

    const chatBody = document.getElementById("chatBody");

    chatBody.scrollTo({
      top: chatBody.scrollHeight,
      behavior: "smooth"
    });

    currentMessage++;

    isTyping = false;

    if (currentMessage >= conversation.length) {

      nextChatBtn.disabled = false;
      nextChatBtn.textContent = "Read my letter 💌";

      chatHint.textContent =
        "There's something important I want you to know.";

    } else {

      nextChatBtn.disabled = false;
      nextChatBtn.textContent = "Continue →";

    }

  }, delay);

}


// NEXT CHAT BUTTON

nextChatBtn.addEventListener("click", () => {

  if (currentMessage < conversation.length) {

    displayNextMessage();

  } else {

    showScreen("letterScreen");
    revealLetter();

  }

});


// ==========================================
// CONFESSION LETTER ANIMATION
// ==========================================

let letterRevealed = false;

function revealLetter() {

  if (letterRevealed) return;

  letterRevealed = true;

  const paragraphs = document.querySelectorAll(
    "#letterContent p"
  );

  paragraphs.forEach((paragraph, index) => {

    setTimeout(() => {

      paragraph.classList.add("visible");

    }, index * 110);

  });

  // Let the recipient scroll through the letter.

  setTimeout(() => {

    const lastParagraph =
      document.querySelector("#letterContent p:last-child");

    if (lastParagraph) {
      lastParagraph.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }

  }, paragraphs.length * 110 + 500);

}


// CONTINUE TO RESPONSE

const letterNextBtn =
  document.getElementById("letterNextBtn");

letterNextBtn.addEventListener("click", () => {

  showScreen("responseScreen");

});


// ==========================================
// PRIVATE RESPONSE
// ==========================================

const recipientName =
  document.getElementById("recipientName");

const recipientResponse =
  document.getElementById("recipientResponse");

const sendResponseBtn =
  document.getElementById("sendResponseBtn");

const skipResponseBtn =
  document.getElementById("skipResponseBtn");

const finalDescription =
  document.getElementById("finalDescription");

sendResponseBtn.addEventListener("click", () => {

  const name = recipientName.value.trim();
  const response = recipientResponse.value.trim();

  if (!response) {

    recipientResponse.focus();

    recipientResponse.placeholder =
      "It's okay to take your time, but write something if you're ready. ♡";

    recipientResponse.style.borderColor = "#bd747e";

    return;

  }

  finalDescription.textContent = name
    ? `Thank you, ${name}, for taking the time to share your thoughts. Whatever your answer may be, I appreciate your honesty. ♡`
    : "Thank you for sharing your thoughts. Whatever your answer may be, I appreciate your honesty. ♡";

  showScreen("finalScreen");

  createCelebration();

});

skipResponseBtn.addEventListener("click", () => {

  finalDescription.textContent =
    "That's completely okay. You don't have to have an answer right now. Take all the time you need. ♡";

  showScreen("finalScreen");

});


// ==========================================
// REPLAY THE WEBSITE
// ==========================================

const replayBtn = document.getElementById("replayBtn");

replayBtn.addEventListener("click", () => {

  currentMessage = 0;
  isTyping = false;
  letterRevealed = false;

  chatMessages.innerHTML = "";

  recipientName.value = "";
  recipientResponse.value = "";

  document.querySelectorAll("#letterContent p")
    .forEach(paragraph => {
      paragraph.classList.remove("visible");
    });

  nextChatBtn.disabled = true;

  showScreen("welcome");

});


// ==========================================
// FLOATING SCRAPBOOK HEARTS
// ==========================================

const heartSymbols = [
  "♡", "♥", "✿", "✧", "🌷", "💕"
];

function createFloatingHeart() {

  const heart = document.createElement("span");

  heart.textContent =
    heartSymbols[
      Math.floor(Math.random() * heartSymbols.length)
    ];

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-40px";

  heart.style.fontSize =
    (12 + Math.random() * 15) + "px";

  heart.style.color = "#c88f91";
  heart.style.opacity = ".55";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1";

  const duration = 7 + Math.random() * 5;

  heart.animate(
    [
      {
        transform: "translateY(0) rotate(0deg)",
        opacity: 0
      },
      {
        opacity: .55,
        offset: .2
      },
      {
        transform:
          `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
        opacity: 0
      }
    ],
    {
      duration: duration * 1000,
      easing: "linear"
    }
  );

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);

}

setInterval(createFloatingHeart, 900);


// ==========================================
// FINAL CELEBRATION
// ==========================================

function createCelebration() {

  const symbols = ["♡", "🌸", "💕", "✿", "✨"];

  for (let i = 0; i < 30; i++) {

    const piece = document.createElement("span");

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-30px";
    piece.style.fontSize =
      (15 + Math.random() * 20) + "px";

    piece.style.pointerEvents = "none";
    piece.style.zIndex = "100";

    const duration = 2000 + Math.random() * 2500;

    piece.animate(
      [
        {
          transform: "translateY(0) rotate(0)",
          opacity: 1
        },
        {
          transform:
            `translateY(${window.innerHeight + 100}px) rotate(360deg)`,
          opacity: 0
        }
      ],
      {
        duration,
        easing: "ease-in",
        fill: "forwards"
      }
    );

    document.body.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, duration);

  }

}
