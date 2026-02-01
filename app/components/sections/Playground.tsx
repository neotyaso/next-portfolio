"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp, StaggeredText, RippleBackground } from '../../ui/Animations';

const checkMove = (currentBoard: (1 | 2 | null)[][], r: number, c: number, player: 1 | 2) => {
  if (currentBoard[r][c] !== null) return [];
  const opponent = player === 1 ? 2 : 1;
  const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  let flips: {r: number, c: number}[] = [];

  for (const [dr, dc] of directions) {
    let nr = r + dr;
    let nc = c + dc;
    const temp: {r: number, c: number}[] = [];
    while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && currentBoard[nr][nc] === opponent) {
      temp.push({r: nr, c: nc});
      nr += dr;
      nc += dc;
    }
    if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8 && currentBoard[nr][nc] === player && temp.length > 0) {
      flips = [...flips, ...temp];
    }
  }
  return flips;
};

const MizuOthello = () => {
  // 1: 黒, 2: 白, null: 空
  const [board, setBoard] = useState<(1 | 2 | null)[][]>(() => {
    const b: (1 | 2 | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    b[3][3] = 2; b[3][4] = 1;
    b[4][3] = 1; b[4][4] = 2;
    return b;
  });
  const [turn, setTurn] = useState<1 | 2>(1);
  const [isCpuMode, setIsCpuMode] = useState(true);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const boardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCpuMode && turn === 2) {
      const timer = setTimeout(() => {
        const validMoves: { r: number; c: number; flips: { r: number; c: number }[] }[] = [];
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const flips = checkMove(board, r, c, 2);
            if (flips.length > 0) {
              validMoves.push({ r, c, flips });
            }
          }
        }

        if (validMoves.length > 0) {
          // 簡易AI: 角を優先し、次に裏返せる枚数が多い場所を選ぶ
          validMoves.sort((a, b) => {
            const isCorner = (m: { r: number; c: number }) => (m.r === 0 || m.r === 7) && (m.c === 0 || m.c === 7);
            if (isCorner(a) && !isCorner(b)) return -1;
            if (!isCorner(a) && isCorner(b)) return 1;
            return b.flips.length - a.flips.length;
          });

          const move = validMoves[0];
          
          // 波紋エフェクト
          if (boardRef.current) {
            const rect = boardRef.current.getBoundingClientRect();
            const cellSize = rect.width / 8;
            const x = move.c * cellSize + cellSize / 2;
            const y = move.r * cellSize + cellSize / 2;
            const newRipple = { id: Date.now(), x, y };
            setRipples(prev => [...prev, newRipple]);
            setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 2000);
          }

          const newBoard = board.map(row => [...row]);
          newBoard[move.r][move.c] = 2;
          move.flips.forEach(({ r, c }) => {
            newBoard[r][c] = 2;
          });
          setBoard(newBoard);
          setTurn(1);
        } else {
          // パス
          setTurn(1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [turn, isCpuMode, board]);

  const handleBoardClick = (e: React.MouseEvent) => {
    if (isCpuMode && turn === 2) return;
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // 波紋を追加
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 2000);

    // 座標からセルを特定
    const cellSize = rect.width / 8;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      const flips = checkMove(board, row, col, turn);
      if (flips.length > 0) {
        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = turn;
        flips.forEach(({r, c}) => {
          newBoard[r][c] = turn;
        });
        setBoard(newBoard);
        setTurn(turn === 1 ? 2 : 1);
      }
    }
  };

  const blackCount = board.flat().filter(c => c === 1).length;
  const whiteCount = board.flat().filter(c => c === 2).length;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex gap-4">
        <button
          onClick={() => setIsCpuMode(!isCpuMode)}
          className={`px-4 py-2 rounded-full text-sm font-serif tracking-widest transition-all ${
            isCpuMode 
              ? 'bg-slate-800 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {isCpuMode ? 'CPU対戦' : '二人対戦'}
        </button>
        <button
            onClick={() => {
                setBoard(() => {
                    const b = Array(8).fill(null).map(() => Array(8).fill(null));
                    b[3][3] = 2; b[3][4] = 1;
                    b[4][3] = 1; b[4][4] = 2;
                    return b;
                });
                setTurn(1);
            }}
            className="px-4 py-2 rounded-full text-sm font-serif tracking-widest bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all"
        >
            リセット
        </button>
      </div>

      <div className="flex gap-8 text-xl font-serif tracking-widest">
        <div className={`flex items-center gap-2 ${turn === 1 ? 'font-bold text-black scale-110' : 'text-gray-400'} transition-all`}>
          <div className="w-4 h-4 rounded-full bg-black border border-gray-600"></div>
          <span>黒: {blackCount}</span>
        </div>
        <div className={`flex items-center gap-2 ${turn === 2 ? 'font-bold text-black scale-110' : 'text-gray-400'} transition-all`}>
          <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
          <span>白: {whiteCount}</span>
        </div>
      </div>

      <div 
        ref={boardRef}
        className="relative w-full max-w-[20rem] aspect-square md:w-96 md:h-96 bg-slate-900 rounded-lg shadow-2xl overflow-hidden cursor-pointer select-none"
        onClick={handleBoardClick}
        style={{
          boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* グリッド線 */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none">
          {Array(64).fill(0).map((_, i) => (
            <div key={i} className="border border-slate-800/50"></div>
          ))}
        </div>

        {/* 石の描画 */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none">
          {board.map((row, r) => (
            row.map((cell, c) => (
              <div key={`${r}-${c}`} className="flex items-center justify-center">
                {cell && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-3/4 h-3/4 rounded-full shadow-lg ${
                      cell === 1 
                        ? 'bg-linear-to-br from-gray-800 to-black' 
                        : 'bg-linear-to-br from-white to-gray-200'
                    }`}
                  />
                )}
              </div>
            ))
          ))}
        </div>

        {/* 波紋 */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              pointerEvents: "none"
            }}
          />
        ))}
      </div>
      
      <p className="text-gray-400 text-sm font-serif tracking-widest">
        水面を打ち、石を置く。
      </p>
    </div>
  );
};

const Playground = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      id="playground"
      className="py-20 bg-white relative overflow-hidden scroll-mt-28"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='12' viewBox='0 0 20 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12c0-.622-.095-1.221-.27-1.785A5.982 5.982 0 0 0 0 12h1.838a4.14 4.14 0 0 1 8.324 0H12zM2.162 0a4.14 4.14 0 0 1 8.324 0H12.325a5.982 5.982 0 0 0-10.65 0H2.162z' fill='%239ca3af' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}
    >
      <RippleBackground color="border-teal-200/40" />
      {/* 透かし文字 */}
      <div className="relative py-32 md:py-64 flex justify-center items-center">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none whitespace-nowrap">
          <motion.div style={{ y }} className="text-[11vw] md:text-[8rem] font-serif font-bold tracking-widest text-black block">
            <StaggeredText text="PLAYGROUND" />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-6xl mx-auto px-6 relative z-10 flex justify-center"
      >
        <MizuOthello />
      </motion.div>
    </section>
  );
};

export default Playground;