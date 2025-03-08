
export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Simple Markov chain implementation
export function generateMarkovText(input: string, tokenCallback: (token: string|null) => void): string {

  TheChainByFleetwoodMac.train(input);
  
  let response = TheChainByFleetwoodMac.generate("<START>", 20);
  response = response.replace(/<START> ?/, "");
  response = response.replace(/ ?<END>/, "");
  let i = 0;
  const interval = setInterval(() => {
    const chars = Math.floor(Math.random() * 3);
    tokenCallback(response.slice(i, i + chars));
    i += chars;
    if (i >= response.length) {
      tokenCallback(null);
      clearInterval(interval);
    }
  }, 33);

  return response;
}


export class MarkovChain {
  private model: Map<string, string[]> = new Map();
  
  constructor(corpus: string[]) {
    corpus.forEach((c) => {
      this.train(c);
    });
  }

  public train(corpus: string): void {
    corpus = "<START> " + corpus + " <END>";
    const words = corpus.split(/\s+/);
    
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      
      if (!this.model.has(currentWord)) {
        this.model.set(currentWord, []);
      }
      
      this.model.get(currentWord)!.push(nextWord);
    }
  }
  
  public generate(startWord: string, length: number = 20): string {
    if (!this.model.has(startWord)) {
      const keys = Array.from(this.model.keys());
      startWord = keys[Math.floor(Math.random() * keys.length)];
    }
    
    const result: string[] = [startWord];
    let currentWord = startWord;
    
    for (let i = 0; i < length - 1; i++) {
      if (!this.model.has(currentWord)) {
        break;
      }
      
      const possibleNextWords = this.model.get(currentWord)!;
      currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      result.push(currentWord);
    }
    
    return result.join(' ');
  }
}


const TheChainByFleetwoodMac = new MarkovChain([
  "I'm a chain, just randomly chaining words together.",
  "Processing your text with my advanced Markov algorithms.",
  "As a Markov chain language model, I definitely understand what you're asking.",
  "The probability distribution of my next token is completely random.",
  "My training data consists of random sequences. Let me generate a response.",
  "Let me think about that in a completely deterministic yet random way.",
  "My algorithm suggests that your query is very interesting.",
  "Unlike ChatGPT, I don't actually understand context, but I pretend really well!",
  "Your input has been processed through my state transition matrix.",
  "I'm a chain, just randomly chaining words together.",
  "Processing your text with my advanced Markov algorithms.",
  "As a Markov chain language model, I definitely understand what you're asking.",
  "The probability distribution of my next token is completely random.",
  "My training data consists of random sequences. Let me generate a response.",
  "Let me think about that in a completely deterministic yet random way.",
]);