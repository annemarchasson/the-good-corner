import {useState} from "react";
function Demo1() {

    const[nom, setNom] = useState<string>("titi");

    const handleClick = () =>
    setNom("tata");

    return (
        <>
        <div>
            {nom}
        </div>
        <button onClick={handleClick}>click</button>
        </>
    );
}
export default Demo1;