import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { TbMapPinFilled } from "react-icons/tb";
import { getStoreImage } from "../../api/images";

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
            height: "300px", 
            overflow: "hidden",
          }}
        >
          <img
            className="w-full h-full object-cover"
            alt={name}
            src={
              image ||"https://lh5.googleusercontent.com/proxy/6GqkEKacZBl4xmcSgeJZ_EzDbh4LBdv7J5u1A1HdbAXbU8jrYJHTvk6zyHmHxdA53BphWLT3HLFg0_N3gAwkEbMVF1iIEUZzd3Bs_eM3ACXDwMokenhEQHTLTUL3a7BB_f5JH3oKywsYXbu37KrJ"
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
