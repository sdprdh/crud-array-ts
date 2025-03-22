import readline, {type Interface} from "node:readline";

const rl: Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Question<T extends string | number> {
    private readonly query: string;
    private readonly isNumber: boolean;

    constructor(query: string, isNumber: boolean = false) {
        this.query = query;
        this.isNumber = isNumber;
    }

    async ask(): Promise<T> {
        return new Promise((resolve) => {
            rl.question(this.query, (answer: string) => {
                if (this.isNumber) {
                    const num = parseInt(answer, 10);
                    if (isNaN(num)) {
                        console.log("Type is not number");
                        resolve(this.ask());
                    } else {
                        resolve(num as T);
                    }
                } else {
                    resolve(answer.trim() as T);
                }
            });
        });
    }
}

export {Question, rl};