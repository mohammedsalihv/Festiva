import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "What is Lorem Ipsum?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    question: "Why do we use it?",
    answer:
      "It is a long established fact that a reader will be distracted by the readable content...",
  },
  {
    question: "Where does it come from?",
    answer:
      "Contrary to popular belief, Lorem Ipsum is not simply random text...",
  },
  {
    question: "Where can I get some?",
    answer: "There are many variations of passages of Lorem Ipsum available...",
  },
];

const FAQ = () => {
  const [toggleStates, setToggleStates] = useState<boolean[]>(
    Array(4).fill(false)
  );

  const toggleFAQ = (index: number) => {
    const updated = [...toggleStates];
    updated[index] = !updated[index];
    setToggleStates(updated);
  };

  return (
    <>
      <h2 className="text-sm lg:text-2xl text-center sm:text-left font-semibold mb-10">
        FREQUENTLY ASKED QUESTIONS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20">
        {faqData.map((item, i) => (
          <div
            key={i}
            className={`bg-[#2a2a2a] p-6 rounded-md shadow-md transition-all duration-300 ease-in-out ${
              toggleStates[i]
                ? "max-h-[500px]"
                : "max-h-[100px] overflow-hidden"
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-md font-JosephicSans">{item.question}</p>
              <button
                className="bg-[#4f46e5] w-8 h-8 flex items-center justify-center rounded"
                onClick={() => toggleFAQ(i)}
              >
                {toggleStates[i] ? (
                  <FiMinus className="text-white text-lg" />
                ) : (
                  <GoPlus className="text-white text-lg" />
                )}
              </button>
            </div>

            {toggleStates[i] && (
              <>
                <hr className="my-4 border-gray-600" />
                <p className="text-sm text-gray-300 font-JosephicSans">{item.answer}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
