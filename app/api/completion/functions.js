exports.generatePrompt = (input) => {
  let completion = `
  Today we will tell ${input} a fairy tale about the following characters:
  - A princess called ${input}
  - A prince called Peter
  - A dragon called Narco
  - A unicorn called Fluffy
  - A wizard called Merlin
  `;
  return completion;
};
