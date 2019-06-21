import React from 'react'

const ReplaceMana = props => {

    const { mana, manaClass } = props;
    
    const handleMana = mana => {
        if (!mana) {
            return
        }

        const manaArray = mana.split("");

        return manaArray.map(character => {

            switch (character) {
                case "{": return ""
                    break;
                case "}": return ""
                    break;
                case "0": return <img src="/assets/img/mtg-symbols/0.png" className={manaClass} />
                    break;
                case "1": return <img src="/assets/img/mtg-symbols/1.png" className={manaClass} />
                    break;
                case "2": return <img src="/assets/img/mtg-symbols/2.png" className={manaClass} />
                    break;
                case "3": return <img src="/assets/img/mtg-symbols/3.png" className={manaClass} />
                    break;
                case "4": return <img src="/assets/img/mtg-symbols/4.png" className={manaClass} />
                    break;
                case "5": return <img src="/assets/img/mtg-symbols/5.png" className={manaClass} />
                    break;
                case "6": return <img src="/assets/img/mtg-symbols/6.png" className={manaClass} />
                    break;
                case "7": return <img src="/assets/img/mtg-symbols/7.png" className={manaClass} />
                    break;
                case "8": return <img src="/assets/img/mtg-symbols/8.png" className={manaClass} />
                    break;
                case "9": return <img src="/assets/img/mtg-symbols/9.png" className={manaClass} />
                    break;
                case "10": return <img src="/assets/img/mtg-symbols/10.png" className={manaClass} />
                    break;
                case "11": return <img src="/assets/img/mtg-symbols/11.png" className={manaClass} />
                    break;
                case "12": return <img src="/assets/img/mtg-symbols/12.png" className={manaClass} />
                    break;
                case "13": return <img src="/assets/img/mtg-symbols/13.png" className={manaClass} />
                    break;
                case "14": return <img src="/assets/img/mtg-symbols/14.png" className={manaClass} />
                    break;
                case "15": return <img src="/assets/img/mtg-symbols/15.png" className={manaClass} />
                    break;
                case "16": return <img src="/assets/img/mtg-symbols/16.png" className={manaClass} />
                    break;
                case "17": return <img src="/assets/img/mtg-symbols/17.png" className={manaClass} />
                    break;
                case "18": return <img src="/assets/img/mtg-symbols/18.png" className={manaClass} />
                    break;
                case "19": return <img src="/assets/img/mtg-symbols/19.png" className={manaClass} />
                    break;
                case "20": return <img src="/assets/img/mtg-symbols/20.png" className={manaClass} />
                    break;
                case "G": return <img src="/assets/img/mtg-symbols/forrest.png" className={manaClass} />
                    break;
                case "U": return <img src="/assets/img/mtg-symbols/island.png" className={manaClass} />
                    break;
                case "W": return <img src="/assets/img/mtg-symbols/plains.png" className={manaClass} />
                    break;
                case "B": return <img src="/assets/img/mtg-symbols/swamp.png" className={manaClass} />
                    break;
                case "R": return <img src="/assets/img/mtg-symbols/mountain.png" className={manaClass} />
                    break;
                case "X": return <img src="/assets/img/mtg-symbols/x.png" className={manaClass} />
                    break;
                default: return character
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