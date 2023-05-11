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
function AllCarCard({ data }: Props) {
  const carInfo = `${data.year}년 | ${formatNumber(
    data.drivingDistance
  )}km | ${data.regionGroups.join(",")}`;

  return (
    <Card width="100%" height="300px">
      <Card.Image
        src={data.image}
        alt={`${data.carClassName}_이미지`}
        height="60%"
        objectFit="contain"
      />
      <Card.Content>
        <Card.Tags tags={data.carTypeTags} />
        <Card.Typography fontSize="1.5rem">{data.carClassName}</Card.Typography>
        <Card.Typography fontSize="1.5rem">
          {showPrice(roundPrice(data.price))}원
        </Card.Typography>
        <Card.Typography fontSize="1.5rem">
          {truncateString(carInfo, 20)}
        </Card.Typography>
      </Card.Content>
    </Card>
  );
}

export default AllCarCard;
