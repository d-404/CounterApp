import React from 'react';
import '../allComponents/Counter.css';

class Counter extends React.Component {

    componentDidMount() {
        document.title = 'Counter App';
    }

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            customInput: 1,
            history: [],
            isInputHovered: false,
        };
    }

    //To increase the count
    increaseCount = () => {
        const { count, customInput, history } = this.state;
        const inputAsNumber = parseInt(customInput);

        const newCount = isNaN(inputAsNumber) ? count + 1 : count + inputAsNumber;

        const newHistory = [...history, newCount];

        this.setState({
            count: newCount,
            customInput: '',
            history: newHistory.slice(-5),
        });
    };

    //To decrease the count
    decreaseCount = () => {
        const { count, customInput, history } = this.state;
        const inputAsNumber = parseInt(customInput);

        const newCount = isNaN(inputAsNumber) ? count - 1 : count - inputAsNumber;

        const finalCount = newCount >= 0 ? newCount : 0;
        const newHistory = [...history, finalCount];

        this.setState({
            count: finalCount,
            customInput: '',
            history: newHistory.slice(-5),
        });
    };

    //To handle custom input
    handleCustomIncrementChange = (e) => {
        const inputValue = e.target.value;

        if (/^-?\d+$/.test(inputValue)) {
            const inputAsNumber = parseInt(inputValue);

            if (inputAsNumber >= 0) {
                this.setState({
                    customInput: inputValue,
                });
            } else {
                alert("Please enter a non-negative number.");
            }
        } else if (inputValue === '') {
            this.setState({
                customInput: inputValue,
            });
        } else {

            alert("Please enter a valid non-negative number.");
        }
    };

    //To handle input hover
    handleInputHover = () => {
        this.setState({ isInputHovered: true });
    };

    //To handle input hover exit
    handleInputHoverExit = () => {
        this.setState({ isInputHovered: false });
    };

    //To reset the count
    resetCount = () => {
        this.setState({
            count: 1,
            history: [],
        });
    };


    render() {
        const { count, customInput, isInputHovered, history } = this.state;

        return (
            <div className="App">
                <h1>Counter App</h1>
                <div className="counter-app ">
                    <div className='count-container'>
                        <h2 className='count'>Count: {count}</h2>
                        <button className='buttons' onClick={this.increaseCount}>Increase</button>
                        <button className='buttons' onClick={this.decreaseCount} disabled={count === 0}>Decrease</button>
                        <button className='reset-button' onClick={this.resetCount}>Reset</button>

                        <div>
                            <input
                                type="number"
                                min="0"
                                value={customInput}
                                className={`input-container ${isInputHovered ? 'input-hover' : ''}`}
                                onMouseEnter={this.handleInputHover}
                                onMouseLeave={this.handleInputHoverExit}
                                onInput={this.handleCustomIncrementChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="history">
                        <h2>History</h2>
                        {history.slice().reverse().map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}

export default Counter