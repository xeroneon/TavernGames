import React from 'react'

const ReplaceMana = props => {

    const { mana, manaClass } = props;
    
    const handleMana = mana => {
        if (!mana) {
            return
        }

        const manaArray = mana.split("");

        return manaArray.map((character, index) => {

            const dualManaCheckIndex = manaArray.indexOf(character);
            const secondMana = manaArray[dualManaCheckIndex + 2];

        if (manaArray[dualManaCheckIndex + 1] === "/") {
            switch(character) {
                case "2": 
                    switch(secondMana) {
                        case "G": return <img src="/assets/img/mtg-symbols/2-forrest.png" className={manaClass} key={index}/>
                        break;
                        case "U": return <img src="/assets/img/mtg-symbols/2-island.png" className={manaClass} key={index}/>
                        break;
                        case "W": return <img src="/assets/img/mtg-symbols/2-plains.png" className={manaClass} key={index}/>
                        break;
                        case "B": return <img src="/assets/img/mtg-symbols/2-swamp.png" className={manaClass} key={index}/>
                        break;
                        case "R": return <img src="/assets/img/mtg-symbols/2-mountain.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                case "G":
                    switch(secondMana) {
                        case "U": return <img src="/assets/img/mtg-symbols/forrest-island.png" className={manaClass} key={index}/>
                        break;
                        case "W": return  <img src="/assets/img/mtg-symbols/forrest-plains.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                case "U":
                    switch(secondMana) {
                        case "R": return <img src="/assets/img/mtg-symbols/island-mountain.png" className={manaClass} key={index}/>
                        break;
                        case "B": return <img src="/assets/img/mtg-symbols/island-swamp.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                case "R":
                    switch(secondMana) {
                        case "G": return <img src="/assets/img/mtg-symbols/mountain-forrest.png" className={manaClass} key={index}/>
                        break;
                        case "W": return <img src="/assets/img/mtg-symbols/mountain-plains.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                case "W":
                    switch(secondMana) {
                        case "U": return <img src="/assets/img/mtg-symbols/plains-island.png" className={manaClass} key={index}/>
                        break;
                        case "B": return <img src="/assets/img/mtg-symbols/plains-swamp.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                case "B":
                    switch(secondMana) {
                        case "G": return <img src="/assets/img/mtg-symbols/swamp-forrest.png" className={manaClass} key={index}/>
                        break;
                        case "R": return <img src="/assets/img/mtg-symbols/swamp-mountain.png" className={manaClass} key={index}/>
                        break;
                        default: return
                    }
                break;
                default: return
            }
        } else if (manaArray[dualManaCheckIndex - 1] === "/") {
            return
        } else {

            switch (character) {
                case "{": return ""
                    break;
                case "}": return ""
                    break;
                case "/" : return ""
                    break;
                case "0": return <img src="/assets/img/mtg-symbols/0.png" className={manaClass} key={index}/>
                    break;
                case "1": return <img src="/assets/img/mtg-symbols/1.png" className={manaClass} key={index}/>
                    break;
                case "2": return <img src="/assets/img/mtg-symbols/2.png" className={manaClass} key={index}/>
                    break;
                case "3": return <img src="/assets/img/mtg-symbols/3.png" className={manaClass} key={index}/>
                    break;
                case "4": return <img src="/assets/img/mtg-symbols/4.png" className={manaClass} key={index}/>
                    break;
                case "5": return <img src="/assets/img/mtg-symbols/5.png" className={manaClass} key={index}/>
                    break;
                case "6": return <img src="/assets/img/mtg-symbols/6.png" className={manaClass} key={index}/>
                    break;
                case "7": return <img src="/assets/img/mtg-symbols/7.png" className={manaClass} key={index}/>
                    break;
                case "8": return <img src="/assets/img/mtg-symbols/8.png" className={manaClass} key={index}/>
                    break;
                case "9": return <img src="/assets/img/mtg-symbols/9.png" className={manaClass} key={index}/>
                    break;
                case "10": return <img src="/assets/img/mtg-symbols/10.png" className={manaClass} key={index}/>
                    break;
                case "11": return <img src="/assets/img/mtg-symbols/11.png" className={manaClass} key={index}/>
                    break;
                case "12": return <img src="/assets/img/mtg-symbols/12.png" className={manaClass} key={index}/>
                    break;
                case "13": return <img src="/assets/img/mtg-symbols/13.png" className={manaClass} key={index}/>
                    break;
                case "14": return <img src="/assets/img/mtg-symbols/14.png" className={manaClass} key={index}/>
                    break;
                case "15": return <img src="/assets/img/mtg-symbols/15.png" className={manaClass} key={index}/>
                    break;
                case "16": return <img src="/assets/img/mtg-symbols/16.png" className={manaClass} key={index}/>
                    break;
                case "17": return <img src="/assets/img/mtg-symbols/17.png" className={manaClass} key={index}/>
                    break;
                case "18": return <img src="/assets/img/mtg-symbols/18.png" className={manaClass} key={index}/>
                    break;
                case "19": return <img src="/assets/img/mtg-symbols/19.png" className={manaClass} key={index}/>
                    break;
                case "20": return <img src="/assets/img/mtg-symbols/20.png" className={manaClass} key={index}/>
                    break;
                case "G": return <img src="/assets/img/mtg-symbols/forrest.png" className={manaClass} key={index}/>
                    break;
                case "U": return <img src="/assets/img/mtg-symbols/island.png" className={manaClass} key={index}/>
                    break;
                case "W": return <img src="/assets/img/mtg-symbols/plains.png" className={manaClass} key={index}/>
                    break;
                case "B": return <img src="/assets/img/mtg-symbols/swamp.png" className={manaClass} key={index}/>
                    break;
                case "R": return <img src="/assets/img/mtg-symbols/mountain.png" className={manaClass} key={index}/>
                    break;
                case "X": return <img src="/assets/img/mtg-symbols/x.png" className={manaClass} key={index}/>
                    break;
                case "Y": return <img src="/assets/img/mtg-symbols/y.png" className={manaClass} key={index}/>
                    break;
                case "Z": return <img src="/assets/img/mtg-symbols/z.png" className={manaClass} key={index}/>
                    break;
                case "C": return <img src="/assets/img/mtg-symbols/colorless.png" className={manaClass} key={index}/>
                    break;
                default: return character
            }
        }
        })
    }

    return (
        <>
            {handleMana(mana)}
        </>
    )
}

export default ReplaceMana;