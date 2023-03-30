import {IMG_CDN_URL} from "../constant"

const RestaurantCard = ({
  name,
  cloudinaryImageId,
  cuisines,
  aggregatedDiscountInfoV2,
  avgRating,uuid,
  costForTwoString,
  area,
  deliveryTime,
  totalRatings
}) => {


  // console.log(
  //   aggregatedDiscountInfoV2)
  
  return (
    <div className="card" data-aos="zoom-in" >
      <div className="img-hover-zoom">
        <img 
          className="image"
        //   src={IMG_CDN_URL + cloudinaryImageId}
        src={`${IMG_CDN_URL}${cloudinaryImageId}`}
        />
      </div>
      <div className="content">
        <span className="title">{name}</span>

        <p className="desc">
        cuisines: {cuisines.join(", ")} <br />
          {aggregatedDiscountInfoV2?.descriptionList[0]?.meta}
        </p>
        <p className="desc">
          Average Cost : {costForTwoString}
        </p>
        <p className="desc">
          Area : {area}
        </p>
        <p className="desc">
          Estimate Delivery Time: {deliveryTime}min
        </p>

        <span className="desc" aria-hidden="true">Avg Rating : {avgRating} out of {totalRatings} Reviews</span>
      </div>
    </div>
  );
};
export default RestaurantCard;
