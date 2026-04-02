interface PreloaderProps {
  label?: string;
}

const Preloader = ({ label = "Loading..." }: PreloaderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042f2e] to-[#012423] text-[#F0FFF9] flex items-center justify-center p-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/reviewflow-logo.png"
          alt="ReviewFlow AI"
          className="h-14 w-14 object-contain animate-[rf-wave_2.4s_ease-in-out_infinite]"
        />
        <div className="text-sm text-emerald-100/70">{label}</div>
        <div className="relative h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-[#06b6a4] via-[#c4f59e] to-[#06b6a4] animate-[rf-underline_1.6s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
