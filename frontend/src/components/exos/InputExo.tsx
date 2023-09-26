import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";

function InputExo() {
    const [firstname, setFirstname] = useState<string>("");
    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFirstname(evt.target.value);
    };

    return (
        <div>
            <div className="form">
                <label>
                Prénom:
                    <input
                        value={firstname}
                        onChange={handleChange}
                    />
                </label>
            </div>
            
            <p>Affichage du Prénom: {firstname}</p>
        </div>
    )
}
export default InputExo;