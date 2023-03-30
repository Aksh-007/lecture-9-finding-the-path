import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  ITEM_IMG_CDN_URL,
} from "../constant.js";
import Shimmer from "./Shimmer.jsx";

const RestaurantMenu = () => {
  const { menuId } = useParams();

  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [restaurantMenu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    //api calls
    // getCurrentLocation();
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // console.log(latitude,longitude)
      // use the latitude and longitude to get the user's address
      latitude === undefined
        ? getRestaurant(
            (latitude = 12.9351929),
            (longitude = 77.62448069999999)
          )
        : getRestaurant(latitude, longitude);
      // getRestaurant(latitude, longitude);
    });
  }, []);

  async function getRestaurant(latitude, longitude) {
    try {
      // console.log(latitude,longitude)
      const jsonData = await fetch(
        `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&&submitAction=ENTER&restaurantId=${menuId}`
      );

      // this is also a async opeartion so await is mandatory in this
      const data = await jsonData.json();
      console.log(data?.data);
      setRestaurantInfo(data?.data?.cards[0]?.card?.card?.info);
      // setRestaurantMenu(data?.)
      const menuItemsData =
        data?.data?.cards
          .find((x) => x.groupedCard)
          ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map((x) => x.card?.card)
          ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
          ?.map((x) => x.itemCards)
          .flat()
          .map((x) => x.card?.info) || [];

      const uniqueMenuItems = [];
      menuItemsData.forEach((item) => {
        if (!uniqueMenuItems.find((x) => x.id === item.id)) {
          uniqueMenuItems.push(item);
        }
      });
      setRestaurantMenu(uniqueMenuItems);
    } catch (error) {
      console.log(error);
    }
  }

  return restaurantInfo.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu mt-[100px]" style={{ color: "white"}}>
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={`${IMG_CDN_URL}${restaurantInfo?.cloudinaryImageId}`}
          alt={restaurantInfo?.name}
        />
        <div className="restaurant-summary-details">
          <h2 className="restaurant-title">{restaurantInfo?.name}</h2>
          <p className="restaurant-tags">
            {restaurantInfo?.cuisines?.join(", ")}
          </p>
          <div className="restaurant-details">
            <div
              className="restaurant-rating"
              style={
                restaurantInfo?.avgRating < 4
                  ? { backgroundColor: "red" }
                  : restaurantInfo?.avgRating === "--"
                  ? { backgroundColor: "white", color: "black" }
                  : { color: "white" }
              }
            >
              <i className="fa-solid fa-star"></i>
              <span>{restaurantInfo?.avgRating}</span>
            </div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurantInfo?.sla?.slaString}</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{restaurantInfo?.costForTwoMessage}</div>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-title-wrap">
            <h3 className="menu-title">Recommended</h3>
            <p className="menu-count">{restaurantMenu.length} ITEMS</p>
          </div>
          <div className="menu-items-list">
            {restaurantMenu.map((item) => (
              <div className="menu-item" key={item?.id}>
                <div className="menu-item-details">
                  <h3 className="item-title">{item?.name}</h3>
                  <p className="item-cost">
                    {item?.price > 0
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item?.price / 100)
                      : " "}
                  </p>
                  <p className="item-desc">{item?.description}</p>
                </div>
                <div className="menu-img-wrapper">
                  {item?.imageId && (
                    <img
                      className="menu-item-img"
                      src={ITEM_IMG_CDN_URL + item?.imageId}
                      alt={item?.name}
                    />
                  )}
                  <button className="add-btn"> ADD +</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
