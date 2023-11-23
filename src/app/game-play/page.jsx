'use client';
import { useEffect } from 'react';
import './Rps.css';
import { Link } from '@nextui-org/react';
import { useAuth } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import PlayerChoice from '../components/PlayerChoice';
import Result from '../components/Result';
import ComputerChoice from '../components/ComputerChoice';
import { db } from '../store/firebase';
import { increment } from 'firebase/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import {
  resetGameState,
  setComputerChoice,
  setDraw,
  setLose,
  setPlayerChoice,
  setWin,
} from '../redux/gameSlice';

function Rps() {
  const dispatch = useDispatch();
  const selectPlayerChoice = (state) => state.game.playerChoice;
  const selectComputerChoice = (state) => state.game.computerChoice;
  const selectGameState = (state) => state.game;
  const playerChoice = useSelector(selectPlayerChoice);
  const computerChoice = useSelector(selectComputerChoice);
  const state = useSelector(selectGameState);
  const router = useRouter();
  const { isLogin } = useAuth();
  const currentUserCollectionId = localStorage.getItem('currentUserUid');

  const playGameFunc = (choice) => {
    dispatch(resetGameState());
    dispatch(setPlayerChoice(choice));
    dispatch(setComputerChoice());
  };

  useEffect(() => {
    if (playerChoice !== null && computerChoice !== null) {
      // Perform game logic using playerChoice and computerChoice
      if (playerChoice === computerChoice) {
        dispatch(setDraw());
      } else if (
        (playerChoice === 'rock' && computerChoice === 'scissor') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissor' && computerChoice === 'paper')
      ) {
        dispatch(setWin());
        scoreUpdate(3);
      } else {
        dispatch(setLose());
        scoreUpdate(-1);
      }
    }
  }, [playerChoice, computerChoice]);

  const scoreUpdate = async (incrementBy) => {
    try {
      const userDocRef = doc(db, 'users', currentUserCollectionId);
      await updateDoc(userDocRef, {
        total_score: increment(incrementBy),
      });
      console.log('Score updated successfully');
    } catch (error) {
      console.error('Error updating Score:', error);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    } else {
      router.push('/game-play');
    }
  }, [isLogin]);

  return (
    <>
      <div className='container ml-64 mt-10 flex gap-2'>
        <Link aria-current='page' href='game-list'>
          Game List
        </Link>
        <p className='text-black dark:text-white'>&gt;</p>
        <Link aria-current='page' href='game-detail'>
          Game List
        </Link>
        <p className='text-black dark:text-white'>&gt;</p>
        <Link aria-current='page' href='game-play'>
          Play Game
        </Link>
      </div>
      <section className='w-full flex justify-center'>
        <div className='container bg-white dark:bg-black dark:shadow-md dark:shadow-black mt-7 rounded-lg shadow-lg'>
          <div className='flex justify-around '>
            <h1 className='text-4xl font-bold my-7'>
              {' '}
              <span>Rock Paper Scissors</span>
            </h1>
          </div>
          <div className='flex w-full justify-center'>
            <div className='flex flex-col justify-around px-36 my-5'>
              <h2 className='text-xl'>
                Current Round:
                <span className='text-xl font-semibold ml-2'>
                  {state.round}
                </span>
              </h2>
              <h2 className='text-xl'>
                Current Score:
                <span className='text-xl font-semibold ml-2'>
                  {state.total_score}
                </span>
              </h2>
            </div>
          </div>
          <div className='flex justify-between px-32'>
            <PlayerChoice
              choices={state.choices}
              playGameFunc={playGameFunc}
              setPlayerChoice={setPlayerChoice}
            />
            <Result
              computerChoice={computerChoice}
              playerChoice={playerChoice}
              result={state.result}
            />
            <ComputerChoice
              choices={state.choices}
              computerChoice={state.computerChoice}
              setComputerChoice={setComputerChoice}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Rps;
