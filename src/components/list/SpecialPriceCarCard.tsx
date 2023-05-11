import { isDesktop } from "react-device-detect";
import { CarListItf } from "src/api/list/interface";
import {
  formatNumber,
  roundPrice,
  showPrice,
  truncateString,
} from "src/utils/util";
import Card from "../UI/card";

type Props = {
  data: CarListItf;
};
function SpecialPriceCarCard({ data }: Props) {
  const carInfo = `${data.year}년 | ${formatNumber(
    data.drivingDistance
  )}km | ${data.regionGroups.join(",")}`;
  const ariaLabel = `연식 ${data.year}년 주행거리${formatNumber(
    data.drivingDistance
  )}키로미터 지역${data.regionGroups.join(",")}`;
  return (
    <Card width={isDesktop ? "270px" : "70vw"} height="200px">
      <Card.Image
        src={data.image}
        alt={`${data.carClassName}_이미지`}
        height="60%"
        objectFit="contain"
      />
      <Card.Content ariaLabel={ariaLabel}>
        <Card.Typography fontSize="1.2rem">{data.carClassName}</Card.Typography>
        <Card.Typography fontSize="1.2rem">
          {showPrice(roundPrice(data.price))}원
        </Card.Typography>
        <Card.Typography fontSize="1.2rem">
          {truncateString(carInfo, 20)}
        </Card.Typography>
      </Card.Content>
    </Card>
  );
}

export default SpecialPriceCarCard;
