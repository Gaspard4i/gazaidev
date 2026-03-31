// ChatGPT Sort — Explique comment trier avec plein d'emojis
// Ne trie rien, juste affiche du texte avec des emojis
export function* chatgptSort(arr) {
  const lines = [
    "Great question! Let me help you sort this array! 🎯✨",
    "First, let's understand what sorting means 📚🤓",
    "Sorting is the process of arranging elements 📊",
    "in a specific order (ascending/descending) ⬆️⬇️",
    "There are MANY algorithms to do this! 🚀💡",
    "",
    "Here are the most popular ones: 🏆",
    "1️⃣ Bubble Sort — compares neighbors 🫧",
    "2️⃣ Quick Sort — divide and conquer ⚡",
    "3️⃣ Merge Sort — split and merge 🔀",
    "",
    "Let me walk you through Bubble Sort! 🫧✨",
    "Step 1: Compare adjacent elements 👀",
    "Step 2: Swap if they're in wrong order 🔄",
    "Step 3: Repeat until sorted! 🔁",
    "",
    "Here's some pseudocode: 💻",
    "for i in range(n): 🔢",
    "  for j in range(n-1): 🔢",
    "    if arr[j] > arr[j+1]: ❓",
    "      swap(arr[j], arr[j+1]) 🔄✅",
    "",
    "Hope this helps! Let me know if you",
    "have any other questions! 😊🙏💪",
    "",
    "Was this response helpful? 👍👎",
  ];

  // Afficher chaque ligne avec un effet de typing
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      for (let f = 0; f < 5; f++) {
        yield { type: 'compare', indices: [], meta: 'gpt_pause' };
      }
      continue;
    }
    for (let f = 0; f < 12; f++) {
      yield {
        type: 'compare',
        indices: [],
        meta: 'gpt_typing',
        line: lines[i],
        lineIdx: i,
        typingFrame: f,
        allLines: lines.slice(0, i + 1),
      };
    }
  }

  // A la fin : rien n'est trie
  for (let f = 0; f < 30; f++) {
    yield { type: 'compare', indices: [], meta: 'gpt_done', allLines: lines };
  }
}
