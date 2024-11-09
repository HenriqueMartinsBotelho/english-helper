function getAI(prompt: string, text: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${prompt}: ${text}`);
    }, 1000);
  });
}

export default getAI;
