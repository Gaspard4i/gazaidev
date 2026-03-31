// ChatGPT Sort — Simule une conversation entre l'utilisateur et ChatGPT
// ChatGPT explique avec plein d'emojis mais ne trie jamais rien
export function* chatgptSort(arr) {
  const conversation = [
    { role: 'user', text: 'Sort this array: [4, 2, 7, 1, 9, 3]' },
    { role: 'gpt', text: "Great question! 🎯 Sorting is one of the most fundamental operations in computer science! Let me explain how it works! ✨" },
    { role: 'user', text: 'No I just want you to sort it' },
    { role: 'gpt', text: "Of course! 😊 There are actually MANY ways to sort an array! 📊 The most common ones are:" },
    { role: 'gpt', text: "1️⃣ Bubble Sort — O(n²) 🫧\n2️⃣ Quick Sort — O(n log n) ⚡\n3️⃣ Merge Sort — O(n log n) 🔀" },
    { role: 'gpt', text: "Each has its own advantages and trade-offs! 🤔💡 Would you like me to explain each one in detail? 📚" },
    { role: 'user', text: 'NO just sort the array please' },
    { role: 'gpt', text: "Absolutely! 💪 Let me walk you through the process step by step! 🚀" },
    { role: 'gpt', text: "Step 1: We compare adjacent elements 👀\nStep 2: If they're out of order, we swap! 🔄\nStep 3: We repeat until everything is sorted! ✅" },
    { role: 'user', text: 'Can you just give me the sorted array???' },
    { role: 'gpt', text: "I'd love to help! 😄 Here's a Python implementation:\n\ndef sort(arr):\n    return sorted(arr) 🐍✨" },
    { role: 'user', text: 'I DONT WANT CODE I WANT THE RESULT' },
    { role: 'gpt', text: "I totally understand your frustration! 🙏 Let me think about this... 🤔" },
    { role: 'gpt', text: "So if we take [4, 2, 7, 1, 9, 3] and apply a comparison-based sorting algorithm... 📊" },
    { role: 'gpt', text: "First we compare 4 and 2... 4 > 2 so we swap! 🔄\nThen 4 and 7... 4 < 7 so we keep! ✅\nThen 7 and 1... 7 > 1 so we swap! 🔄" },
    { role: 'user', text: 'JUST TELL ME THE ANSWER' },
    { role: 'gpt', text: "The sorted array is: [1, 2, 3, 4, 7, 9] 🎉🎊✨\n\nWas this helpful? 👍👎\n\nFeel free to ask if you have any other questions! 😊💪🚀" },
    { role: 'user', text: '...' },
    { role: 'gpt', text: "I'm glad I could help! 😊 Remember, understanding sorting algorithms is crucial for technical interviews! 💼🧠\n\nHere are some resources to learn more: 📚✨" },
    { role: 'user', text: 'goodbye' },
    { role: 'gpt', text: "Goodbye! 👋😊 Don't forget to like and subscribe! 🔔✨💯🎯🚀\n\nHave a great day! 🌟" },
  ];

  const history = [];

  for (let i = 0; i < conversation.length; i++) {
    const msg = conversation[i];
    history.push(msg);

    // Typing indicator avant chaque message
    const typingDuration = msg.role === 'gpt' ? 25 : 10;
    for (let f = 0; f < typingDuration; f++) {
      yield {
        type: 'compare', indices: [],
        meta: 'gpt_typing_indicator',
        history: [...history.slice(0, -1)],
        typingRole: msg.role,
        typingDots: '.'.repeat((f % 3) + 1),
      };
    }

    // Afficher le message lettre par lettre
    const chars = msg.text.length;
    const charSpeed = msg.role === 'gpt' ? 3 : 5; // GPT tape plus lentement
    const typingFrames = Math.ceil(chars / charSpeed);

    for (let f = 0; f <= typingFrames; f++) {
      const visibleChars = Math.min(chars, f * charSpeed);
      yield {
        type: 'compare', indices: [],
        meta: 'gpt_message',
        history: [...history.slice(0, -1), { role: msg.role, text: msg.text.slice(0, visibleChars) }],
      };
    }

    // Pause apres chaque message
    const pauseAfter = msg.role === 'user' ? 15 : 25;
    for (let f = 0; f < pauseAfter; f++) {
      yield {
        type: 'compare', indices: [],
        meta: 'gpt_message',
        history: [...history],
      };
    }
  }

  // Fin — le tableau n'est pas trie
  for (let f = 0; f < 40; f++) {
    yield { type: 'compare', indices: [], meta: 'gpt_done', history };
  }
}
