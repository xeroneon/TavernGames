// import react from 'react';

const ReplaceMana = (mana) => {
    if (!mana) {
        return
    }
    const manaArray = mana.split("");

    return manaArray.map(character => {

        dualManaCheckIndex = manaArray.indexof(character);
        secondMana = manaArray[dualManaCheckIndex + 2];

        if (manaArray[dualManaCheckIndex + 1] === "/") {
            switch(character) {
                case "2": 
                    switch(secondMana) {
                        case "G": return "/assets/img/mtg-symbols/2-forrest.png"
                        break;
                        case "U": return "/assets/img/mtg-symbols/2-island.png"
                        break;
                        case "W": return "/assets/img/mtg-symbols/2-plains.png"
                        break;
                        case "B": return "/assets/img/mtg-symbols/2-swamp.png"
                        break;
                        case "R": return "/assets/img/mtg-symbols/2-mountain.png"
                        break;
                        default: return
                    }
                break;
                case "G":
                    switch(secondMana) {
                        case "U": return "/assets/img/mtg-symbols/forrest-island.png"
                        break;
                        case "W": return "/assets/img/mtg-symbols/forrest-plains.png"
                        break;
                        default: return
                    }
                break;
                case "U":
                    switch(secondMana) {
                        case "R": return "/assets/img/mtg-symbols/island-mountain.png"
                        break;
                        case "B": return "/assets/img/mtg-symbols/island-swamp.png"
                        break;
                        default: return
                    }
                break;
                case "R":
                    switch(secondMana) {
                        case "G": return "/assets/img/mtg-symbols/mountain-forrest.png"
                        break;
                        case "W": return "/assets/img/mtg-symbols/mountain-plains.png"
                        break;
                        default: return
                    }
                break;
                case "W":
                    switch(secondMana) {
                        case "U": return "/assets/img/mtg-symbols/plains-island.png"
                        break;
                        case "B": return "/assets/img/mtg-symbols/plains-swamp.png"
                        break;
                        default: return
                    }
                break;
                case "B":
                    switch(secondMana) {
                        case "G": return "/assets/img/mtg-symbols/swamp-forrest.png"
                        break;
                        case "R": return "/assets/img/mtg-symbols/swamp-mountain.png"
                        break;
                        default: return
                    }
                break;
                default: return
            }
        } else if (manaArray[dualManaCheckIndex - 1] === "/") {
            return
        } else {
            
        switch(character) {
            case "{": return ""
            break;
            case "}": return ""
            break;
            case "0": return "/assets/img/mtg-symbols/0.png"
            break;
            case "1": return "/assets/img/mtg-symbols/1.png"
            break;
            case "2": return "/assets/img/mtg-symbols/2.png"
            break;
            case "3": return "/assets/img/mtg-symbols/3.png"
            break;
            case "4": return "/assets/img/mtg-symbols/4.png"
            break;
            case "5": return "/assets/img/mtg-symbols/5.png"
            break;
            case "6": return "/assets/img/mtg-symbols/6.png"
            break;
            case "7": return "/assets/img/mtg-symbols/7.png"
            break;
            case "8": return "/assets/img/mtg-symbols/8.png"
            break;
            case "9": return "/assets/img/mtg-symbols/9.png"
            break;
            case "10": return "/assets/img/mtg-symbols/10.png"
            break;
            case "11": return "/assets/img/mtg-symbols/11.png"
            break;
            case "12": return "/assets/img/mtg-symbols/12.png"
            break;
            case "13": return "/assets/img/mtg-symbols/13.png"
            break;
            case "14": return "/assets/img/mtg-symbols/14.png"
            break;
            case "15": return "/assets/img/mtg-symbols/15.png"
            break;
            case "16": return "/assets/img/mtg-symbols/16.png"
            break;
            case "17": return "/assets/img/mtg-symbols/17.png"
            break;
            case "18": return "/assets/img/mtg-symbols/18.png"
            break;
            case "19": return "/assets/img/mtg-symbols/19.png"
            break;
            case "20": return "/assets/img/mtg-symbols/20.png"
            break;
            case "G": return "/assets/img/mtg-symbols/forrest.png"
            break;
            case "U": return "/assets/img/mtg-symbols/island.png"
            break;
            case "W": return "/assets/img/mtg-symbols/plains.png"
            break;
            case "B": return "/assets/img/mtg-symbols/swamp.png"
            break;
            case "R": return "/assets/img/mtg-symbols/mountain.png"
            break;
            case "X": return "/assets/img/mtg-symbols/x.png"
            break;
            case "Y": return "/assets/img/mtg-symbols/y.png"
            break;
            case "Z": return "/assets/img/mtg-symbols/z.png"
            break;
            case ",": return
            break;
            default: return character
        }
    }
    });
};

export default ReplaceMana;