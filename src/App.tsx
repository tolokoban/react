import * as React from "react"
import './App.css';

type AppProps = {};
interface IAppState {
    name: string;
};

interface IChangeEventHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface ISubmitEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

class App extends React.Component<AppProps, IAppState> {
    private handleChange: IChangeEventHandler;
    private handleSubmit: ISubmitEventHandler;

    constructor(props: AppProps) {
        super(props);
        this.handleChange = this._handleChange.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            name: ""
        };
    }

    _handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: (event.target as HTMLInputElement).value
        });
    }

    _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert("Yo!");
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} value={this.state.name} />
                    <p>Hello {this.state.name}
                        !</p>
                    < input type="submit" value="Add" />
                </form>
            </header>
        </div>);
    }
}

export default App;
