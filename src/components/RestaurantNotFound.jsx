const RestaurantNotFound = ({searchRestaurant}) =>{
    return(
        <div style={{color:'white'}}>
            <h1>No restaurant found with name : {searchRestaurant}</h1>
        </div>
    )
}

export default RestaurantNotFound;