import { isDesktop } from "react-device-detect";
import { useCarDetailData } from "src/api/list";
import { useRootOverflowyHidden } from "src/hooks/useRootOverflowyHidden";
import { theme } from "src/style/theme";
import styled from "styled-components";
import CarInfoRow from "./CarInfoRow";
import OptionBox from "./OptionBox";

function CarDetailModal() {
  const { data } = useCarDetailData();
  useRootOverflowyHidden();
  return (
    <Container data-testid={`car_detail_modal`} isDesktop={isDesktop}>
      <DetailImage data-testid={data?.carImage}>
        <img src={data?.carImage} alt={`${data?.carClassName} 이미지`} />
      </DetailImage>
      <h5 className="car_title">{data?.carClassName}</h5>
      <div className="car_info_box">
        <CarInfoRow title="제조사" text={data?.maker} />
        <CarInfoRow title="분류" text={data?.carModel} />
        <CarInfoRow title="연료" text={data?.fuel} />
        <CarInfoRow title="변속방식" text={data?.gearbox} />
        <CarInfoRow title="승차정원" text={String(data?.capacity)} />
      </div>
      <OptionBox title="안전옵션" options={data?.safetyOption} />
      <OptionBox title="편의옵션" options={data?.additionalOption} />
    </Container>
  );
}

export default CarDetailModal;

type StyledProps = {
  isDesktop: boolean;
};
const Container = styled.div<StyledProps>`
  position: relative;
  width: ${(props) => (props.isDesktop ? "380px" : "100%")};
  min-height: 30vh;
  max-height: 50vh;
  overflow-y: auto;
  h5.car_title {
    padding: 0 20px;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 10px;
  }
  .car_info_box {
    margin-top: 20px;
    padding: 0 20px;
  }
  animation: fadeIn 0.3s linear;
  ${theme.fadeIn};
`;

const DetailImage = styled.div`
  width: 100%;
  height: 30%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
