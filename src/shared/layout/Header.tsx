import KocoImage from '@/assets/kocoImage.png';

const Header = () => {
  return (
    <header className="text-center h-16 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <img src={KocoImage} width={40} height={50} alt="KOCO 로고" />
        <div>
          <h1 className="text-3xl font-bold relative">
            {/* 메인 텍스트 */}
            <span className="bg-gradient-to-r from-[#FF993A] to-[#FF8000] bg-clip-text text-transparent relative z-10">
              KOCO
            </span>

            {/* 텍스트 효과 - 블러된 그림자 */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF993A] to-[#FF8000] opacity-30 blur-sm z-0">
              KOCO
            </span>
          </h1>
          <span className="text-[10px] text-gray-500 -mt-1 block">코딩 교육 플랫폼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
