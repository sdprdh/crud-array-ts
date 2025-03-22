class Option {
    private static readonly mainOptions: string[] = [
        'Add product',
        'Edit product',
        'Detail product',
        'Delete product',
        'See all products',
        'exit'
    ];

    private static readonly productOptions: string[] = [
        'Add one',
        'Add multiple',
        'back'
    ]

    public static log(): void {
        console.log('WELCOME TO THE STORE \n------------------');

        this.mainOptions.forEach((option: string, index: number): void => {
            console.log(`${index + 1}. ${option}`);
        })
        console.log('')
    }

    public static logProductOptions(): void {
        this.productOptions.forEach((option: string, index: number): void => {
            console.log(`${index + 1}. ${option}`);
        })
        console.log('')
    }

}

export default Option;

