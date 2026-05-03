const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="text-center md:text-left">
      <span className="block text-2xl font-bold text-zinc-900">{value}</span>
      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
};

export default Stat;
