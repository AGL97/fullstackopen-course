import { useAnecdotes } from "../../hooks/useRandomAnecdotes"
import './anecdote.css'

export const Anecdotes = () => {
    const {anecdote,vote,mostVotedAnecdote,mostVotedCount,getRandomAnecdote,supportAnecdote} = useAnecdotes()
    
    
  
  return (
    <section>
        <h1>Anecdotes</h1>
        <div className="anecdoteButtons">
            <button onClick={getRandomAnecdote}>
                    Get random anecdote
            </button>
            <button onClick={supportAnecdote}>
                    Vote
            </button>
        </div>
        <p>
            {anecdote.length > 0 ? anecdote : 'No anecdotes yet'}
        </p>
        {anecdote.length > 0 && <p>
            votes: {vote}
        </p>}
        {mostVotedCount > 0 && <div>
            <h1>
                Anecdotes with more votes
            </h1>
            <p>
                {mostVotedAnecdote}
            </p>
            <p>
                has: {mostVotedCount}
            </p>
        </div>}
    </section>
  )
}
