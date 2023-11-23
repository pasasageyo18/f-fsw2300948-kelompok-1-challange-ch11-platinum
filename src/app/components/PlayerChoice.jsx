'use client'
import { Image } from '@nextui-org/react'

export default function PlayerChoice({
  choices,
  playGameFunc,
  setPlayerChoice,
}) {
  return (
    <div className="col-4 d-flex flex-column align-items-center player-group">
      <h2 className="text-2xl">PLAYER</h2>
      <div className="player-button-group">
        {choices.map((choice, index) => (
          <div className={`${choice}-button-group`} key={index}>
            <button
              className={`btn ${choice}-p w-[125px] h-[175px] hover:bg-slate-300 rounded-md mb-3 `}
              key={choice}
              onChange={(e) => setPlayerChoice(e.target.value)}
              onClick={() => playGameFunc(choice)}
              type="submit"
              value={choice}
            >
              <Image
                alt={`${choice}.png`}
                className={`${choice}-image w-full h-full`}
                src={`/images/${choice}.png`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
