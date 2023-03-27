import mermaid from "mermaid";

const Mermaid: React.FC = () => {
    mermaid.initialize({startOnLoad: true})
    return (<div className="mermaid">{`
        graph LR;
        A-->B;
        B-->C;
        B-->D[plop lanflz eknlzeknfz];
        `
        }</div>);
}

export default Mermaid;