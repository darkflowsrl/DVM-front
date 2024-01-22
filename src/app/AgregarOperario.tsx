import { Button } from "../ui/components/Button";

export default function AgregarOperario() {
  return (
    <div className="bg-[#1c2e3d] flex flex-row justify-center w-full">
      <div className="bg-[#1c2e3d] rounded-[8px] border-[0.3px] border-solid border-white shadow-[8px_8px_8px_#00000040] overflow-x-hidden w-[490px] h-[464px] relative">
        <div className="absolute w-[416px] h-[64px] top-[143px] left-[36px] rounded-[8px] border border-solid border-white" />
        <div className="w-[416px] h-[64px] top-[272px] left-[36px] border border-solid border-white absolute rounded-[8px]" />
        <div className="absolute w-[236px] h-[28px] top-[30px] left-[45px] [font-family:'Roboto-Bold',Helvetica] font-bold text-white text-[24px] tracking-[0] leading-[normal]">
          Agregar Operario
        </div>
        <div className="absolute w-[210px] top-[108px] left-[36px] [font-family:'Roboto_Flex-Bold',Helvetica] font-bold text-[#32cf9c] text-[20px] tracking-[0] leading-[normal]">
          Nombre y apellido
        </div>
        <div className="absolute w-[162px] top-[237px] left-[35px] [font-family:'Roboto_Flex-Bold',Helvetica] font-bold text-[#32cf9c] text-[20px] tracking-[0] leading-[normal]">
          Identificación
        </div>
        <div className="absolute w-[137px] h-[49px] top-[383px] left-[162px] rounded-[8px]">
          <div className="w-[137px] h-[49px] top-0 left-0 bg-[#dc3545] shadow-[0px_3.41px_3.41px_#00000040] absolute rounded-[8px]" />
          <div className="absolute w-[72px] h-[21px] top-[12px] left-[35px] [font-family:'Roboto-Regular',Helvetica] font-normal text-white text-[17.7px] tracking-[0] leading-[normal]">
            Cancelar
          </div>
        </div>
        <Button
          className="!absolute !left-[315px] !bg-[#32cf9c80] !top-[382px]"
          property1="frame-1"
        />
      </div>
    </div>
  );
}
