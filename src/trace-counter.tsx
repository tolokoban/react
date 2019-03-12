import * as React from "react"
import Icon from "./tfw/view/icon"
import WebService from "./tfw/web-service";

interface ITraceCounterProps { }
interface ITraceCounterState {
    isLoading: boolean;
    data: {};
}

export default class TraceCounter extends React.Component<ITraceCounterProps, ITraceCounterState> {
    constructor(props: ITraceCounterProps) {
        super(props);
        this.state = {
            isLoading: true,
            data: {}
        };
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.setState({ isLoading: true });
        WebService.get("tp4.ListTraces", { modes: "all" })
            .then(data => {
                console.log("data =", data);
                this.setState({ data, isLoading: false })
            })
            .catch(err => this.setState({ data: `ERROR!\n\n${err.data}` }));
    }

    render() {
        if (this.state.isLoading) return (
            <div>
                <Icon content="wait" animate={true} />
                <span> Loading traces...</span>
            </div>
        );
        return (
            <pre>{
                JSON.stringify(this.state.data, null, "   ")
            }</pre>
        )
    }
}
