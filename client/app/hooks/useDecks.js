import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const useDecks = (deckId) => {
    const [decks, setDecks] = useState([]);
    const [cards, setCards] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let current = true;
        if (deckId) {
            axios.get(`/api/deck/${deckId}`)
                .then(res => {
                    if(current) {
                    const { cardList } = res.data
                    setCards(cardList);
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
    }, [decks, cards])

    return { decks, setDecks, cards, setCards, isLoading, setIsLoading };
}

export default useDecks;