import { useState } from "react"
import { anecdotes } from "../constants/anecdotes"



export const useAnecdotes = () => {
    const [anecdote, setAnecdote] = useState<string>('')    
    const [votes, setVotes] = useState<number[]>(Array.from({length:anecdotes.length}).fill(0) as number[])
    const [currentAnecdoteIndex, setCurrentAnecdoteIndex] = useState<number>(0) 
    const mostVoted = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(mostVoted)

    const getRandomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length)
        setCurrentAnecdoteIndex(randomIndex)
        setAnecdote(anecdotes[randomIndex])
    }

    const supportAnecdote = () => {
        const newVotes = [...votes]
        newVotes[currentAnecdoteIndex]++
        setVotes(newVotes)
    }  

    return {
        anecdote,
        vote: votes[currentAnecdoteIndex],
        mostVotedAnecdote: anecdotes[mostVotedIndex],
        mostVotedCount: mostVoted,        
        getRandomAnecdote,
        supportAnecdote}
}