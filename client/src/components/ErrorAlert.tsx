import React from "react";
import { motion } from "framer-motion";

// Animation variants for the blinking eyes
const blink = {
  visible: { scaleY: 1 },
  blink: {
    scaleY: 0.1,
    transition: {
      repeat: Infinity,
      repeatDelay: 2,
      duration: 0.1,
    },
  },
};

// Animation variants for the shaking head
const shake = {
  shake: {
    rotate: [-2, 2, -2],
    transition: {
      repeat: Infinity,
      duration: 0.3,
    },
  },
};

// Animation for the cables (subtle wiggle)
const cableWiggle = {
  wiggle: {
    x: [-2, 2, -2, 0],
    transition: {
      repeat: Infinity,
      duration: 0.5,
    },
  },
};

// Animation for the spark lines (flicker effect with slight movement)
const sparkFlicker = {
  flicker: {
    opacity: [0, 1, 0],
    scale: [1, 1.2, 1],
    transition: {
      repeat: Infinity,
      duration: 0.8,
      delay: Math.random() * 0.5,
    },
  },
};

type ErrorProps = {
  statusCode: string | number;
  message?: string | Error | { [key: string]: any };
};


const ErrorAlert: React.FC<ErrorProps> = ({ statusCode , message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-white p-4">
      {/* Robot Head */}
      <motion.div
        className="w-40 h-40 bg-white rounded-xl relative shadow-xl border-4 border-black"
        variants={shake}
        animate="shake"
      >
        {/* Eyes */}
        <div className="absolute top-10 left-6">
          <motion.div
            className="w-5 h-5 bg-black rounded-full origin-center"
            variants={blink}
            initial="visible"
            animate="blink"
          />
        </div>
        <div className="absolute top-10 right-6">
          <motion.div
            className="w-5 h-5 bg-black rounded-full origin-center"
            variants={blink}
            initial="visible"
            animate="blink"
          />
        </div>

        {/* Mouth */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-black rounded" />

        {/* Antenna */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-400" />
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
      </motion.div>

      {/* Disconnected Plug and Socket */}
      <div className="relative w-full max-w-xl h-40 flex items-center justify-center">
        {/* Spark Lines (Flickering Effect) - Starburst effect */}
        <div className="absolute w-16 h-16 flex items-center justify-center z-10">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <motion.div
              key={index}
              className="absolute w-1 h-4 bg-gray-600"
              style={{ transform: `rotate(${angle}deg)`, transformOrigin: 'center' }}
              variants={sparkFlicker}
              animate="flicker"
            />
          ))}
        </div>

        {/* Left Cable and Plug with Wiggle Animation */}
        <motion.div
          className="flex items-center z-10"
          variants={cableWiggle}
          animate="wiggle"
        >
          {/* Curved Cable */}
          <svg width="100" height="60" className="mr-2">
            <motion.path
              d="M 0 30 Q 50 0, 100 30"
              stroke="grey"
              strokeWidth="4"
              fill="none"
              variants={cableWiggle}
              animate="wiggle"
            />
          </svg>
          {/* Plug */}
          <div className="w-8 h-12 bg-gray-300 rounded-r-md flex items-center justify-center">
            <div className="flex flex-col space-y-1">
              <div className="w-2 h-4 bg-gray-500 rounded-sm" />
              <div className="w-2 h-4 bg-gray-500 rounded-sm" />
            </div>
          </div>
        </motion.div>

        {/* Gap */}
        <div className="w-4" />

        {/* Right Socket with Wiggle Animation */}
        <motion.div
          className="flex items-center z-10"
          variants={cableWiggle}
          animate="wiggle"
        >
          {/* Socket */}
          <div className="w-8 h-12 bg-gray-300 rounded-l-md flex items-center justify-center">
            <div className="flex flex-col space-y-1">
              <div className="w-2 h-4 bg-white border border-gray-500 rounded-sm" />
              <div className="w-2 h-4 bg-white border border-gray-500 rounded-sm" />
            </div>
          </div>
          {/* Curved Cable */}
          <svg width="100" height="60" className="ml-2">
            <motion.path
              d="M 0 30 Q 50 60, 100 30"
              stroke="grey"
              strokeWidth="4"
              fill="none"
              variants={cableWiggle}
              animate="wiggle"
            />
          </svg>
        </motion.div>
      </div>

      {/* Status Code and Message */}
      <h1 className="text-4xl text-red-600  font-boldonse">{statusCode}!</h1>
     

      <p className="mt-4 text-center text-black font-semibold">

         {message instanceof Error
    ? message.message
    : typeof message === 'string'
    ? message
    : typeof message === 'object'
    ? JSON.stringify(message)
    : 'Uh oh! Our robot broke something. We’re working on fixing it.'}
        
      </p>
      <a
        href="/"
        className="mt-6 px-5 py-2 border hover:font-bold shadow-md text-black rounded-xl transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorAlert;