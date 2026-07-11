function CodeTiles({ code, size = 'large' }) {
    // Balanced sizing scales matched perfectly with Geist typography weights
    const tileStyles =
        size === 'large'
            ? 'w-10 h-14 text-2xl font-bold tracking-tight rounded-xl'
            : 'w-8 h-11 text-lg font-semibold tracking-tight rounded-lg';

    return (
        <div className="flex gap-1.5 justify-center items-center flex-wrap py-1">
            {code.split('').map((char, i) => (
                <div
                    key={i}
                    className={`
            ${tileStyles} 
            font-mono flex items-center justify-center 
            bg-[var(--canvas-elevated)] text-[var(--ink)] 
            border border-[var(--hairline)] 
            shadow-[0_2px_4px_rgba(0,0,0,0.02)]
            dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)]
            transition-all duration-200 select-all
            hover:border-[var(--faint)] hover:scale-[1.02]
          `}
                >
                    {char}
                </div>
            ))}
        </div>
    );
}

export default CodeTiles;
