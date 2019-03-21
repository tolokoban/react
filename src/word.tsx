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
    render() {
        const { name, occurences, types } = this.props;
        return (<div className="word">
            <div className="types">{
                TYPES.map(t => (<div className={types.indexOf(t) === -1 ? 'grey' : t}>{
                    t.charAt(0).toUpperCase()
                }</div>))
            }</div>
            <div className="name">{name}</div>
            <div className="occ">{occurences}</div>
        </div>);
    }
}
