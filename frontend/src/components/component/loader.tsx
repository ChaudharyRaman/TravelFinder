export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute w-4 h-4 bg-gradient-to-r from-[#4299E1] to-[#3B82F6] rounded-full animate-pulse-fast" />
        <div className="absolute w-3 h-3 bg-gradient-to-r from-[#4299E1] to-[#3B82F6] rounded-full animate-pulse-slow delay-100" />
        <div className="absolute w-5 h-5 bg-gradient-to-r from-[#4299E1] to-[#3B82F6] rounded-full animate-pulse-fast delay-200" />
        <div className="absolute w-4 h-4 bg-gradient-to-r from-[#4299E1] to-[#3B82F6] rounded-full animate-pulse-slow delay-300" />
      </div>
    </div>
  );
}
