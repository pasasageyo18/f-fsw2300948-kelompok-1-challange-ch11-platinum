'use client'

export default function Result({ playerChoice, computerChoice, result }) {
  return (
    <div className="player-choose flex flex-wrap flex-col align-center justify-around">
      <div className="container-result">
        <div
          className={`flex container-result-${result} justify-center align-top flex-col p-6 h-auto`}
        >
          {playerChoice && (
            <p className="choose-player">Your choice: {playerChoice}</p>
          )}
          {computerChoice && <p>Computers choice: {computerChoice}</p>}
          {result && <p>Result: You {result}!</p>}
        </div>
      </div>
    </div>
  )
}
