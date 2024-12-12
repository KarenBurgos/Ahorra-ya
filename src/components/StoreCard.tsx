import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { TbMapPinFilled } from "react-icons/tb";
import { getStoreImage } from "../api/images";

interface StoreCardProps {
  id: string,
  name: string,
  departament: string,
  municipality: string
}

const StoreCard: React.FC<StoreCardProps> = ({
  id,
  name,
  departament,
  municipality
}) => {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState();

  console.log(typeof (departament))
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageURL = await getStoreImage(token, id);
        setImage(imageURL);
      } catch (error) { }
    };
    fetchImage();
  }, [id, token]);

  return (
    <Card
      id={id}
      hoverable
      style={{
        width: 300
      }}
      className="shadow-md flex flex-col justify-between"
      cover={
        <div
          style={{
            width: "100%",
            height: "300px", // Altura fija
            overflow: "hidden",
          }}
        >
          <img
            className="w-full h-full object-cover"
            alt={name}
            src={
              image ||
              "https://imagestores.de/cdn/shop/files/AEB7DC72-31F5-4A67-A7D5-24A51D3AC1C1.jpg?v=1720447652&width=1240" // Imagen por defecto
            }
          />
        </div>
      }
    >
      <span className="py-3">
        <p className="text-lg font-semibold">{name}</p>
        <span className="flex gap-2 items-center">
          <TbMapPinFilled size={15} className="opacity-60"/>
          <span>
            <p className="opacity-80">{departament + ', ' + municipality}</p>
          </span>
        </span>
      </span>
    </Card>


  );
};
export default StoreCard;
