import { useState } from "react";
function Count() {

    const[counter, setCounter] = useState<number>(0);

    const handleClick = () => {
    setCounter(counter + 1);
    };

    return (
        <div>
            <div>
                <p id="counter">{counter}</p>
            </div>
            <div>
                <button onClick={handleClick}>Compteur</button>
            </div>
        </div>
    )
}
export default Count;