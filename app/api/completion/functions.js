exports.generatePrompt = (input) => {
  let { name, age, gender, style, language, characters, location } = input;
  const story =
    style === "fairy"
      ? "a fairy tale"
      : style === "adventure"
      ? "an adventure story"
      : "a fun story";

  let charPrompt = "";
  characters.forEach((character) => {
    charPrompt += `- A ${character.type} called ${character.name} \n`;
  });
  // console.log("charPrompt", charPrompt);

  // ending = `Makram, I hope you have enjoyed this story and learned a valuable lesson. Be brave and use your courage to achieve your dreams and defend those who you love.`

  let completion = `
  Today we will tell a ${age} years old ${gender} called ${name} ${story} in ${language} about the following characters:
 ${charPrompt}
 The story takes place in ${location} 

  `;
  return completion;
};
