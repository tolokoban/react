import * as React from "react"
import './App.css';
import Icon from "./tfw/view/icon";

console.info("Icon=", Icon);

type AppProps = {};

interface IIconState {
    name: string;
    animate: boolean;
    flipH: boolean;
    flipV: boolean;
    visible: boolean;
}

interface IAppState {
    name: string;
    animate: boolean;
    flipH: boolean;
    flipV: boolean;
    disabled: boolean;
    icons: IIconState[];
};

interface IChangeEventHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface ISubmitEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

class App extends React.Component<AppProps, IAppState> {
    private handleNameChange: IChangeEventHandler;
    private handleAnimateChange: IChangeEventHandler;
    private handleFlipHChange: IChangeEventHandler;
    private handleFlipVChange: IChangeEventHandler;
    private handleSubmit: ISubmitEventHandler;

    constructor(props: AppProps) {
        super(props);
        this.handleNameChange = this._handleNameChange.bind(this);
        this.handleAnimateChange = this._handleAnimateChange.bind(this);
        this.handleFlipHChange = this._handleFlipHChange.bind(this);
        this.handleFlipVChange = this._handleFlipVChange.bind(this);
        this.handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            name: "",
            disabled: true,
            animate: false,
            flipH: false,
            flipV: false,
            icons: []
        };
    }

    componentDidMount() {
        const stringifiedState : string | null = window.localStorage.getItem("state");
        if( stringifiedState !== null ) {
            const state = JSON.parse(stringifiedState) as IAppState;
            this.setState( state );
        }
    }

    _handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        this.setState({
            name: value.toLowerCase(),
            disabled: !Icon.isValidIconName( value )
        });
    }

    _handleAnimateChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = (event.target as HTMLInputElement).checked;
        this.setState({ animate: checked });
    }

    _handleFlipHChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = (event.target as HTMLInputElement).checked;
        this.setState({ flipH: checked });
    }

    _handleFlipVChange(event: React.ChangeEvent<HTMLInputElement>) {
        const checked = (event.target as HTMLInputElement).checked;
        this.setState({ flipV: checked });
    }

    _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const name = this.state.name;
        const icons = this.state.icons.filter( icon => icon.name !== name);
        icons.push({
            name,
            visible:true,
            animate:this.state.animate,
            flipH: this.state.flipH,
            flipV: this.state.flipV
        });
        this.setState({
            icons,
            name: "",
            animate: false,
            flipH: false,
            flipV: false,
            disabled: true
        });

        window.localStorage.setItem(
            "state",
            JSON.stringify(Object.assign(this.state, {icons}))
        );
    }

    handleRemove(iconName : string) {
        const icons = this.state.icons.map( elem => {
            if( elem.name !== iconName ) return elem;
            return Object.assign( elem, {
                visible: false,
                animate: false
            } );
        });
        this.setState({ icons });
    }

    render() {
        return (<div className="App">
            <header className="App-header">
                <form onSubmit={this.handleSubmit}>
                    <datalist id="iconsNames">
                        {Icon.getAllIconNames().map(name => (
                            <option key={name} value={name}></option>
                        ))}
                    </datalist>
                    <input type="text"
                        autoFocus
                        onChange={this.handleNameChange}
                        list="iconsNames"
                        value={this.state.name} />
                    <br/>
                    <input
                        type="checkbox"
                        checked={this.state.animate}
                        onChange={this.handleAnimateChange}
                    name="chkAnimate" id="chkAnimate" />
                    <label htmlFor="chkAnimate">Animate</label>
                    <br/>
                    <input
                        type="checkbox"
                        checked={this.state.flipH}
                        onChange={this.handleFlipHChange}
                    name="chkFlipH" id="chkFlipH" />
                    <label htmlFor="chkFlipH">Flip Horizontally</label>
                    <br/>
                    <input
                        type="checkbox"
                        checked={this.state.flipV}
                        onChange={this.handleFlipVChange}
                    name="chkFlipV" id="chkFlipV" />
                    <label htmlFor="chkFlipV">Flip Vertically</label>
                    <br/>
                    <input type="submit" disabled={this.state.disabled} value="Add" />
                    <div className="icon-container">{
                        this.state.icons.map(icon => (
                            <Icon key={icon.name}
                                content={icon.name}
                                visible={icon.visible}
                                animate={icon.animate}
                                flipH={icon.flipH}
                                flipV={icon.flipV}
                                onClick={() => this.handleRemove(icon.name)}></Icon>
                        ))
                    }</div>
                </form>
            </header>
        </div>);
    }
}

export default App;
