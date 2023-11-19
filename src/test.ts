function qq(word: string) {
  let count = 0;
  let currentLetter = "";
  const letters = [...new Set(word.split(""))];
  for (const item of letters) {
    const letterCount = word
      .split("")
      .filter((l) => l.toLowerCase() === item.toLowerCase()).length;
    if (letterCount > count) {
      count = letterCount;
      currentLetter = item;
    }
  }
  return currentLetter;
}

console.log(qq("uuuuaaaaau"));
