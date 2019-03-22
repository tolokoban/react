import * as React from "react";
import "./word.css";

interface IWordProps {
    name: string;
    occurences: number;
    types: string[];
    onClick?: (name: string) => void;
}

const TYPES = [
    "noun", "adjective", "verb", "conjunction", "preposition", "adverb"  //, "interjection"
]
export default class Word extends React.Component<IWordProps, {}> {
    private readonly ref: React.RefObject<HTMLDivElement>;

    constructor(props: IWordProps) {
        super(props);
        this.ref = React.createRef();
    }

    /*
        componentDidMount() {
            const div = this.ref.current;
            if (!div) return;
            div.classList.add("show");
            //window.setTimeout(() => div.classList.add("show"));
        }
    */
    render() {
        const { name, occurences, types } = this.props;
        return (<div className="word" ref={this.ref}>
            <div className="types">{
                TYPES.map(t => (<div key={t} className={types.indexOf(t) === -1 ? 'grey' : t}>{
                    t.charAt(0).toUpperCase()
                }</div>))
            }</div>
            <div className="name">{name}</div>
            <div className="occ">{occurences}</div>
        </div>);
    }
}
