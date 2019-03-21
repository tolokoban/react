import * as React from "react"
import './App.css';
import Icon from "./tfw/view/icon"
import TraceCounter from "./trace-counter"
import WordList from "./word-list"
import IWord from "./IWord";
import WORDS from "./words.json";

type AppProps = {};

interface IDic<V> {
    [name: string]: V;
}

interface IIconState {
    name: string;
    size: string;
    animate: boolean;
    flipH: boolean;
    flipV: boolean;
    visible: boolean;
}

interface IAppState {
    name: string;
    size: string;
    animate: boolean;
    flipH: boolean;
    flipV: boolean;
    disabled: boolean;
    icons: IIconState[];
    words: any[];
};

interface IChangeEventHandler {
    (event: React.ChangeEvent<HTMLInputElement>): void;
}

interface ISelectEventHandler {
    (event: React.ChangeEvent<HTMLSelectElement>): void;
}

interface ISubmitEventHandler {
    (event: React.FormEvent<HTMLFormElement>): void;
}

const SIZES: IDic<string> = {
    "28px": "Tiny",
    "32px": "Small",
    "48px": "Medium",
    "64px": "Big",
    "96px": "Huge"
};

class App extends React.Component<AppProps, IAppState> {
    private handleNameChange: IChangeEventHandler;
    private handleSizeChange: ISelectEventHandler;
    private handleAnimateChange: IChangeEventHandler;
    private handleFlipHChange: IChangeEventHandler;
    private handleFlipVChange: IChangeEventHandler;
    private handleSubmit: ISubmitEventHandler;

    constructor(props: AppProps) {
        super(props);
        this.handleNameChange = this._handleNameChange.bind(this);
        this.handleSizeChange = this._handleSizeChange.bind(this);
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
            size: "28px",
            icons: [],
            words: []
        };
    }

    componentDidMount() {
        const stringifiedState: string | null = window.localStorage.getItem("state");
        if (stringifiedState !== null) {
            const state = JSON.parse(stringifiedState) as IAppState;
            this.setState(state);
        }

        window.setTimeout(() => {
            const wordsList = WORDS.map(wordMapper);
            wordsList.sort((w1, w2) => {
                if (w1.name > w2.name) return +1;
                if (w1.name < w2.name) return -1;
                return 0;
            })
            console.log("wordsList", wordsList);
            this.setState({ words: wordsList });
        }, 1000);
    }

    _handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = (event.target as HTMLInputElement).value;
        this.setState({
            name: value.toLowerCase(),
            disabled: !Icon.isValidIconName(value)
        });
    }

    _handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const size: string = (event.target as HTMLSelectElement).value;
        this.setState({ size });
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
        const icons = this.state.icons.filter(icon => icon.name !== name);
        icons.push({
            name,
            size: this.state.size,
            visible: true,
            animate: this.state.animate,
            flipH: this.state.flipH,
            flipV: this.state.flipV
        });
        this.setState({
            icons,
            name: "",
            size: "28px",
            animate: false,
            flipH: false,
            flipV: false,
            disabled: true
        });
        this.save(icons);
    }

    save(icons: IIconState[]) {
        window.localStorage.setItem(
            "state",
            JSON.stringify(Object.assign(this.state, { icons }))
        );
    }

    handleRemove(iconName: string) {
        const icons = this.state.icons.map(elem => {
            if (elem.name !== iconName) return elem;
            return Object.assign(elem, {
                visible: false,
                animate: false
            });
        });
        this.setState({ icons });
    }

    handleDispose(iconName: string) {
        const icons = this.state.icons.filter(icon => icon.name !== iconName);
        this.setState({ icons });
        this.save(icons);
    }

    render() {
        return (<div className="App" >
            <WordList words={this.state.words} />
            <header className="App-header" >
                <h1>{process.env.NODE_ENV} </h1>
                <form onSubmit={this.handleSubmit}>
                    <datalist id="iconsNames" >
                        {
                            Icon.getAllIconNames().map(name => (
                                <option key={name} value={name} > </option>
                            ))
                        }
                    </datalist>
                    <input type="text"
                        autoFocus
                        onChange={this.handleNameChange}
                        list="iconsNames"
                        value={this.state.name} />
                    <br />
                    <input
                        type="checkbox"
                        checked={this.state.animate}
                        onChange={this.handleAnimateChange}
                        name="chkAnimate" id="chkAnimate" />
                    <label htmlFor="chkAnimate" > Animate </label>
                    <br />
                    <input
                        type="checkbox"
                        checked={this.state.flipH}
                        onChange={this.handleFlipHChange}
                        name="chkFlipH" id="chkFlipH" />
                    <label htmlFor="chkFlipH" > Flip Horizontally </label>
                    <br />
                    <input
                        type="checkbox"
                        checked={this.state.flipV}
                        onChange={this.handleFlipVChange}
                        name="chkFlipV" id="chkFlipV" />
                    <label htmlFor="chkFlipV" > Flip Vertically </label>
                    <br />
                    <label htmlFor="cboSize" > Size </label>
                    <select value={this.state.size} onChange={this.handleSizeChange} > {
                        Object.keys(SIZES).map(size => (
                            <option value={size} > {SIZES[size]} </option>
                        ))
                    } </select>
                    <br />
                    <input type="submit" disabled={this.state.disabled} value="Add" />
                    <div className="icon-container" > {
                        this.state.icons.map(icon => (
                            <Icon key={icon.name}
                                size={icon.size}
                                content={icon.name}
                                visible={icon.visible}
                                animate={icon.animate}
                                flipH={icon.flipH}
                                flipV={icon.flipV}
                                onHide={() => this.handleDispose(icon.name)}
                                onClick={() => this.handleRemove(icon.name)
                                }> </Icon>
                        ))
                    }</div>
                </form>
            </header>
        </div >);
    }
}


function wordMapper(item: any): IWord {
    const [name, occurences, types] = item;
    return { name, occurences, types: types.split(",") };
}

export default App;
