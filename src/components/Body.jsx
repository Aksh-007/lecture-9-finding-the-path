import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import Error from "./Error";
import RestaurantNotFound from "./RestaurantNotFound";
import { Link } from "react-router-dom";

// search by input textb
function filterData(searchText, restaurant) {
  const filterData = restaurant.filter((restaurant) => {
    return restaurant?.data?.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
  });
  return filterData;
}

const Body = () => {
  // needed it for shmmer loading
  const [allRestaurant, setAllRestaurant] = useState([]);
  // needed it for filtered data
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // creating async function to call api for fetch

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
        `https://corsanywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING`
      );

      // this is also a async opeartion so await is mandatory in this
      const data = await jsonData.json();
      console.log(data);
      // putting the data in setResturant
      setAllRestaurant(data?.data?.cards[2]?.data?.data?.cards);
      setFilteredRestaurant(data?.data?.cards[2]?.data?.data?.cards);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log("render dom");

  // early return
  // if (!allRestaurant) return <Error  />;

  // for loading
  return (
    <>
      <div className=" mb-5 mt-[100px] md:mt-[130px]  px-[50px] ">
        <div className="max-w-lg mx-auto">
          <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search Restaurant Name...."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="grid place-items-center h-full w-12 text-gray-300"
              onClick={() => {
                const data = filterData(searchText, allRestaurant);
                setFilteredRestaurant(data);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {/* <p>{searchInput}</p> */}
          </div>
        </div>
      </div>

      {allRestaurant.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="body">
          {filteredRestaurant.length === 0 ? (
            <RestaurantNotFound searchRestaurant={searchText} />
          ) : (
            filteredRestaurant.map((restaurants) => {
              return (
                <Link to={`/restaurant/${restaurants.data.id}`}>
                  <RestaurantCard
                    {...restaurants.data}
                    key={restaurants.data.uuid}
                  />
                </Link>
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Body;
