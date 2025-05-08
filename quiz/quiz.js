const questions = [
    {
      question: "Apa ibukota Indonesia?",
      options: ["Jakarta", "Bandung", "Surabaya", "Yogyakarta"],
      answer: "Jakarta"
    },
    {
      question: "Siapa presiden pertama Indonesia?",
      options: ["Soekarno", "Soeharto", "Jokowi", "Habibie"],
      answer: "Soekarno"
    },
    {
      question: "2 + 2 = ?",
      options: ["3", "4", "5", "2"],
      answer: "4"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  function loadQuestion() {
    if (currentQuestion >= questions.length) {
      document.getElementById("quiz").innerHTML = `<h2>Skor akhir kamu: ${score}/${questions.length}</h2>`;
      return;
    }

    const q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.classList.add("option-btn");
      btn.innerText = option;
      btn.onclick = () => {
        if (option === q.answer) {
          score++;
        }
        currentQuestion++;
        loadQuestion();
      };
      optionsContainer.appendChild(btn);
    });

    document.getElementById("score").innerText = `Skor: ${score}`;
  }

  loadQuestion();