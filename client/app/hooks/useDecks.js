import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../globalState"
import axios from 'axios';

const useDecks = (deckId) => {
    const [ decks, setDecks ] = useState([]);
    const [ cards, setCards ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);
    const { reload, setReload } = useContext(UserContext);

    useEffect(() => {
        let current = true;
        console.log("useDecks")
        if (deckId) {
            axios.get(`/api/deck/${deckId}`)
                .then(res => {
                    if(current) {
                    const { cardList } = res.data
                    let filteredCardsObj = {};
                    let filteredCardsArr = [];
                    for (let i = 0; i < cardList.length; i++) {
                        

                        if(filteredCardsObj[cardList[i].id]) {
                            filteredCardsObj[cardList[i].id].quantity++

                        } else {
                            filteredCardsObj[cardList[i].id] = cardList[i];
                            filteredCardsObj[cardList[i].id].quantity = 1
                        }
                    }
                    for (const card in filteredCardsObj) {
                        filteredCardsArr.push(filteredCardsObj[card]);
                    }
                    console.log("Filtered Cards: ", filteredCardsObj);
                    setCards(filteredCardsArr.sort((a, b) => (a.name > b.name) ? 1 : -1));
                    // setCards(cardList);
                    setIsLoading(false);
                    }
                })
        } else {
            axios.post("/api/deck/all")
                .then(res => {
                    if(current) {
                    setDecks(res.data.decks);
                    }
                })
        }
        return () => {
            current = false;
        }
    }, [reload])

    return { decks, setDecks, cards, setCards, isLoading, setIsLoading, reload, setReload };
}

export default useDecks;