import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { getOfferImage } from "../api/images";

interface OfferCardProps {
  id:string,
  productName: string,
  storeName:string,
  actualPrice: number,
  previousPrice: number,
  endDate: string
}

const OfferCard = ({
  id,
  productName,
  storeName,
  actualPrice,
  previousPrice,
  endDate,
}:OfferCardProps) => {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await getOfferImage(token, id);
        setImage(imageURL);
      } catch (error) {}
    };
    fetchImage();
  }, [id, token]);

  return (
    <Card
      id={id}
      style={{
        width: 250,
      }}
      className="shadow-md flex flex-col justify-between"
      cover={
        <div
          style={{
            width: "100%",
            height: "300px",
            overflow: "hidden",
          }}
        >
          <img
            className="w-full h-full object-cover"
            alt={productName}
            src={
              image ||
              "https://imagestores.de/cdn/shop/files/AEB7DC72-31F5-4A67-A7D5-24A51D3AC1C1.jpg?v=1720447652&width=1240"
            }
          />
        </div>
      }
    >
      <span className="py-2">
        <p className="text-lg font-semibold">{productName}</p>
        <p className="opacity-80">{storeName}</p>
        <div className="flex py-2 justify-between">
          <p className="font-bold text-lg text-red-600">${actualPrice}</p>
          <p className="font-bold text-lg line-through pr-5">${previousPrice}</p>
        </div>
        <p className="text-sm opacity-70">Válido hasta: {endDate}</p>
      </span>
    </Card>
  );
};
export default OfferCard;
