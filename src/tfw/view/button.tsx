import * as React from "react";
import "../theme.css";
import "./button.css";
import

interface IButtonProps {
    label ?: string;
    tag ?: any;
    onClick ?: (tag: any) => void;
}

export default class Button extends React.Component<IButtonProps, {}> {
    render() {
        const
            p = this.props,
            label = castString(p.label);

        return (<button className="tfw-view-Button thm-ele-button" >
            {
                label ? (<label htmlFor={id} className="thm-bgPD" > {label} < /label>) : null}
                    < Button
                        ref={this.Button}
                        className="thm-bg3"
                        type="text"
                        id={id}
                        size={size}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        defaultValue={value} />
                        </div>);
            }
            }
        
function castInteger(v: any, defaultValue: number = 0): number {
    if (typeof v !== 'number') return defaultValue;
            if (isNaN(v)) return defaultValue;
            return Math.max(0, Math.floor(v));
        }
        
function castString(v: any): string {
    if (typeof v === 'number') return `${v}`;
            if (typeof v !== 'string') return "";
            return v;
        }
