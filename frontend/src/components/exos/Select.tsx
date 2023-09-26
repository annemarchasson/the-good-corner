
import React from "react";
import { useState } from "react";
import { ChangeEvent } from "react";

interface Categories {
    id: number;
    name: string;
}

const categories: Categories[] =  [
    {
        id:1,
        name: "cat1"
    },
    {
        id:2,
        name: "cat2"
    },
    {
        id:3,
        name: "cat3"
    },
    {
        id:4,
        name: "cat4"
    },
];

function Select() {
    const [value, setValue] = useState<Categories>();
    const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
        const cat = categories.find((d) => d.id === +evt.target.value);
        setValue(cat);
        // le + correspond au parseInt
    };

    return (
        <div>
            <select onChange={handleChange}>
                <option></option>
                {categories.map((categories)=> (
                    <option key={categories.id} value={categories.id}>
                        {categories.name}
                    </option>
                ))}
            </select>
            <p>Le numéro de la catégorie choisie est: {value?.id}</p>
            <p>La catégorie choisie est : {value?.name}</p>
        </div>
    )
}
export default Select;