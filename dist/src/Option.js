class Option {
    static mainOptions = [
        'Add product',
        'Edit product',
        'Detail product',
        'Delete product',
        'See all products',
        'exit'
    ];
    static productOptions = [
        'Add one',
        'Add multiple',
        'back'
    ];
    static log() {
        this.mainOptions.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
        console.log('');
    }
    static logProductOptions() {
        this.productOptions.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
        console.log('');
    }
}
export default Option;
