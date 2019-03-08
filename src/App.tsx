import * as React from "react"
import './App.css';

type AppProps = {};
type AppState = {
    name?: string | undefined;
    defaultName: string;
};

class App extends React.Component<AppProps, AppState> {
    constructor(props : AppProps) {
        super(props);
        this.state = {
            defaultName: "Toro"
        };
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                <input type="text" defaultValue={this.state.defaultName} value={this.state.name}/>
                <p>Hello {this.state.name}!</p>
            </header>
        </div>);
    }
}

export default App;
