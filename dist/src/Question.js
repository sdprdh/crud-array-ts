import readline, {} from "node:readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Question {
    query;
    isNumber;
    constructor(query, isNumber = false) {
        this.query = query;
        this.isNumber = isNumber;
    }
    async ask() {
        return new Promise((resolve) => {
            rl.question(this.query, (answer) => {
                if (this.isNumber) {
                    const num = parseInt(answer, 10);
                    if (isNaN(num)) {
                        console.log("Type is not number");
                        resolve(this.ask());
                    }
                    else {
                        resolve(num);
                    }
                }
                else {
                    resolve(answer.trim());
                }
            });
        });
    }
}
export { Question, rl };
