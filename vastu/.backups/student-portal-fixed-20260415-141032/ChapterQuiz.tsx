'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '@/types/course';

interface Props {
  quiz: Quiz;
  onSubmit: (score: number) => void;
}

export default function ChapterQuiz({ quiz, onSubmit }: Props) {
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = () => {
    const correct = answers.reduce((acc, ans, i) => acc + (ans === quiz.questions[i].answerIndex ? 1 : 0), 0);
    const percentage = Math.round((correct / quiz.questions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
    onSubmit(percentage);
  };

  return (
    <div className="border-t border-prakash-gold/30 pt-6">
      <h4 className="font-serif text-xl mb-4">Chapter Quiz</h4>
      {quiz.questions.map((q, i) => (
        <div key={i} className="mb-6">
          <p className="font-medium mb-2">{i+1}. {q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, j) => (
              <label key={j} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={`q-${i}`} value={j} checked={answers[i] === j} onChange={() => { const newAns = [...answers]; newAns[i] = j; setAnswers(newAns); }} disabled={submitted} className="accent-prakash-gold" />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={handleSubmit} disabled={answers.includes(-1)} className="luxury-button w-full py-3 disabled:opacity-50">Submit Quiz</button>
      ) : (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center p-4 rounded-xl" style={{ backgroundColor: score! >= 60 ? '#10b98120' : '#ef444420', border: `2px solid ${score! >= 60 ? '#10b981' : '#ef4444'}` }}>
          <p className="text-2xl font-bold" style={{ color: score! >= 60 ? '#10b981' : '#ef4444' }}>{score}%</p>
          <p className="text-nidra-indigo">{score! >= 60 ? 'Great job! Chapter completed.' : 'Review the material and try again.'}</p>
        </motion.div>
      )}
    </div>
  );
}
