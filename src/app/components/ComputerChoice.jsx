'use client'
import { Image } from '@nextui-org/react'

export default function ComputerChoice({ choices, computerChoice }) {
  return (
    <div className="col-4 d-flex flex-column align-items-center computer-group">
      <h2 className="text-2xl">COMPUTER</h2>
      <div className="computer-button-group">
        {choices.map((choice) => (
          <div className={`${choice}-button-group`} key={choice}>
            <button
              className={`btn ${choice}-p w-[125px] h-[175px] mb-3`}
              disabled
              key={choice}
              style={computerChoice === choice ? { opacity: '100%' } : {}}
            >
              <Image
                alt={`${choice}.png`}
                className={`${choice}-image`}
                src={`/images/${choice}.png`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
